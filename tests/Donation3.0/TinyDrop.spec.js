const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility to generate random lowercase letters for unique names per run
const randomLetters = (n) => Array.from({ length: n }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');

const APP_URL = 'https://contributions.staging.heartfulness.org/in-en';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

const DONOR = {
    firstName: `test${randomLetters(3)}`,   // e.g. test_xkp
    email: 'Test@gmail.com',
    phone: '8989849656',
    citySearch: 'chennai',
    cityOption: 'Cheltenham Township',
    address: '5456',
    postalCode: '600065',
};


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


test('Contributions -> INR donation (India English) flow', async ({ page }) => {
    test.setTimeout(180000);

    console.log('Donor first name for this run:', DONOR.firstName);

    try {
        // --- Login ---
        await loginToContributions(page);
        await takeScreenshot(page, 'After_Login');

        // --- Click Donate on the campaign card ---
        await page.locator('div:nth-child(3) > div:nth-child(4) > div > .whitespace-nowrap').click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Fill donor details (name pre-filled from login, override it) ---
        await page.getByTestId('donor-first-name').click({ clickCount: 3 });
        await page.getByTestId('donor-first-name').fill(DONOR.firstName);
        await sleep(300);

        await page.getByTestId('donor-email').click({ clickCount: 3 });
        await page.getByTestId('donor-email').fill(DONOR.email);
        await sleep(300);

        await page.getByTestId('donor-phone-number').fill(DONOR.phone);
        await sleep(300);

        // --- City dropdown (currently pre-filled with a value, override it) ---
        await page.locator('button').filter({ hasText: /Chennai/i }).first().click();
        await sleep(500);
        await page.getByPlaceholder('Search city...').fill(DONOR.citySearch);
        await sleep(1000);
        await page.getByText(DONOR.cityOption).click();
        await sleep(500);

        // --- Address and postal code ---
        await page.getByTestId('donor-address').fill(DONOR.address);
        await page.getByTestId('donor-postal-code').fill(DONOR.postalCode);
        await sleep(500);

        await takeScreenshot(page, 'Donor_Info_Filled');

        // --- Click Proceed to Pay ---
        await page.getByTestId('proceed-to-pay-button').click();
        await sleep(3000);

        await takeScreenshot(page, 'Proceeded_To_Payment');

        console.log('✓ INR donation form submitted for:', DONOR.firstName);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'INR_Donate_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});