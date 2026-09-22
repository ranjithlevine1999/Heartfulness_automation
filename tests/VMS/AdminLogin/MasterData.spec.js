const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const randomLetters = (n) => Array.from({ length: n }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');

const APP_URL = 'https://visitor.staging.heartfulness.org/admin/login';

const USERNAME = 'abhyasi.25@mailinator.com';
const PASSWORD = 'password';

const NEW_ROOM_TYPE = `Room_${randomLetters(3)}`;
const NEW_VOLUNTEER_DEPT = `Vol_${randomLetters(3)}`;


async function loginToVisitor(page) {
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


test('Visitor App -> Master Data navigation and create', async ({ page }) => {
    test.setTimeout(180000);

    console.log('Creating Room Type:', NEW_ROOM_TYPE);
    console.log('Creating Volunteer Department:', NEW_VOLUNTEER_DEPT);

    try {
        // --- Login ---
        await loginToVisitor(page);
        await takeScreenshot(page, 'After_Login');

        // --- Open Master Data menu ---
        await page.getByRole('button', { name: ' Master Data' }).click();
        await sleep(1500);
        await takeScreenshot(page, 'Master_Data_Opened');

        // --- Navigate through Master Data sections ---
        await page.getByRole('button', { name: 'Blocked Dates' }).click();
        await sleep(1500);
        await takeScreenshot(page, 'Blocked_Dates');

        await page.getByRole('button', { name: 'Room Type' }).click();
        await sleep(1500);
        await takeScreenshot(page, 'Room_Type');

        await page.getByRole('button', { name: 'Volunteer Departments' }).click();
        await sleep(1500);
        await takeScreenshot(page, 'Volunteer_Departments');

        await page.getByRole('button', { name: 'Guidelines Templates' }).click();
        await sleep(1500);

        // --- Switch layout view (grid/list toggle) ---
        try {
            await page.locator('.p-dataview-layout-options > button:nth-child(2)').click();
            await sleep(800);
        } catch (e) {
            console.warn('Layout switch failed:', e.message);
        }

        await page.getByRole('button', { name: 'Email Templates' }).click();
        await sleep(1500);
        await takeScreenshot(page, 'Email_Templates');

        // --- Blocked Dates: Open Add dialog and Cancel ---
        await page.getByRole('button', { name: 'Blocked Dates' }).click();
        await sleep(1500);
        await page.getByLabel('Add Blocked Dates').click();
        await sleep(1500);
        await page.getByLabel('Cancel').click();
        await sleep(500);
        await takeScreenshot(page, 'Blocked_Dates_Cancelled');

        // --- Room Type: Click Add Room Type button first! ---
        await page.getByRole('button', { name: 'Room Type' }).click();
        await sleep(1500);

        // Open the "Add Room Type" dialog
        await page.getByRole('button', { name: 'Add Room Type' }).click();
        await sleep(1500);
        await takeScreenshot(page, 'Add_Room_Type_Dialog');

        // Fill Room Type name
        await page.getByLabel('Room Type*').fill(NEW_ROOM_TYPE);
        await sleep(500);

        // Select first option from the associated dropdown
        await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.locator('[id^="react-select-"][id$="-option-0"]').first().click();
        await sleep(500);

        await page.getByLabel('Save').click();
        await sleep(1000);
        await page.getByLabel('Yes').click();
        await sleep(2000);
        await takeScreenshot(page, 'Room_Type_Created');

        console.log(`✓ Room Type created: ${NEW_ROOM_TYPE}`);

        // --- Volunteer Departments: Click Add button first! ---
        await page.getByRole('button', { name: 'Volunteer Departments' }).click();
        await sleep(1500);

        // Open the "Add Volunteer Department" dialog
        await page.getByLabel('Add Volunteer Department').click();
        await sleep(1500);
        await takeScreenshot(page, 'Add_Volunteer_Dept_Dialog');

        // Fill Volunteer Department name
        await page.getByLabel('Volunteer Department*').fill(NEW_VOLUNTEER_DEPT);
        await sleep(500);

        // Select first option from the associated dropdown
        await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
        await sleep(500);
        await page.locator('[id^="react-select-"][id$="-option-0"]').first().click();
        await sleep(500);

        await page.getByLabel('Save').click();
        await sleep(1000);
        await page.getByLabel('Yes').click();
        await sleep(2000);
        await takeScreenshot(page, 'Volunteer_Department_Created');

        console.log(`✓ Volunteer Department created: ${NEW_VOLUNTEER_DEPT}`);

        // --- Navigate to Guidelines Templates ---
        await page.getByRole('button', { name: 'Guidelines Templates' }).click();
        await sleep(1500);
        await takeScreenshot(page, 'Guidelines_Templates');

        console.log('✓ Visitor Master Data flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Visitor_MasterData_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});