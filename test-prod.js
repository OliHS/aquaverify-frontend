const fs = require('fs');

async function run() {
  const html = await fetch('https://www.aquaverify.com').then(res => res.text());
  const scriptMatch = html.match(/src="\/assets\/(index-[^"]+\.js)"/);
  if (!scriptMatch) { console.log("Script not found"); return; }
  
  const js = await fetch('https://www.aquaverify.com/assets/' + scriptMatch[1]).then(res => res.text());
  
  const urlMatch = js.match(/(https:\/\/[^.]+\.supabase\.co)/);
  const keyMatch = js.match(/(eyJ[^"']+)/);
  
  if (!urlMatch || !keyMatch) { console.log("API Keys not found"); return; }
  
  const url = urlMatch[1];
  const key = keyMatch[1];
  
  console.log("Found URL:", url);
  
  const data = await fetch(`${url}/rest/v1/content_blocks?select=section_id,content`, {
    headers: {
      'apikey': key,
      'Authorization': 'Bearer ' + key
    }
  }).then(res => res.json());
  
  console.log(JSON.stringify(data, null, 2));
}

run();
