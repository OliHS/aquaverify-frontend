import fs from 'fs';

const targetCountries = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", "Belgium", "Brazil",
    "Canada", "Chile", "China", "Colombia", "Denmark", "Egypt", "Finland", "France", "Germany", "Greece",
    "India", "Indonesia", "Iran", "Ireland", "Israel", "Italy", "Japan", "Kenya", "Malaysia", "Mexico",
    "Morocco", "Netherlands", "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", "Poland",
    "Portugal", "Russia", "Saudi Arabia", "Singapore", "South Africa", "South Korea", "Sweden",
    "Switzerland", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
];

async function run() {
    console.log(`Generating SQL for ${targetCountries.length} countries...`);

    let sqlChunks = [
        `-- Seed Script for Open Territories`,
        `DELETE FROM distributors WHERE type = 'open';\n`
    ];

    // We use the RESTCountries API to grab precise geographic centers
    for (const country of targetCountries) {
        let lat = 0, lng = 0;
        try {
            const res = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true`);
            const data = await res.json();
            if (data && data.length > 0) {
                lat = data[0].latlng[0];
                lng = data[0].latlng[1];
            } else {
                console.warn(`⚠️ Could not find coordinates for ${country}`);
            }
        } catch (e) {
            console.error(`Failed to fetch coords for ${country}:`, e.message);
        }

        const safeCountry = country.replace(/'/g, "''");

        sqlChunks.push(`INSERT INTO distributors (name, location, country, type, address, email, phone, lat, lng, x, y) VALUES ('Open Territory: ${safeCountry}', '${safeCountry}', '${safeCountry}', 'open', 'Contact us for partnership details', 'partners@aquaverify.com', '', ${lat}, ${lng}, 0, 0);`);

        // slight delay to respect public API rate limits
        await new Promise(r => setTimeout(r, 100));
    }

    fs.writeFileSync('supabase_seed.sql', sqlChunks.join('\n'));
    console.log('🎉 Done! SQL generated in supabase_seed.sql');
}

run();
