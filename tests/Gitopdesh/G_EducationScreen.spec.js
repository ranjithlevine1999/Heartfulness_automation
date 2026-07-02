const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Heartfulness Education -> Education menu screen', async ({ page }) => {
    try {
        await page.goto('https://awsstaging.heartfulness.org/education/');

        // Open Education menu from primary nav
        await page.locator('#primary-menu').getByRole('link', { name: 'Education' }).click();
        await sleep(500);

        // Click through the 5 "I" sections
        const sections = ['INSPIRE', 'INTEGRATE', 'INTENSIFY', 'INCLUDE', 'INVOLVE'];

        for (const section of sections) {
            await page.getByRole('link', { name: section, exact: true }).click();
            await sleep(500);
        }
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            await page.screenshot({
                path: `error-education-menu-${Date.now()}.png`,
                fullPage: true,
                timeout: 5000
            });
        }
        throw error;
    }
});