const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Green Khana Run -> Results screen', async ({ page }) => {
    try {
        await page.goto('https://staging.greenheartfulnessrun.com/');

        const resultLinks = [
            'November 2025 - Race Results',
            'November 2024 - Timed Race Results',
            'February 2023 - Timed Race Results',
            'November 2023 - Timed Race Results',
        ];

        for (const linkName of resultLinks) {
            // Open Results dropdown
            await page.getByRole('button', { name: 'Results' }).click();
            await sleep(800);

            // Wait for the specific link to be visible
            const link = page.getByRole('link', { name: linkName, exact: true });
            await link.waitFor({ state: 'visible', timeout: 10000 });

            // Click link and handle popup
            const popupPromise = page.waitForEvent('popup');
            await link.click();
            const popup = await popupPromise;
            await popup.waitForLoadState();
            await popup.close();

            await sleep(500);
        }
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            await page.screenshot({ path: `error-results-${Date.now()}.png`, fullPage: true });
        }
        throw error;
    }
});