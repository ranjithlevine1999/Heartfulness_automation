const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const APP_URL = 'https://contributions.staging.heartfulness.org/in-en';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';


async function loginToContributions(page) {
    await page.goto(APP_URL);
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


// Open the profile dropdown - clicks the avatar button (rounded-full h-8 w-8)
async function openProfileMenu(page) {
    // Wait for menu to be closed before clicking (in case it's already open)
    const avatarButton = page.locator('button[aria-haspopup="menu"]').first();

    // If menu is already open, close it first with Escape
    const state = await avatarButton.getAttribute('data-state').catch(() => null);
    if (state === 'open') {
        await page.keyboard.press('Escape');
        await sleep(500);
    }

    await avatarButton.click();
    await sleep(800);
}


test('Contributions -> Profile menu navigation and sign out', async ({ page }) => {
    test.setTimeout(120000);

    try {
        // --- Login ---
        await loginToContributions(page);
        await takeScreenshot(page, 'After_Login');

        // --- Open profile menu -> My Account (opens popup) ---
        await openProfileMenu(page);
        const popupPromise = page.waitForEvent('popup', { timeout: 5000 });
        await page.getByRole('menuitem', { name: 'My Account' })
            .or(page.getByRole('button', { name: 'My Account' })).first().click();
        const accountPopup = await popupPromise.catch(() => null);
        if (accountPopup) {
            await accountPopup.waitForLoadState('domcontentloaded').catch(() => {});
            console.log('My Account popup opened:', accountPopup.url());
            await accountPopup.close();
        }
        await sleep(1500);

        // --- Open profile menu -> My Donation History ---
        await openProfileMenu(page);
        await page.getByRole('menuitem', { name: 'My Donation History' })
            .or(page.getByRole('button', { name: 'My Donation History' })).first().click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await takeScreenshot(page, 'My_Donation_History');

        // --- Open profile menu -> My Donation Settings ---
        await openProfileMenu(page);
        await page.getByRole('menuitem', { name: 'My Donation Settings' })
            .or(page.getByRole('button', { name: 'My Donation Settings' })).first().click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await takeScreenshot(page, 'My_Donation_Settings');

        // --- Open profile menu -> Sign Out ---
        await openProfileMenu(page);
        await page.getByRole('menuitem', { name: 'Sign Out' })
            .or(page.getByRole('button', { name: 'Sign Out' })).first().click();
        await sleep(800);

        // Confirm sign out
        await page.getByRole('button', { name: 'Yes, sign out' }).click();
        await sleep(1500);

        // Accept final dialog
        await page.getByTestId('dialog-accept-button').click();
        await sleep(2000);

        await takeScreenshot(page, 'Signed_Out');
        console.log('✓ Profile menu navigation and sign out completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Contributions_Profile_Menu_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});