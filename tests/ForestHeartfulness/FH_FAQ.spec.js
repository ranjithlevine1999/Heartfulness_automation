const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const FORESTS_URL = 'https://forest.staging.heartfulness.org/forests/';

// Hide the QA/STAGING banner that overlays page content
async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}


test('Heartfulness Forest -> FAQs screen', async ({ page }) => {
    try {
        // Re-hide banner on every navigation
        page.on('framenavigated', async () => {
            try {
                await hideStagingBanner(page);
            } catch (e) {
                // Frame not ready - ignore
            }
        });

        await page.goto(FORESTS_URL);
        await hideStagingBanner(page);

        // Navigate to FAQs section (anchor link)
        await page.getByRole('link', { name: 'FAQs', exact: true }).click();
        await sleep(800);

        // Expand all FAQ accordions
        const faqQuestions = [
            'What is Forests By',
            'What are the main objectives',
            'How can I contribute to “',
            'How does FBH monitor the',
            'When do the saplings I',
            'Do I get to choose the plant',
            'Do I get to choose the place',
            'How is Forests By',
            'Where can I get more',
        ];

        for (const question of faqQuestions) {
            await page.getByRole('button', { name: question }).click();
            await sleep(300);
        }
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-forests-faqs-${Date.now()}.png`,
                    fullPage: true,
                    timeout: 5000
                });
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});