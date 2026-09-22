const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility to generate random uppercase letters for unique place names per run
const randomLetters = (n) => Array.from({ length: n }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');

const HOME_URL = 'https://meditationplace.staging.heartfulness.org/home';

const USERNAME = 'preceptor.10@mailinator.com';
const PASSWORD = 'password';

const PLACE = {
    name: `Draft${randomLetters(3)}`,
    citySearch: 'chennai',
    cityOption: 'CHENNAI (Chennai)',
    ashramType: 'Ashram',
    schedule: 'Mid-week / Wednesday only',
    placeType: 'Residential',
    ownership: 'Rented',
    mapSearch: 'chennai',
    mapOption: 'Tamil Nadu, India',
    amenities: 'food',
    directions: 'Test',
};


// Grant geolocation permission at the context level to prevent popup
test.use({
    permissions: ['geolocation'],
    geolocation: { latitude: 13.0827, longitude: 80.2707 }, // Chennai coordinates
});


// Keycloak-safe login helper
async function loginToMeditationPlace(page) {
    await page.goto(HOME_URL);
    await page.waitForLoadState('domcontentloaded');
    await sleep(3000);

    const signinWithEmail = page.getByRole('link', { name: 'Signin with Email' });
    await signinWithEmail.waitFor({ state: 'visible', timeout: 15000 });
    await signinWithEmail.click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(2000);

    await page.locator('#username').waitFor({ state: 'attached', timeout: 15000 });
    await page.locator('#password').waitFor({ state: 'attached', timeout: 5000 });

    await page.evaluate(({ user, pass }) => {
        const setValue = (selector, value) => {
            const input = document.querySelector(selector);
            if (!input) throw new Error(`Element ${selector} not found`);

            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
                window.HTMLInputElement.prototype, 'value'
            ).set;
            nativeInputValueSetter.call(input, value);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
        };

        setValue('#username', user);
        setValue('#password', pass);

        const form = document.querySelector('#kc-form-login')
            || document.querySelector('form#kc-form')
            || document.querySelector('form');
        if (form) {
            form.submit();
        } else {
            throw new Error('Login form not found');
        }
    }, { user: USERNAME, pass: PASSWORD });

    await page.waitForLoadState('domcontentloaded');
    await sleep(3000);
}


test('Meditation Place -> Create and Save as Draft', async ({ page }) => {
    test.setTimeout(180000);

    console.log('Creating meditation place (Draft):', PLACE.name);

    try {
        // --- Login ---
        await loginToMeditationPlace(page);
        await takeScreenshot(page, 'After_Login');

        // --- Click on the KOILAKUNTLA - CENTER card ---
        const centerCard = page.getByText('KOILAKUNTLA - CENTER');
        await centerCard.waitFor({ state: 'visible', timeout: 15000 });
        await centerCard.click();
        await sleep(1500);

        // --- Click Create Meditation Place ---
        await page.getByLabel('Create Meditation Place').click();
        await sleep(1500);

        // --- Fill place name (with random 3-letter suffix) ---
        await page.getByPlaceholder('Enter a Place').fill(PLACE.name);
        await sleep(500);

        // --- City selection (type character by character) ---
        await page.locator('#rc_select_0').click();
        await sleep(300);
        await page.locator('#rc_select_0').pressSequentially(PLACE.citySearch, { delay: 150 });
        await sleep(1000);
        await page.getByText(PLACE.cityOption).click();
        await sleep(500);

        // --- Proceed to Address ---
        await page.getByRole('button', { name: 'Proceed' }).click();
        await sleep(1500);

        // --- Ashram type dropdown ---
        await page.locator('.hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
        await sleep(500);
        await page.getByText(PLACE.ashramType, { exact: true }).click();
        await sleep(500);

        // --- Schedule dropdown ---
        await page.locator('.hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
        await sleep(500);
        await page.getByText(PLACE.schedule, { exact: true }).click();
        await sleep(500);

        // --- Place type dropdown (15th child) ---
        await page.locator('div:nth-child(15) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.getByText(PLACE.placeType, { exact: true }).click();
        await sleep(500);

        // --- Ownership dropdown (16th child) ---
        await page.locator('div:nth-child(16) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.getByText(PLACE.ownership, { exact: true }).click();
        await sleep(500);

        // --- Continue to Map ---
        await page.getByLabel('Continue').click();
        await sleep(1500);

        // --- Map location search ---
        await page.getByPlaceholder('Search your location').fill(PLACE.mapSearch);
        await sleep(1500);
        await page.getByText(PLACE.mapOption).first().click();
        await sleep(500);

        // --- Continue to Contact Info ---
        await page.getByLabel('Continue').click();
        await sleep(1500);

        // --- Fill amenities and directions ---
        await page.getByPlaceholder('Food, Transport, Accessibility').fill(PLACE.amenities);
        await sleep(300);
        await page.getByPlaceholder('Direction To Reach').fill(PLACE.directions);
        await sleep(300);

        // --- Continue to Timings ---
        await page.getByLabel('Continue').click();
        await sleep(1500);

        // --- Add Time and Proceed to Review ---
        await page.getByLabel('Add Time').click();
        await sleep(1000);
        await page.getByLabel('Proceed to Review').click();
        await sleep(2000);

        await takeScreenshot(page, 'Review_Page');

        // --- Save as Draft (instead of Send for Approval) ---
        await page.getByRole('button', { name: 'Save as Draft' }).click();
        await sleep(3000);

        await takeScreenshot(page, 'Saved_As_Draft');

        console.log('✓ Meditation place saved as draft:', PLACE.name);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'SaveDraft_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});