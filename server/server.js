import express from 'express';
import puppeteer from 'puppeteer';
import cors from 'cors';
import browsers from './browser.js';

const app = express();
const port = 5000;

function getRandomBrowser() {
    return browsers[Math.floor(Math.random() * browsers.length)];
}

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/api/vaccines', async (req, res) => {
    try {
        const browserConfig = getRandomBrowser();
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent(browserConfig.userAgent);
        await page.goto('https://www.fda.gov/vaccines-blood-biologics/vaccines/vaccines-licensed-use-united-states', { waitUntil: 'networkidle2' });

        console.log('Page loaded successfully');

        await page.waitForSelector('.main-content div div table tbody');

        const vaccines = await page.evaluate(async () => {
            const vaccineElements = Array.from(document.querySelectorAll('.main-content div div table tbody tr'));
            console.log(`Found ${vaccineElements.length} vaccine elements`);
            const results = [];

            for (let el of vaccineElements) {
                const vaccineNameElement = el.querySelector('td a');
                const vaccineName = vaccineNameElement ? vaccineNameElement.textContent.trim() : '';
                const link = vaccineNameElement ? vaccineNameElement.href : '';
                const tradeName = el.querySelectorAll('td')[1] ? el.querySelectorAll('td')[1].textContent.trim() : '';

                console.log(`Processing: ${vaccineName}, ${tradeName}, ${link}`);

                if (link) {
                    try {
                        const response = await fetch(link);
                        const html = await response.text();
                        console.log('Details page HTML:', html.substring(0, 1000)); // Log the first 1000 chars of the details page

                        const manufacturer = (() => {
                            let manufacturer = '';
                            const parser = new DOMParser();
                            const doc = parser.parseFromString(html, 'text/html');
                            const pTags = Array.from(doc.querySelectorAll('p'));
                            pTags.forEach(p => {
                                const textContent = p.textContent;
                                const match = textContent.match(/Manufacturer(?:\s*[:\s]|:&nbsp;)([^\r\n]+)/i)
                                    || textContent.match(/Manufacture(?:\s*[:\s]|:&nbsp;)([^\r\n]+)/i);
                                if (match) {
                                    manufacturer = match[1].trim();
                                }
                            });
                            return manufacturer;
                        })();

                        results.push({ vaccineName, tradeName, link, manufacturer });
                    } catch (error) {
                        console.error(`Error fetching details page for ${link}:`, error);
                    }
                }
            }

            return results;
        });

        console.log('Vaccines data:', vaccines);
        await browser.close();
        res.json(vaccines);
    } catch (error) {
        console.error('Error fetching vaccines:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
