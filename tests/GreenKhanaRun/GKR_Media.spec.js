const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Green Khana Run -> Media screen', async ({ page }) => {
    try {
        await page.goto('https://staging.greenheartfulnessrun.com/');

        // Open Media dropdown
        await page.getByRole('button', { name: 'Media' }).click();
        await sleep(500);

        // Click Race Day Images - Nov 2025 (opens in new tab)
        const popup1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Race Day Images - Nov 2025', exact: true }).click();
        const popup1 = await popup1Promise;
        await popup1.waitForLoadState();
        await popup1.close();

        // Re-open Media dropdown
        await page.getByRole('button', { name: 'Media' }).click();
        await sleep(500);

        // Click Race Day Images - Nov 2024
        const popup2Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Race Day Images - Nov 2024', exact: true }).click();
        const popup2 = await popup2Promise;
        await popup2.waitForLoadState();
        await popup2.close();

        // Re-open Media dropdown
        await page.getByRole('button', { name: 'Media' }).click();
        await sleep(500);

        // Click Race Day Images - Feb 2023
        const popup3Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Race Day Images - Feb 2023', exact: true }).click();
        const popup3 = await popup3Promise;
        await popup3.waitForLoadState();
        await popup3.close();

        // Re-open Media dropdown and click Gallery
        await page.getByRole('button', { name: 'Media' }).click();
        await sleep(500);
        await page.getByRole('link', { name: 'Gallery', exact: true }).click();
        await page.waitForLoadState('domcontentloaded');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            await page.screenshot({ path: `error-media-${Date.now()}.png`, fullPage: true });
        }
        throw error;
    }
});