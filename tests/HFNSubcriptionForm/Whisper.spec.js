const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/';

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


test('HFN -> Whispers subscription preferences', async ({ page }) => {
    test.setTimeout(90000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Click "Whispers" link - opens a popup/new tab ---
        const popupPromise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Whispers' }).click();
        const whispersPage = await popupPromise;
        await whispersPage.waitForLoadState('domcontentloaded');
        await sleep(2000);

        await takeScreenshot(whispersPage, 'Whispers_Page_Opened');

        // --- Enable Whispers toggle ---
        await whispersPage.locator('div').filter({
            hasText: /^WhispersDivine guidance and inner whispers to illuminate your path\.0 Languages$/
        }).getByLabel('').click();
        await sleep(500);

        // --- Save Preferences ---
        await whispersPage.getByRole('button', { name: 'Save Preferences' }).click();
        await sleep(2000);

        // --- Toggle One Beautiful Thought ---
        await whispersPage.locator('#one-beautiful-thought > .hfn-mb-3 > div > div > .inline-flex > .rounded').click();
        await sleep(500);

        // --- Preview email for Abhyasi Bulletin ---
        await whispersPage.locator('#abhyasi-bulletin').getByRole('button', { name: 'Preview email' }).click();
        await sleep(1500);

        // Close preview modal
        await whispersPage.keyboard.press('Escape');
        await sleep(500);

        // --- Select French language in Whispers section ---
        await whispersPage.locator('#whispers').getByRole('button', { name: 'French (Français)' }).click();
        await sleep(500);

        await takeScreenshot(whispersPage, 'Whispers_Preferences_Set');
        console.log('✓ Whispers preferences saved successfully');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Whispers_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});