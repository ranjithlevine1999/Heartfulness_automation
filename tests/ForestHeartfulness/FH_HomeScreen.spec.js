const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const FORESTS_URL = 'https://forest.staging.heartfulness.org/forests/';

async function handlePopup(popupPromise) {
    const popup = await popupPromise;
    try {
        await popup.waitForLoadState('domcontentloaded', { timeout: 5000 });
    } catch (e) {
        // Popup didn't fully load - okay
    }
    await popup.close();
}

// Click a moving element in a carousel reliably
async function clickInCarousel(locator) {
    await locator.scrollIntoViewIfNeeded();
    await sleep(1000); // let carousel animation settle
    await locator.click({ force: true });
}


test('Heartfulness Forest -> Home screen', async ({ page }) => {
    test.setTimeout(120000);

    try {
        await page.goto(FORESTS_URL);

        // --- 2024 Annual Report (popup) ---
        const report2024Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Read our 2024 Annual Report' }).click();
        await handlePopup(report2024Promise);

        // --- 2022 Annual Report (popup) ---
        const report2022Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Read our 2022 Annual Report' }).click();
        await handlePopup(report2022Promise);

        // --- Donate Saplings link ---
        await clickInCarousel(page.getByRole('link', { name: 'DonateSaplings' }));
        await page.waitForLoadState('domcontentloaded');
        await page.goto(FORESTS_URL);

        // --- Gifting Saplings link (in carousel) ---
        await clickInCarousel(page.getByRole('link', { name: 'Gifting Saplings' }));
        await page.waitForLoadState('domcontentloaded');
        await page.goto(FORESTS_URL);

        // --- Gifting Saplings buttons ---
        await clickInCarousel(page.getByRole('button', { name: 'Gifting Saplings' }).first());
        await page.waitForLoadState('domcontentloaded');
        await page.goto(FORESTS_URL);

        await clickInCarousel(page.getByRole('button', { name: 'Gifting Saplings' }).nth(1));
        await page.waitForLoadState('domcontentloaded');
        await page.goto(FORESTS_URL);

        // --- Play embedded videos ---
        try {
            await page.locator('iframe').first().contentFrame().getByLabel('Play video').click();
            await sleep(1000);
            await page.locator('iframe').nth(1).contentFrame().getByLabel('Play video').click();
            await sleep(1000);
        } catch (e) {
            console.warn('Video play interaction failed (non-blocking):', e.message);
        }

        // --- View all section ---
        await page.getByRole('button', { name: 'VIEW ALL' }).click();
        await page.waitForLoadState('domcontentloaded');
        await page.goto(FORESTS_URL);

        // --- Read More popups ---
        const readMore1Promise = page.waitForEvent('popup');
        await clickInCarousel(page.getByRole('link', { name: 'Read More ' }).first());
        await handlePopup(readMore1Promise);

        const readMore2Promise = page.waitForEvent('popup');
        await clickInCarousel(page.getByRole('link', { name: 'Read More ' }).nth(1));
        await handlePopup(readMore2Promise);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-forests-${Date.now()}.png`,
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