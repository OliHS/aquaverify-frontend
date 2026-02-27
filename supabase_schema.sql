-- Create pages table
CREATE TABLE IF NOT EXISTS pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create content_blocks table
CREATE TABLE IF NOT EXISTS content_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    page_id UUID REFERENCES pages(id) ON DELETE CASCADE,
    section_id TEXT NOT NULL,
    content JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(page_id, section_id)
);

-- Create distributors table
CREATE TABLE IF NOT EXISTS distributors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    location TEXT,
    country TEXT NOT NULL,
    type TEXT NOT NULL,
    address TEXT,
    email TEXT,
    phone TEXT,
    lat NUMERIC,
    lng NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE distributors ENABLE ROW LEVEL SECURITY;

-- Create Policies for pages
CREATE POLICY "Allow public read-only access to pages" ON pages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to pages" ON pages FOR ALL USING ((auth.jwt() ->> 'role') = 'authenticated');

-- Create Policies for content_blocks
CREATE POLICY "Allow public read-only access to content_blocks" ON content_blocks FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to content_blocks" ON content_blocks FOR ALL USING ((auth.jwt() ->> 'role') = 'authenticated');

-- Create Policies for distributors
CREATE POLICY "Allow public read-only access to distributors" ON distributors FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to distributors" ON distributors FOR ALL USING ((auth.jwt() ->> 'role') = 'authenticated');

-- Insert initial page entry for home
INSERT INTO pages (slug, title, seo_title, seo_description) 
VALUES ('home', 'AquaVerify', 'AquaVerify - Advanced Water Verification', 'Ensuring water quality and safety worldwide.')
ON CONFLICT (slug) DO NOTHING;

-- Create product_families table
CREATE TABLE IF NOT EXISTS product_families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    use_cases JSONB DEFAULT '[]'::jsonb,
    is_hidden BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES product_families(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    detail TEXT,
    description TEXT,
    image TEXT,
    images JSONB DEFAULT '[]'::jsonb,
    specific_use_cases JSONB DEFAULT '[]'::jsonb,
    specs JSONB DEFAULT '{}'::jsonb,
    is_hidden BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE product_families ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create Policies for product_families
CREATE POLICY "Allow public read-only access to product_families" ON product_families FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to product_families" ON product_families FOR ALL USING ((auth.jwt() ->> 'role') = 'authenticated');

-- Create Policies for products
CREATE POLICY "Allow public read-only access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow authenticated full access to products" ON products FOR ALL USING ((auth.jwt() ->> 'role') = 'authenticated');
