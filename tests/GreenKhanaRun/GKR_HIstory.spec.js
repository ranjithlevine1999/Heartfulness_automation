const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Green Khana Run -> History screen', async ({ page }) => {
    try {
        await page.goto('https://staging.greenheartfulnessrun.com/');

        // Open History dropdown
        await page.getByRole('button', { name: 'History' }).click();
        await sleep(500);

        // Click the first link starting with "Feb" (regex match, not exact)
        await page.getByRole('link', { name: /^Feb/ }).first().click();
        await page.waitForLoadState('domcontentloaded');

        // Browse through event sections
        await page.getByRole('link', { name: 'Impact', exact: true }).click();
        await page.getByRole('link', { name: 'Number of Runners', exact: true }).click();
        await page.getByRole('link', { name: 'Winners', exact: true }).click();
        await page.getByRole('link', { name: 'Pictures', exact: true }).click();
        await page.getByRole('link', { name: 'Video Post Run', exact: true }).click();

        // Open video modal and close it
        await page.getByRole('button', { name: 'VIDEO POST RUN' }).click();
        await sleep(500);
        await page.getByLabel('Close').click();
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            await page.screenshot({ path: `error-history-${Date.now()}.png`, fullPage: true });
        }
        throw error;
    }
});