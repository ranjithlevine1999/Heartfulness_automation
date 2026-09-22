const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_URL = 'https://staging-lodging.aaram.co/login';

const USERNAME = 'preceptor.10@mailinator.com';
const PASSWORD = 'password';

const PARTICIPANT_NAME = 'JjtestTest';

const PREFERENCE = {
    dorm: 'West Central Metal dorm - AC',
    berth: 'Lower',
    arrivalDate: '9',
    arrivalTime: '4AM to 6AM',
    departureDate: '30',
    departureTime: '2AM to 4AM',
};


async function performLogin(page, email, password) {
    await page.goto(LOGIN_URL);
    await page.waitForLoadState('domcontentloaded');
    await sleep(2000);

    const signinWithEmail = page.getByRole('link', { name: 'Signin with Email' });
    if (await signinWithEmail.isVisible({ timeout: 3000 }).catch(() => false)) {
        await signinWithEmail.click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
    }

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
    }, { user: email, pass: password });

    await page.waitForLoadState('domcontentloaded');
    await sleep(2500);
}


// Helper: try multiple approaches to change the "Order ID" dropdown to "Name"
async function changeSearchTypeToName(page) {
    const approaches = [
        // Approach 1: Click "Order ID" text
        async () => {
            await page.getByText('Order ID', { exact: true }).click();
            await sleep(1000);
            await page.getByText('Name', { exact: true }).click();
        },
        // Approach 2: Click the react-select control by index
        async () => {
            await page.locator('.css-13cymwt-control').nth(1).click();
            await sleep(1000);
            await page.getByRole('option', { name: 'Name' }).click();
        },
        // Approach 3: Click by role combobox
        async () => {
            await page.getByRole('combobox').nth(1).click();
            await sleep(1000);
            await page.getByRole('option', { name: 'Name' }).click();
        },
    ];

    for (let i = 0; i < approaches.length; i++) {
        try {
            console.log(`Trying dropdown approach ${i + 1}...`);
            await approaches[i]();
            await sleep(1000);
            console.log(`✓ Dropdown approach ${i + 1} succeeded`);
            return;
        } catch (e) {
            console.log(`Approach ${i + 1} failed: ${e.message}`);
            // Close any open dropdown before trying next approach
            await page.keyboard.press('Escape').catch(() => {});
            await sleep(500);
        }
    }

    throw new Error('All dropdown approaches failed');
}


test('Aaram Lodging -> Allocate Bed flow (search by Name)', async ({ page }) => {
    test.setTimeout(180000);

    try {
        // --- Login ---
        await performLogin(page, USERNAME, PASSWORD);
        await takeScreenshot(page, 'After_Login');

        // --- Navigate to Allocate Bed ---
        await page.getByRole('link', { name: 'Allocate Bed' }).first().click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Change second dropdown from "Order ID" to "Name" ---
        await changeSearchTypeToName(page);
        await takeScreenshot(page, 'Dropdown_Changed_To_Name');

        // --- Fill search field with participant name ---
        await page.getByRole('textbox').fill(PARTICIPANT_NAME);
        await sleep(500);
        await page.getByRole('button', { name: 'Search' }).click();
        await sleep(2000);

        await takeScreenshot(page, 'Search_Results');

        // --- Select participant checkbox (first result row) ---
        const firstRow = page.getByRole('row').filter({ hasText: /\S/ }).nth(1);
        await firstRow.getByRole('checkbox').check();
        await sleep(500);

        // --- Click Modify Preference ---
        await page.getByRole('button', { name: 'Modify Preference' }).click();
        await sleep(1500);

        // --- Open participant preference row (edit icon) ---
        await firstRow.locator('i').first().click();
        await sleep(1000);

        // --- Select Dorm ---
        await page.locator('div').filter({ hasText: /^Select Dorm\*Select\.\.\.$/ })
            .locator('svg').click();
        await sleep(500);
        await page.getByText(PREFERENCE.dorm, { exact: true }).click();
        await sleep(500);

        // --- Select Berth ---
        await page.locator('.css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
        await sleep(500);
        await page.getByText(PREFERENCE.berth, { exact: true }).click();
        await sleep(500);

        // --- Select Arrival Date ---
        await page.getByLabel('Edit Preference').getByRole('button').nth(1).click();
        await sleep(500);
        await page.getByText(PREFERENCE.arrivalDate, { exact: true }).click();
        await sleep(500);

        // --- Select Arrival Time ---
        await page.locator('div').filter({ hasText: /^Arrival time\*Select\.\.\.$/ })
            .locator('svg').click();
        await sleep(500);
        await page.getByText(PREFERENCE.arrivalTime, { exact: true }).click();
        await sleep(500);

        // --- Select Departure Date ---
        await page.getByLabel('Edit Preference').getByRole('button').nth(2).click();
        await sleep(500);
        await page.getByText(PREFERENCE.departureDate).nth(1).click();
        await sleep(500);

        // --- Select Departure Time ---
        await page.locator('div').filter({ hasText: /^Departure time\*Select\.\.\.$/ })
            .locator('svg').click();
        await sleep(500);
        await page.getByText(PREFERENCE.departureTime, { exact: true }).click();
        await sleep(500);

        await takeScreenshot(page, 'Preferences_Filled');

        // --- Save preferences (modal Save button) ---
        await page.locator('div').filter({ hasText: /^Save$/ }).nth(1).click();
        await sleep(1000);

        // --- Save on main page ---
        await page.getByRole('button', { name: 'Save' }).click();
        await sleep(1500);

        // --- Auto Allocation ---
        await page.getByLabel('Auto Allocation').click();
        await sleep(2000);

        await takeScreenshot(page, 'Auto_Allocation_Done');

        // --- Close ---
        await page.locator('button').filter({ hasText: 'Close' }).click();
        await sleep(1000);

        console.log('✓ Allocate Bed flow completed for:', PARTICIPANT_NAME);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'AllocateBed_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});