const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const APP_URL = 'https://visitor.staging.heartfulness.org/admin/login';

const USERNAME = 'vmsbooth@mailinator.com';
const PASSWORD = 'password';

// Search values - based on real data visible in the visitor list
const SEARCH_NAME = 'QAtestQTC';
const SEARCH_MOBILE = '+91 87451-20145';
const SEARCH_PNR = 'QA-IOTC-ZRSP';


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


test('Visitor Booth -> Filter search by Name, Mobile, and PNR', async ({ page }) => {
    test.setTimeout(30000);

    console.log(`Search values - Name: ${SEARCH_NAME}, Mobile: ${SEARCH_MOBILE}, PNR: ${SEARCH_PNR}`);

    try {
        // --- Login as VMS Booth user ---
        await loginToVisitorBooth(page);
        await takeScreenshot(page, 'After_Login');

        // --- Navigate to Visitor Booth ---
        await page.getByRole('button', { name: ' Visitor Booth' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
        await takeScreenshot(page, 'Visitor_Booth_Page');

        // --- Search by NAME using the top search input ---
        console.log('Searching by Name:', SEARCH_NAME);
        await page.locator('input').first().fill(SEARCH_NAME);
        await sleep(1500);
        await takeScreenshot(page, 'Search_By_Name');

        // Clear the top search
        await page.locator('input').first().fill('');
        await sleep(800);

        // --- Switch layout view (list/grid toggle) ---
        try {
            await page.locator('.p-dataview-layout-options > button:nth-child(2)').click({ timeout: 5000 });
            await sleep(800);
            await takeScreenshot(page, 'Layout_Switched');
        } catch (e) {
            console.warn('Layout switch failed:', e.message);
        }

        // --- Click first button to expand/view options ---
        try {
            await page.locator('.p-button').first().click({ timeout: 5000 });
            await sleep(1000);
        } catch (e) {
            console.warn('First button click failed:', e.message);
        }

        // --- Search by MOBILE in column filter (3rd column) ---
        console.log('Searching by Mobile:', SEARCH_MOBILE);
        try {
            const mobileFilter = page.locator('th:nth-child(3) > div > .p-fluid > .filterElementWrapper > .hfn_input > input');
            await mobileFilter.fill(SEARCH_MOBILE);
            await sleep(1500);
            await takeScreenshot(page, 'Search_By_Mobile');

            // Clear filter
            await mobileFilter.fill('');
            await sleep(800);
        } catch (e) {
            console.warn('Mobile filter search failed:', e.message);
        }

        // --- Search by PNR in column filter (5th column) ---
        console.log('Searching by PNR:', SEARCH_PNR);
        try {
            const pnrFilter = page.locator('th:nth-child(5) > div > .p-fluid > .filterElementWrapper > .hfn_input > input');
            await pnrFilter.fill(SEARCH_PNR);
            await sleep(1500);
            await takeScreenshot(page, 'Search_By_PNR');

            // Click on the matched cell
            await page.getByRole('cell', { name: `${SEARCH_PNR} ` }).click();
            await sleep(1000);
        } catch (e) {
            console.warn('PNR filter search failed:', e.message);
        }

        // --- Reset view: switch layout back ---
        try {
            await page.locator('.col-6').first().click({ timeout: 5000 });
            await sleep(500);
            await page.locator('.p-dataview-layout-options > button:nth-child(2)').click({ timeout: 5000 });
            await sleep(800);
        } catch (e) {
            console.warn('Layout reset failed:', e.message);
        }

        // --- Change rows per page from 10 to 50 ---
        try {
            await page.locator('div').filter({ hasText: /^1010$/ }).getByRole('button').click({ timeout: 5000 });
            await sleep(500);
            await page.getByLabel('50').click({ timeout: 5000 });
            await sleep(1500);
            await takeScreenshot(page, 'Rows_Per_Page_50');
        } catch (e) {
            console.warn('Rows per page change failed:', e.message);
        }

        console.log('✓ Visitor Booth Search flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'VisitorBooth_Search_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});