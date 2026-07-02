const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const EDUCATION_URL = 'https://awsstaging.heartfulness.org/education/';

// Helper to safely handle popups - waits briefly but doesn't hang on slow-loading pages
async function handlePopup(popupPromise) {
    const popup = await popupPromise;
    try {
        await popup.waitForLoadState('domcontentloaded', { timeout: 5000 });
    } catch (e) {
        // Popup didn't fully load -  just close it
    }
    await popup.close();
}


test('Heartfulness Education -> Home screen', async ({ page }) => {
    // Extend test timeout since we have 17+ interactions
    test.setTimeout(120000);

    try {
        await page.goto(EDUCATION_URL);

        // --- Section 1: Education Training section ---
        await page.getByRole('link', { name: 'img01 Education Training and' }).click();
        await page.getByRole('link', { name: 'Read more >', exact: true }).click();
        await page.waitForLoadState('domcontentloaded');

        await page.goto(EDUCATION_URL);

        // --- Section 2: Yoga Teacher Training (opens popup) ---
        await page.getByRole('link', { name: 'img02 Yoga Teacher Training' }).click();
        const yogaPopupPromise = page.waitForEvent('popup');
        await page.locator('#yoga').getByRole('link', { name: 'Read More >' }).click();
        await handlePopup(yogaPopupPromise);

        // --- Section 3: Wellness Meditation (opens popup) ---
        await page.getByRole('link', { name: 'img04 Wellness Meditation' }).click();
        const wellnessPopupPromise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Upcoming workshops >' }).click();
        await handlePopup(wellnessPopupPromise);

        // --- Section 4: Fellowship Curriculum ---
        await page.getByRole('link', { name: 'img01 Fellowship Curriculum' }).click();
        await page.getByRole('link', { name: 'Learn more >' }).click();
        await page.waitForLoadState('domcontentloaded');

        await page.goto(EDUCATION_URL);

        // --- Section 5: About Trust (opens popup) ---
        await page.getByRole('link', { name: 'img04 About Trust Heart-based' }).click();

        const educationLink = page.locator('#custom_html-2').getByRole('link', { name: 'Education', exact: true });
        await educationLink.scrollIntoViewIfNeeded();
        await sleep(1000);

        const trustPopupPromise = page.waitForEvent('popup');
        await educationLink.click({ force: true });
        await handlePopup(trustPopupPromise);

        // --- Section 6: Footer/sidebar links that open popups ---
        const popupLinks = [
            { name: 'Continual Medical Education', exact: false },
            { name: 'Yoga Teachers Training', exact: false },
            { name: 'Heartfulness Research', exact: true },
            { name: 'Daaji', exact: true },
            { name: 'Sahaj Marg', exact: false },
            { name: 'Kanha Shanti Vanam', exact: false },
            { name: 'Green Kanha', exact: false },
            { name: 'Gurugram Meditation Center', exact: false },
            { name: 'Shri Ram Chandra Mission', exact: false },
            { name: 'Spirituality Foundation', exact: false },
            { name: 'Publications', exact: false },
            { name: 'Digital Store', exact: false },
            { name: 'HFNLife online store', exact: false },
            { name: 'Magazine Issue', exact: false },
        ];

        for (const { name, exact } of popupLinks) {
            const link = page.getByRole('link', { name, exact });
            await link.scrollIntoViewIfNeeded();
            await sleep(500);

            const popupPromise = page.waitForEvent('popup');
            await link.click({ force: true });
            await handlePopup(popupPromise);
        }
    } catch (error) {
        console.error('Test failed:', error.message);
        // Quick screenshot with short timeout - don't let it hang
        try {
            if (!page.isClosed()) {
                await page.screenshot({
                    path: `error-education-${Date.now()}.png`,
                    fullPage: true,
                    timeout: 5000
                });
            }
        } catch (screenshotError) {
            console.error('Screenshot also failed:', screenshotError.message);
        }
        throw error;
    }
});