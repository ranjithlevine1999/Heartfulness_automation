const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/events/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';


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


test('Heartfulness -> Events page navigation and filters', async ({ page }) => {
    test.setTimeout(90000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Navigate to Events ---
        await page.getByRole('link', { name: 'Events' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2500);
        await takeScreenshot(page, 'Events_Page_Loaded');

        // --- Open Language filter dropdown (shows "All" by default) ---
        await page.locator('button, div').filter({ hasText: /^All$/ }).first().click();
        await sleep(1000);

        // --- Select Hindi from language options ---
        await page.getByRole('option', { name: 'Hindi' }).click();
        await sleep(800);
        await takeScreenshot(page, 'Hindi_Selected');

        // --- Click SEARCH button (the blue main search button) ---
        await page.getByLabel('SEARCH').click();
        await sleep(2000);
        await takeScreenshot(page, 'Search_Results');

        // --- Click Donate link in nav ---
        await page.getByRole('navigation').getByRole('link', { name: 'Donate' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
        await takeScreenshot(page, 'Donate_Page');

        console.log('✓ Events page navigation completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Events_Donate_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});