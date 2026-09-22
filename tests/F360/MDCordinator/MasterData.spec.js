const { test, expect } = require('@playwright/test');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const APP_URL = 'https://function360.staging.heartfulness.org/';

const USERNAME = 'abhyasi.25@mailinator.com';
const PASSWORD = 'password';

const LOCATION = {
    type: 'Place',
    districtSearch: 'mahe',
    districtOption: 'Mahe',
};


// Keycloak-safe login helper
async function loginToFunction360(page) {
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


test('Function360 -> Master Data Coordinator setup and Add Location', async ({ page }) => {
    test.setTimeout(180000);

    try {
        // --- Login ---
        await loginToFunction360(page);

        // --- Select Master Data Coordinator (Tamil) radio row ---
        console.log('Selecting Master Data Coordinator row...');
        await page.getByRole('row', { name: 'Master Data Coordinator Tamil' })
            .locator('input[name="pr_id_1_dt_radio"]').check();
        await sleep(500);

        // --- Continue ---
        await page.getByLabel('Continue').click();
        await sleep(2000);

        // --- Select Location Type filter (Place) - 1st dropdown ---
        console.log('Selecting location type:', LOCATION.type);
        await page.locator('.css-19bb58m').first().click();
        await sleep(500);
        await page.getByText(LOCATION.type, { exact: true }).click();
        await sleep(1500);

        // --- Search District (2nd column dropdown) for "mahe" ---
        console.log('Searching district:', LOCATION.districtSearch);
        try {
            // The District dropdown is the 2nd .css-19bb58m element
            await page.locator('.css-13cymwt-control > .css-hlgwow > .css-19bb58m').nth(1).click({ timeout: 5000 });
            await sleep(500);

            await page.locator('[id^="react-select-"][id$="-input"]').first().fill(LOCATION.districtSearch);
            await sleep(1000);

            // Click "Mahe" from the options
            await page.getByText(LOCATION.districtOption, { exact: true }).first().click({ timeout: 5000 });
            await sleep(1500);
            console.log('✓ District filtered to Mahe');
        } catch (e) {
            console.warn('District filter failed:', e.message);
            // Close any open dropdown by pressing Escape
            await page.keyboard.press('Escape');
            await sleep(500);
        }

        // --- Change rows per page from 10 to 50 ---
        try {
            await page.locator('div').filter({ hasText: /^1010$/ }).getByRole('button').click({ timeout: 5000 });
            await sleep(500);
            await page.getByLabel('50').click({ timeout: 5000 });
            await sleep(1500);
            console.log('✓ Changed rows per page to 50');
        } catch (e) {
            console.warn('Rows per page change failed:', e.message);
        }

        // --- Click Add Location, then Close the dialog ---
        console.log('Opening Add Location dialog...');
        await page.getByLabel('+ Add Location').click();
        await sleep(1500);

        // Close the dialog
        await page.locator('#pr_id_1_content').getByLabel('Close').click();
        await sleep(1000);
        console.log('✓ Add Location dialog closed');

        // --- Open Add Location again ---
        console.log('Reopening Add Location dialog...');
        await page.getByLabel('+ Add Location').click();
        await sleep(1500);

        console.log('✓ Function360 Master Data flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        console.error('Current URL at failure:', page.url());
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-function360-masterdata-${Date.now()}.png`,
                    fullPage: true,
                    timeout: 5000
                });
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});