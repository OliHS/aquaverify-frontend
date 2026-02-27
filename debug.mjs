import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
    });
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
    page.on('pageerror', error => console.log('BROWSER PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('BROWSER REQUEST FAILED:', request.url(), request.failure().errorText));

    console.log("Navigating to local vite dev server...");
    try {
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle0', timeout: 15000 });
        console.log("Navigation complete. Waiting 2 seconds for React execution...");
        await new Promise(r => setTimeout(r, 2000));
    } catch (e) {
        console.log("Navigation exploded:", e.message);
    }

    await browser.close();
})();
