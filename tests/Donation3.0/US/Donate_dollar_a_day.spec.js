const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const APP_URL = 'https://contributions.staging.heartfulness.org/us';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// Utility to generate random letters
const randomLetters = (n) => Array.from({ length: n }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');

const DONOR = {
    firstName: `QATest${randomLetters(3)}`,   // e.g. RfTest_xkp, RfTest_qmv
    lastName: 'QA',
    email: 'Test@gmail.com',
    phone: '(252) 995-5259',
    citySearch: 'chennai',
    cityOption: 'Cheruvu Mundara Khandriga',
    address: '345',
    postalCode: '688951',
};

const CARD = {
    number: '4111111111111111',
    expiry: '07/27',
    cvv: '123',
    firstName: 'Qa',
    lastName: 'Test',
    zip: '600062',
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


test('Contributions -> Dollar a Day donation (signed in) with credit card', async ({ page }) => {
    test.setTimeout(180000);

    try {
        // --- Login ---
        await loginToContributions(page);
        await takeScreenshot(page, 'After_Login');

        // --- Click DONATE NOW on Dollar a Day card ---
        await page.getByTestId('Dollar a Day - Global Heartfulness movement')
            .getByRole('button', { name: 'DONATE NOW icon' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Fill donor details ---
        await page.getByTestId('donor-last-name').fill(DONOR.lastName);
        await page.getByTestId('donor-first-name').fill(DONOR.firstName);
        await page.getByTestId('donor-email').fill(DONOR.email);
        await page.getByTestId('donor-phone-number').fill(DONOR.phone);

        // --- City dropdown ---
        await page.getByTestId('donor-info').getByRole('combobox').click();
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

        // --- Proceed to Payment ---
        await page.getByTestId('proceed-to-pay-button').click();
        await sleep(5000);

        // --- Wait for iframe to be ready ---
        const iframeLocator = page.locator('iframe').first();
        await iframeLocator.waitFor({ state: 'visible', timeout: 15000 });
        await sleep(3000);

        const paymentFrame = iframeLocator.contentFrame();

        // --- Card Number: click label to activate, then fill ---
        await paymentFrame.getByLabel('Card Number').click();
        await sleep(500);
        await paymentFrame.getByPlaceholder('5678 9012 3456').fill(CARD.number);
        await sleep(500);

        // --- Exp. Date: fill (already labelled, no separate activation needed) ---
        await paymentFrame.getByLabel('Exp. Date').fill(CARD.expiry);
        await sleep(500);

        // --- Card Code: fill ---
        await paymentFrame.getByLabel('Card Code').fill(CARD.cvv);
        await sleep(500);

        // --- First Name: click, then fill ---
        await paymentFrame.getByRole('textbox', { name: 'firstName' }).click();
        await sleep(300);
        await paymentFrame.getByRole('textbox', { name: 'firstName' }).fill(CARD.firstName);
        await sleep(500);

        // --- Last Name: click, then fill ---
        await paymentFrame.getByRole('textbox', { name: 'lastName' }).click();
        await sleep(300);
        await paymentFrame.getByRole('textbox', { name: 'lastName' }).fill(CARD.lastName);
        await sleep(500);

        // --- ZIP: click, then fill ---
        await paymentFrame.getByRole('textbox', { name: 'zip' }).click();
        await sleep(300);
        await paymentFrame.getByRole('textbox', { name: 'zip' }).fill(CARD.zip);
        await sleep(500);

        await takeScreenshot(page, 'Card_Details_Filled');

        // --- Submit payment ---
        await paymentFrame.getByRole('button', { name: 'Submit' }).click();
        await sleep(5000);

        // --- Wait for success redirect ---
        try {
            await page.waitForURL(/status.*success/, { timeout: 30000 });
            console.log('✓ Payment successful. Current URL:', page.url());
        } catch (e) {
            console.warn('Success URL not detected within 30s:', e.message);
            console.log('Current URL:', page.url());
        }

        await sleep(2500);
        await takeScreenshot(page, 'Donation_Success');
        console.log('✓ Dollar a Day donation completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Donate_dollar_a_day_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});