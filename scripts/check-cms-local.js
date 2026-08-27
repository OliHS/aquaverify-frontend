import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => fs.readFileSync(path.join(root, name), 'utf8');
const checks = [];
function check(id, condition) { checks.push({ id, status: condition ? 'PASS' : 'FAIL' }); }

const sql = read('supabase_p0_13_cms_lead_privacy.sql');
const workflow = read('utils/cmsWorkflow.ts');
const media = read('utils/cmsMediaPolicy.ts');
const editors = ['pages/admin/PageEditor.tsx', 'pages/admin/MarketingPageEditor.tsx', 'pages/admin/VisualBuilder.tsx'].map(read);

check('LOCAL-CMS-01', /DROP POLICY IF EXISTS "Allow authenticated full access/.test(sql));
check('LOCAL-CMS-02', /ARRAY\['publisher','admin'\]/.test(sql));
check('LOCAL-CMS-03', !/cms_revisions[^;]+TO anon/is.test(sql));
check('LOCAL-CMS-04', editors.every((source) => source.includes('saveCmsDraft')));
check('LOCAL-CMS-05', /draft[\s\S]+review[\s\S]+published/.test(workflow));
check('LOCAL-CMS-06', /CMS_MEDIA_MAX_BYTES/.test(media) && /visibility: 'private'/.test(media));

const failed = checks.filter((item) => item.status === 'FAIL');
console.log(JSON.stringify({ status: failed.length ? 'FAIL' : 'PASS', mode: 'LOCAL_STATIC_MOCK', remoteAccessAttempted: false, checks }, null, 2));
if (failed.length) process.exitCode = 1;
