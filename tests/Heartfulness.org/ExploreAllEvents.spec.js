const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

const LANGUAGE = 'Hindi';


async function loginToHFN(page) {
    await page.goto(HFN_URL);
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);

    await page.getByRole('button', { name: 'Sign In' }).click();
    await sleep(500);
    await page.getByRole('link', { name: 'Signin with Email' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1000);

    await page.getByLabel('Email ID *').fill(USERNAME);
    await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(2500);
}


test('Heartfulness -> Explore events, filter by Hindi, and view event details', async ({ page }) => {
    test.setTimeout(120000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Click Explore all events ---
        await page.getByRole('button', { name: 'Explore all events' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Open Language filter dropdown ---
        await page.locator('div').filter({ hasText: /^LanguageAll$/ })
            .getByRole('combobox').click();
        await sleep(800);

        // --- Select Hindi language ---
        await page.getByText(LANGUAGE, { exact: true }).click();
        await sleep(500);

        // --- Click SEARCH button ---
        await page.getByLabel('SEARCH').click();
        await sleep(2000);
        await takeScreenshot(page, 'Filtered_By_Hindi');

        // --- Click VIEW DETAILS on first event - opens popup ---
        const popupPromise = page.waitForEvent('popup', { timeout: 10000 });
        await page.getByRole('button', { name: 'VIEW DETAILS' }).first().click();
        const eventPopup = await popupPromise.catch(() => null);
        if (eventPopup) {
            await eventPopup.waitForLoadState('domcontentloaded').catch(() => {});
            console.log('Event details popup opened:', eventPopup.url());
            await eventPopup.close();
        }
        await sleep(1000);

        // --- Click FILTER button ---
        await page.getByLabel('FILTER').click();
        await sleep(1500);
        await takeScreenshot(page, 'Filter_Opened');

        // --- Navigate back to Events page ---
        await page.getByRole('link', { name: 'Events' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
        await takeScreenshot(page, 'Back_To_Events');

        console.log('✓ Events filter Hindi flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Events_Filter_Hindi_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});