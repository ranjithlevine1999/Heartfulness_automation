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


test('Heartfulness -> Explore all events (close popups)', async ({ page }) => {
    test.setTimeout(90000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Click Heartfulness logo to return home ---
        await page.getByRole('link', { name: 'HeartfulnessLogo_Blk_Pwd' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);

        // --- Click Explore all events button ---
        await page.getByRole('button', { name: 'Explore all events' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Click first event card - opens a popup, then close it ---
        const popupPromise1 = page.waitForEvent('popup');
        await page.locator('.mt-3 > .flex').first().click();
        const popup1 = await popupPromise1;
        await popup1.waitForLoadState('domcontentloaded').catch(() => {});
        console.log('First popup opened:', popup1.url());
        await popup1.close();
        await sleep(1000);

        await takeScreenshot(page, 'After_First_Popup_Closed');

        // --- Click second event card (batch no heartfulness) - opens popup, then close it ---
        const popupPromise2 = page.waitForEvent('popup');
        await page.locator('div').filter({
            hasText: /^batch no heartfulnessKanha Shanti VanamVIEW DETAILS$/
        }).getByRole('button').click();
        const popup2 = await popupPromise2;
        await popup2.waitForLoadState('domcontentloaded').catch(() => {});
        console.log('Second popup opened:', popup2.url());
        await popup2.close();
        await sleep(1000);

        await takeScreenshot(page, 'After_Second_Popup_Closed');

        console.log('✓ Explore all events flow completed - both popups closed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'ExploreAllEvents_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});