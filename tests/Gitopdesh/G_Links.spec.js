const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const EDUCATION_URL = 'https://awsstaging.heartfulness.org/education/';


test('Heartfulness Education -> Research / Yoga / Essay / Donate links', async ({ page }) => {
    try {
        await page.goto(EDUCATION_URL);

        // --- Heartfulness Research Centre (opens popup) ---
        const researchPopupPromise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Heartfulness Research Centre' }).click();
        const researchPopup = await researchPopupPromise;

        // Close the popup and stay on the education home page
        try {
            await researchPopup.waitForLoadState('domcontentloaded', { timeout: 5000 });
        } catch (e) {
            // Popup didn't fully load - that's okay
        }
        await researchPopup.close();

        // --- Yoga link (navigates away from home) ---
        await page.getByRole('link', { name: 'Yoga', exact: true }).click();
        await page.waitForLoadState('domcontentloaded');

        // Return to education home
        await page.goto(EDUCATION_URL);

        // --- Essay Event ---
        await page.getByRole('link', { name: 'Essay Event' }).click();
        await page.waitForLoadState('domcontentloaded');

        // Return to education home
        await page.goto(EDUCATION_URL);

        // --- Donate ---
        await page.getByRole('link', { name: 'Donate' }).click();
        await page.waitForLoadState('domcontentloaded');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-education-links-${Date.now()}.png`,
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