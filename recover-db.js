import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function recover() {
    const sectionsToReset = ['valueProps', 'products', 'saas', 'distributors', 'oem', 'sectors', 'hero'];

    for (const sec of sectionsToReset) {
        const { data } = await supabase.from('content_blocks').select('*').eq('page_id', '0040cba0-4b37-4112-b590-599182f7d946').eq('section_id', sec).single();
        if (data) {
            const newContent = { ...data.content };
            let changed = false;

            for (const key of Object.keys(newContent)) {
                if (newContent[key] === "") {
                    delete newContent[key];
                    changed = true;
                } else if (typeof newContent[key] === 'object' && newContent[key] !== null) {
                    if (newContent[key].en === "") {
                        delete newContent[key].en;
                        changed = true;
                    }
                    if (newContent[key].es === "") {
                        delete newContent[key].es;
                        changed = true;
                    }
                    if (Object.keys(newContent[key]).length === 0) {
                        delete newContent[key];
                        changed = true;
                    }
                }
            }

            if (changed) {
                await supabase.from('content_blocks').update({ content: newContent }).eq('id', data.id);
                console.log(`Reset empty fields for ${sec}`);
            }
        }
    }
}

recover();
