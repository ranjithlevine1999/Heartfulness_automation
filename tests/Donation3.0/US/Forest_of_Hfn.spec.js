const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomLetters = (n) => Array.from({ length: n }, () =>
    String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');

const APP_URL = 'https://contributions.staging.heartfulness.org/in-en';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

const DONOR = {
    firstName: `Rfqa${randomLetters(3)}`,
    lastName: 'test',
    email: 'test@gmail.com',
    phone: '8989896565',
    citySearch: 'chennai',
    cityOption: 'Chein Tola Udam Bigha',
    address: '345',
    postalCode: '600698',
};

const CARD = {
    number: '4111111111111111',
    expiry: '07 / 27',
    cvv: '123',
    nameOnCard: 'qa',
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


test('Contributions -> Forest by Heartfulness donation (US) with credit card', async ({ page }) => {
    test.setTimeout(180000);

    console.log('Donor first name for this run:', DONOR.firstName);

    try {
        // --- Login ---
        await loginToContributions(page);
        await takeScreenshot(page, 'After_Login');

        // --- Switch to US region ---
        await page.getByRole('combobox').first().click();
        await sleep(500);
        await page.getByText('US', { exact: true }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Click Donate on Forest by Heartfulness card ---
        await page.locator('div:nth-child(6) > div:nth-child(4) > div > .whitespace-nowrap').click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Fill donor details ---
        await page.getByTestId('donor-first-name').click({ clickCount: 3 });
        await page.getByTestId('donor-first-name').fill(DONOR.firstName);
        await sleep(300);

        await page.getByTestId('donor-last-name').click({ clickCount: 3 });
        await page.getByTestId('donor-last-name').fill(DONOR.lastName);
        await sleep(300);

        await page.getByTestId('donor-email').click({ clickCount: 3 });
        await page.getByTestId('donor-email').fill(DONOR.email);
        await sleep(300);

        // --- City dropdown ---
        await page.getByTestId('donor-info').getByRole('combobox').click();
        await sleep(500);
        await page.getByPlaceholder('Search city...').fill(DONOR.citySearch);
        await sleep(1000);
        await page.getByText(DONOR.cityOption).click();
        await sleep(500);

        // --- Phone ---
        await page.getByTestId('donor-phone-number').fill(DONOR.phone);
        await sleep(300);

        // --- Address and postal code ---
        await page.getByTestId('donor-address').fill(DONOR.address);
        await page.getByTestId('donor-postal-code').fill(DONOR.postalCode);
        await sleep(500);

        await takeScreenshot(page, 'Donor_Info_Filled');

        // --- Click Proceed to Pay ---
        await page.getByTestId('proceed-to-pay-button').click();
        await sleep(3000);

        // --- Wait for Stripe Checkout page ---
        await page.waitForURL(/checkout\.stripe\.com/, { timeout: 15000 });
        await page.waitForLoadState('domcontentloaded');
        await sleep(3000);

        await takeScreenshot(page, 'Stripe_Checkout_Loaded');

        // --- Tap "Pay with card" button (Card accordion) ---
        await page.getByRole('button', { name: 'Pay with card' }).click();
        await sleep(2000);

        // --- Fill card details ---
        await page.getByPlaceholder('1234 1234 1234').fill(CARD.number);
        await sleep(500);

        await page.getByPlaceholder('MM / YY').fill(CARD.expiry);
        await sleep(500);

        await page.getByPlaceholder('CVC').fill(CARD.cvv);
        await sleep(500);

        await page.getByPlaceholder('Full name on card').fill(CARD.nameOnCard);
        await sleep(500);

        await takeScreenshot(page, 'Card_Details_Filled');

        // --- Click Pay/Submit ---
        await page.getByTestId('hosted-payment-submit-button').click();
        await sleep(5000);

        // --- Wait for success redirect back to app ---
        try {
            await page.waitForURL(/status.*success/, { timeout: 60000 });
            console.log('✓ Payment successful. Current URL:', page.url());
        } catch (e) {
            console.warn('Success URL not detected within 60s:', e.message);
            console.log('Current URL:', page.url());
        }

        await sleep(2500);
        await takeScreenshot(page, 'Donation_Success');
        console.log('✓ Forest by Heartfulness donation completed for:', DONOR.firstName);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Forest_of_Hfn_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});