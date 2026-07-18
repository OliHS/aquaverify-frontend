-- P0-13 review-only migration. Do not apply without Security/Privacy/Architecture sign-off.
-- Additive, idempotent and deny-by-default. Existing public content is preserved as published.
BEGIN;

CREATE TABLE IF NOT EXISTS cms_user_roles (
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('editor','reviewer','publisher','admin','service')),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, role)
);

CREATE TABLE IF NOT EXISTS cms_revisions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type text NOT NULL CHECK (entity_type IN ('page','marketing_page','visual_page','product','product_family')),
  entity_key text NOT NULL,
  locale text NOT NULL DEFAULT 'en',
  payload jsonb NOT NULL,
  state text NOT NULL DEFAULT 'draft' CHECK (state IN ('draft','review','published','rejected','archived')),
  version integer NOT NULL,
  created_by uuid NOT NULL REFERENCES auth.users(id),
  reviewed_by uuid NULL REFERENCES auth.users(id),
  published_by uuid NULL REFERENCES auth.users(id),
  review_reason text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz NULL,
  deleted_at timestamptz NULL,
  UNIQUE (entity_type, entity_key, locale, version)
);

CREATE TABLE IF NOT EXISTS cms_audit_log (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  actor_id uuid NULL REFERENCES auth.users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_key text NOT NULL,
  revision_id uuid NULL REFERENCES cms_revisions(id),
  reason text NULL,
  occurred_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cms_user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read-only access to pages" ON pages;
DROP POLICY IF EXISTS "Allow authenticated full access to pages" ON pages;
DROP POLICY IF EXISTS "Allow public read-only access to content_blocks" ON content_blocks;
DROP POLICY IF EXISTS "Allow authenticated full access to content_blocks" ON content_blocks;
DROP POLICY IF EXISTS "Allow public read-only access to distributors" ON distributors;
DROP POLICY IF EXISTS "Allow authenticated full access to distributors" ON distributors;
DROP POLICY IF EXISTS "Allow public read-only access to product_families" ON product_families;
DROP POLICY IF EXISTS "Allow authenticated full access to product_families" ON product_families;
DROP POLICY IF EXISTS "Allow public read-only access to products" ON products;
DROP POLICY IF EXISTS "Allow authenticated full access to products" ON products;

CREATE POLICY pages_public_published_read ON pages FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY blocks_public_published_read ON content_blocks FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY distributors_public_visible_read ON distributors FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY families_public_visible_read ON product_families FOR SELECT TO anon, authenticated USING (is_hidden = false);
CREATE POLICY products_public_visible_read ON products FOR SELECT TO anon, authenticated USING (is_hidden = false);

CREATE POLICY cms_roles_self_read ON cms_user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid());
CREATE POLICY cms_revisions_role_read ON cms_revisions FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM cms_user_roles r WHERE r.user_id = auth.uid() AND r.active));
CREATE POLICY cms_audit_admin_read ON cms_audit_log FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM cms_user_roles r WHERE r.user_id = auth.uid() AND r.active AND r.role IN ('admin','service')));

CREATE OR REPLACE FUNCTION cms_has_role(allowed text[]) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM cms_user_roles r WHERE r.user_id = auth.uid() AND r.active AND r.role = ANY(allowed));
$$;

CREATE OR REPLACE FUNCTION cms_save_draft(p_entity_type text, p_entity_key text, p_locale text, p_payload jsonb)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE next_version integer; revision_id uuid;
BEGIN
  IF NOT cms_has_role(ARRAY['editor','reviewer','publisher','admin']) THEN RAISE EXCEPTION 'cms_forbidden'; END IF;
  IF p_entity_type NOT IN ('page','marketing_page','visual_page','product','product_family') OR p_payload IS NULL THEN RAISE EXCEPTION 'cms_invalid_draft'; END IF;
  SELECT COALESCE(MAX(version),0)+1 INTO next_version FROM cms_revisions WHERE entity_type=p_entity_type AND entity_key=p_entity_key AND locale=p_locale;
  INSERT INTO cms_revisions(entity_type,entity_key,locale,payload,version,created_by)
  VALUES(p_entity_type,p_entity_key,p_locale,p_payload,next_version,auth.uid()) RETURNING id INTO revision_id;
  INSERT INTO cms_audit_log(actor_id,action,entity_type,entity_key,revision_id) VALUES(auth.uid(),'draft_saved',p_entity_type,p_entity_key,revision_id);
  RETURN revision_id;
END $$;

CREATE OR REPLACE FUNCTION cms_transition_revision(p_revision_id uuid, p_next_state text, p_reason text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE current_revision cms_revisions%ROWTYPE;
BEGIN
  SELECT * INTO current_revision FROM cms_revisions WHERE id=p_revision_id AND deleted_at IS NULL FOR UPDATE;
  IF NOT FOUND OR length(trim(COALESCE(p_reason,'')))=0 THEN RAISE EXCEPTION 'cms_invalid_transition'; END IF;
  IF current_revision.state='draft' AND p_next_state='review' AND NOT cms_has_role(ARRAY['editor','reviewer','publisher','admin']) THEN RAISE EXCEPTION 'cms_forbidden';
  ELSIF current_revision.state='review' AND p_next_state IN ('draft','rejected') AND NOT cms_has_role(ARRAY['reviewer','publisher','admin']) THEN RAISE EXCEPTION 'cms_forbidden';
  ELSIF current_revision.state='review' AND p_next_state='published' AND NOT cms_has_role(ARRAY['publisher','admin']) THEN RAISE EXCEPTION 'cms_forbidden';
  ELSIF current_revision.state='published' AND p_next_state='archived' AND NOT cms_has_role(ARRAY['publisher','admin']) THEN RAISE EXCEPTION 'cms_forbidden';
  ELSIF NOT ((current_revision.state='draft' AND p_next_state='review') OR (current_revision.state='review' AND p_next_state IN ('draft','rejected','published')) OR (current_revision.state='published' AND p_next_state='archived')) THEN RAISE EXCEPTION 'cms_invalid_transition'; END IF;
  UPDATE cms_revisions SET state=p_next_state, review_reason=trim(p_reason), reviewed_by=CASE WHEN p_next_state IN ('review','rejected') THEN auth.uid() ELSE reviewed_by END,
    published_by=CASE WHEN p_next_state='published' THEN auth.uid() ELSE published_by END, published_at=CASE WHEN p_next_state='published' THEN now() ELSE published_at END, updated_at=now()
  WHERE id=p_revision_id;
  INSERT INTO cms_audit_log(actor_id,action,entity_type,entity_key,revision_id,reason) VALUES(auth.uid(),'state_'||p_next_state,current_revision.entity_type,current_revision.entity_key,p_revision_id,trim(p_reason));
  RETURN p_revision_id;
END $$;

REVOKE ALL ON FUNCTION cms_save_draft(text,text,text,jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION cms_transition_revision(uuid,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION cms_save_draft(text,text,text,jsonb) TO authenticated;
GRANT EXECUTE ON FUNCTION cms_transition_revision(uuid,text,text) TO authenticated;

-- Media remains private. P0-15-compatible service issues short-lived delivery URLs after ACL.
INSERT INTO storage.buckets(id,name,public) VALUES('cms-private','cms-private',false) ON CONFLICT(id) DO UPDATE SET public=false;
DROP POLICY IF EXISTS cms_media_authenticated_all ON storage.objects;
CREATE POLICY cms_media_role_insert ON storage.objects FOR INSERT TO authenticated WITH CHECK(bucket_id='cms-private' AND cms_has_role(ARRAY['editor','reviewer','publisher','admin']));
CREATE POLICY cms_media_role_read ON storage.objects FOR SELECT TO authenticated USING(bucket_id='cms-private' AND cms_has_role(ARRAY['editor','reviewer','publisher','admin','service']));
CREATE POLICY cms_media_admin_delete ON storage.objects FOR DELETE TO authenticated USING(bucket_id='cms-private' AND cms_has_role(ARRAY['admin']));

COMMIT;
