const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const APP_URL = 'https://visitor.staging.heartfulness.org/admin/login';

const USERNAME = 'vmsbooth@mailinator.com';
const PASSWORD = 'password';

const SEARCH_PNR = 'CI-IOBR-ZPNS';


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


test('Visitor Booth -> PNR Search, View, and Verify flow', async ({ page }) => {
    test.setTimeout(120000);

    console.log('Searching PNR:', SEARCH_PNR);

    try {
        // --- Login as VMS Booth user ---
        await loginToVisitorBooth(page);
        await takeScreenshot(page, 'After_Login');

        // --- Navigate to PNR Search ---
        await page.getByRole('button', { name: ' PNR Search' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await takeScreenshot(page, 'PNR_Search_Page');

        // --- Fill PNR ---
        await page.getByPlaceholder('XX-XXXX-XXXA').fill(SEARCH_PNR);
        await sleep(500);

        // --- Click Search ---
        await page.getByLabel('Search').click();
        await sleep(2000);
        await takeScreenshot(page, 'PNR_Search_Results');

        // --- View the second result ---
        await page.getByLabel('View').nth(1).click();
        await sleep(1500);
        await takeScreenshot(page, 'View_Details_Dialog');

        // --- Close the View dialog ---
        await page.locator('#pr_id_1_content').getByLabel('Close').click();
        await sleep(1000);

        // --- Click Verify on the second result ---
        await page.getByLabel('Verify').nth(1).click();
        await sleep(1500);
        await takeScreenshot(page, 'Verify_Confirmation');

        // --- Click No on confirmation ---
        await page.getByLabel('No').click();
        await sleep(1500);

        console.log('✓ PNR Search, View, and Verify flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'PNR_Search_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});