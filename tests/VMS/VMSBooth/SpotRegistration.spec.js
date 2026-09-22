const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Utility to generate random uppercase letters for unique names per run
const randomLetters = (n) => Array.from({ length: n }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');

// Get today's day of month as string (e.g. "9", "24", "31") for date picker cell click
const getTodayDayNumber = () => String(new Date().getDate());

const APP_URL = 'https://visitor.staging.heartfulness.org/admin/login';

const USERNAME = 'vmsbooth@mailinator.com';
const PASSWORD = 'password';

// Today's date (used for both Arrival and Departure - same day for seekers)
const TODAY_DAY = getTodayDayNumber();

// Visitor data - name generated fresh each run
const VISITOR = {
    name: `QAtest${randomLetters(3)}`,       // e.g. QAtest_ABC
    mobile: '+91 87451-20145',
    gender: 'Male',
    ageRange: '15-17',
    citySearch: 'chennai',
    accommodationType: 'Free Accommodation',
    roomType: 'A',
    berthType: 'Upper',
    purpose: 'Seva',
    emergencyContactName: 'Ram',
    emergencyContactPhone: '+91 87896-54120',
};


// Keycloak-safe login helper
async function loginToVisitorBooth(page) {
    await page.goto(APP_URL);
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


test('Visitor Booth -> Spot Registration flow', async ({ page }) => {
    test.setTimeout(240000);

    console.log('Creating visitor:', VISITOR.name);
    console.log(`Using today's date - day: ${TODAY_DAY}`);

    try {
        // --- Login as VMS Booth user ---
        await loginToVisitorBooth(page);
        await takeScreenshot(page, 'After_Login');

        // --- Navigate to Spot Registration ---
        await page.getByRole('button', { name: ' Spot Registration' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);

        // --- Click Add New Visitor ---
        await page.getByLabel('+ Add New Visitor').click();
        await sleep(1500);
        await takeScreenshot(page, 'Add_Visitor_Form');

        // --- Fill Name ---
        await page.getByLabel('Name*').fill(VISITOR.name);
        await sleep(300);

        // --- Fill Mobile ---
        await page.locator('input[name="spot_reg_mobile"]').fill(VISITOR.mobile);
        await sleep(300);

        // --- Gender dropdown ---
        await page.locator('.css-19bb58m').first().click();
        await sleep(500);
        await page.getByText(VISITOR.gender, { exact: true }).click();
        await sleep(500);

        // --- Age range dropdown ---
        await page.locator('.css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
        await sleep(500);
        await page.getByText(VISITOR.ageRange, { exact: true }).click();
        await sleep(500);

        // --- City dropdown (searchable) ---
        await page.locator('.input_city > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.locator('#react-select-6-input').fill(VISITOR.citySearch);
        await sleep(1000);
        await page.locator('[id^="react-select-"][id$="-option-0"]').first().click();
        await sleep(500);

        // --- Accommodation type (7th dropdown) ---
        await page.locator('div:nth-child(7) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.getByText(VISITOR.accommodationType, { exact: true }).click();
        await sleep(500);

        // --- Room type (8th dropdown) ---
        await page.locator('div:nth-child(8) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.getByText(VISITOR.roomType, { exact: true }).click();
        await sleep(500);

        // --- Berth type (9th dropdown) ---
        await page.locator('div:nth-child(9) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.getByText(VISITOR.berthType, { exact: true }).click();
        await sleep(500);

        // --- Purpose (10th dropdown) ---
        await page.locator('div:nth-child(10) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.getByText(VISITOR.purpose, { exact: true }).click();
        await sleep(500);

        // --- Emergency Contact Details ---
        await page.getByLabel('Emergency contact person*').fill(VISITOR.emergencyContactName);
        await sleep(300);
        await page.locator('input[name="spot_reg_emergency_contact_number"]').fill(VISITOR.emergencyContactPhone);
        await sleep(300);

        await takeScreenshot(page, 'Visitor_Details_Filled');

        // --- Open Check-in Date picker and select today's date ---
        await page.locator('form').getByRole('button').nth(3).click();
        await sleep(800);
        await page.getByText(TODAY_DAY, { exact: true }).first().click();
        await sleep(500);

        // --- Try to Add Visitor (may prompt for missing field) ---
        await page.getByLabel('Add Visitor').click();
        await sleep(1500);

        // --- Change accommodation type to Not Required (if prompted) ---
        try {
            await page.locator('div:nth-child(7) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click({ timeout: 3000 });
            await sleep(500);
            await page.getByText('Not Required', { exact: true }).click();
            await sleep(500);

            await page.getByLabel('Add Visitor').click();
            await sleep(1500);
        } catch (e) {
            console.warn('Accommodation change to Not Required failed:', e.message);
        }

        // --- Open Check-out Date picker and select today's date (same day for seekers) ---
        try {
            await page.locator('form').getByRole('button').nth(3).click({ timeout: 3000 });
            await sleep(800);
            await page.getByText(TODAY_DAY, { exact: true }).first().click();
            await sleep(500);

            await page.getByLabel('Add Visitor').click();
            await sleep(1500);
        } catch (e) {
            console.warn('Check-out date selection failed:', e.message);
        }

        await takeScreenshot(page, 'Visitor_Added');

        // --- Register the visitor ---
        await page.getByLabel('Register').click();
        await sleep(3000);

        await takeScreenshot(page, 'Visitor_Registered');
        console.log(`✓ Visitor registered: ${VISITOR.name}`);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'SpotRegistration_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});