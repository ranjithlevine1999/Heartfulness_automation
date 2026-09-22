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


test('HFN Global -> Abhyasi Bulletin subscription preferences', async ({ page }) => {
    test.setTimeout(90000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Click "Abhyasi Bulletin" - opens a popup/new tab ---
        const popupPromise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Abhyasi Bulletin' }).click();
        const bulletinPage = await popupPromise;
        await bulletinPage.waitForLoadState('domcontentloaded');
        await sleep(2000);

        await takeScreenshot(bulletinPage, 'Bulletin_Page_Opened');

        // --- Subscribe to English on Abhyasi Bulletin section ---
        await bulletinPage.locator('#abhyasi-bulletin')
            .getByRole('button', { name: 'English' }).click();
        await sleep(800);

        // --- Enable Daily Reflections toggle ---
        await bulletinPage.locator('#daily-reflections')
            .getByLabel('').first().click();
        await sleep(500);

        // --- Enable Whispers toggle ---
        await bulletinPage.locator('div').filter({
            hasText: /^WhispersDivine guidance and inner whispers to illuminate your path\.0 Languages$/
        }).getByLabel('').click();
        await sleep(500);

        // --- Save Preferences ---
        await bulletinPage.getByRole('button', { name: 'Save Preferences' }).click();
        await sleep(2000);

        await takeScreenshot(bulletinPage, 'Preferences_Saved');
        console.log('✓ Abhyasi Bulletin preferences saved successfully');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'AbhyasiBulletin_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});