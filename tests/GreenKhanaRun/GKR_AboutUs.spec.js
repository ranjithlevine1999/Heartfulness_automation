const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Greeen Khana Run -> AboutUS screen', async ({ page }) => {
    try {
        await page.goto('https://staging.greenheartfulnessrun.com/');

        // Open the About Us dropdown
        await page.getByRole('button', { name: 'About Us' }).click();

        // Wait for the Title Sponsor link to be visible, then click it
        const titleSponsorLink = page.getByRole('link', { name: 'Title Sponsor' });
        await titleSponsorLink.waitFor({ state: 'visible', timeout: 10000 });
        await titleSponsorLink.click();

        // Verify navigation succeeded
        await page.waitForLoadState('domcontentloaded');

        // Optional: open the About Us menu again on the new page
        await page.getByRole('button', { name: 'About Us' }).click();
    } catch (error) {
        console.error('Test failed:', error.message);
        await page.screenshot({ path: `error-aboutus-${Date.now()}.png`, fullPage: true });
        throw error;
    }
});