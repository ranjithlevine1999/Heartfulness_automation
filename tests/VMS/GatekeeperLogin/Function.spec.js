const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LAUNCH_URL = 'https://visitor.staging.heartfulness.org/launch';

const USERNAME = 'gatekeeper@mailinator.com';
const PASSWORD = 'password';

// Search inputs
const SEARCH_NAME = 'Gladys Rim';
const SEARCH_PNR = 'AB-IOSO-MZXV';


// Keycloak-safe login helper for Gatekeeper
async function loginAsGatekeeper(page) {
    await page.goto(LAUNCH_URL);
    await page.waitForLoadState('domcontentloaded');
    await sleep(2000);

    // Click Gatekeeper Login button
    await page.getByLabel('Gatekeeper Login').click();
    await sleep(2000);

    // Click "Signin with Email" (Keycloak intermediate screen)
    const signinWithEmail = page.getByRole('link', { name: 'Signin with Email' });
    await signinWithEmail.waitFor({ state: 'visible', timeout: 15000 });
    await signinWithEmail.click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(2000);

    // Wait for Keycloak inputs
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


test('Gatekeeper -> Search visitor by Name and PNR', async ({ page }) => {
    test.setTimeout(120000);

    try {
        // --- Login as Gatekeeper ---
        await loginAsGatekeeper(page);
        await takeScreenshot(page, 'After_Gatekeeper_Login');

        // --- Open Scan QR code (main search screen) ---
        await page.getByLabel('Scan QR code').click();
        await sleep(1500);
        await takeScreenshot(page, 'Scan_QR_Screen');

        // --- Search by Name ---
        console.log(`Searching by Name: ${SEARCH_NAME}`);
        await page.getByLabel('Select...').click();
        await sleep(500);
        await page.getByLabel('Name').click();
        await sleep(500);

        await page.getByRole('textbox').nth(1).fill(SEARCH_NAME);
        await sleep(300);
        await page.getByLabel('Search').click();
        await sleep(2000);
        await takeScreenshot(page, 'Search_By_Name');

        // --- Switch to Search by PNR ---
        console.log(`Searching by PNR: ${SEARCH_PNR}`);
        await page.getByLabel('Select...').click();
        await sleep(500);
        await page.getByLabel('PNR').click();
        await sleep(500);

        await page.getByPlaceholder('XX-XXXX-XXXA').fill(SEARCH_PNR);
        await sleep(300);
        await page.getByLabel('Search').click();
        await sleep(2000);
        await takeScreenshot(page, 'Search_By_PNR');

        // --- Clear search and view all ---
        await page.getByLabel('Clear').click();
        await sleep(800);
        await page.getByText('View All').click();
        await sleep(2000);
        await takeScreenshot(page, 'View_All');

        console.log('✓ Gatekeeper search flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Gatekeeper_Search_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});