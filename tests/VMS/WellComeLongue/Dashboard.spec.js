const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const APP_URL = 'https://visitor.staging.heartfulness.org/admin/login';

const USERNAME = 'wldashboard@mailinator.com';
const PASSWORD = 'password';

const DASHBOARD_SECTIONS = [
    'Arrival Today',
    'Seekers Arrival Today',
    'Total Preceptor',
    "Verified Visitor's Today",
];

const SEARCH_NAME = 'QAtestQTC';
const SEARCH_MOBILE = '+91 87451-20145';
const SEARCH_PNR = 'QA-IOTC-ZRSP';


async function loginToWelcomeLounge(page) {
    await page.goto(APP_URL);
    await page.waitForLoadState('domcontentloaded');
    await sleep(2000);

    const signinWithEmail = page.getByRole('link', { name: 'Signin with Email' });
    await signinWithEmail.waitFor({ state: 'visible', timeout: 15000 });
    await signinWithEmail.click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);

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
    await sleep(2500);
}


test('Welcome Lounge Dashboard -> Sections, search, and Visitor Sittings', async ({ page }) => {
    test.setTimeout(180000);
    test.slow();

    console.log(`Search values - Name: ${SEARCH_NAME}, Mobile: ${SEARCH_MOBILE}, PNR: ${SEARCH_PNR}`);

    try {
        // --- Login ---
        await loginToWelcomeLounge(page);
        await takeScreenshot(page, 'After_Login');

        // --- Cycle through dashboard sections ---
        for (const section of DASHBOARD_SECTIONS) {
            console.log(`Clicking dashboard section: ${section}`);
            try {
                await page.getByText(section, { exact: true }).click({ timeout: 5000 });
                await sleep(1000);
                await takeScreenshot(page, `Section_${section.replace(/[^a-zA-Z0-9]/g, '_')}`);
            } catch (e) {
                console.warn(`Section "${section}" failed:`, e.message);
            }
        }

        // --- Search by NAME using the top search input ---
        console.log('Searching by Name:', SEARCH_NAME);
        try {
            await page.locator('input').first().fill(SEARCH_NAME);
            await sleep(1200);
            await takeScreenshot(page, 'Search_By_Name');
            await page.locator('input').first().fill('');
            await sleep(400);
        } catch (e) {
            console.warn('Name search failed:', e.message);
        }

        // --- Search by MOBILE in column filter (3rd column) ---
        console.log('Searching by Mobile:', SEARCH_MOBILE);
        try {
            const mobileFilter = page.locator('th:nth-child(3) > div > .p-fluid > .filterElementWrapper > .hfn_input > input');
            await mobileFilter.fill(SEARCH_MOBILE);
            await sleep(1200);
            await takeScreenshot(page, 'Search_By_Mobile');
            await mobileFilter.fill('');
            await sleep(400);
        } catch (e) {
            console.warn('Mobile filter search failed:', e.message);
        }

        // --- Search by PNR in column filter (4th column) ---
        console.log('Searching by PNR:', SEARCH_PNR);
        try {
            const pnrFilter = page.locator('th:nth-child(4) > div > .p-fluid > .filterElementWrapper > .hfn_input > input');
            await pnrFilter.fill(SEARCH_PNR);
            await sleep(1200);
            await takeScreenshot(page, 'Search_By_PNR');
            await pnrFilter.fill('');
            await sleep(400);
        } catch (e) {
            console.warn('PNR filter search failed:', e.message);
        }

        // --- Navigate to Visitor Sittings ---
        console.log('Navigating to Visitor Sittings');
        await page.getByRole('button', { name: ' Visitor Sittings' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await takeScreenshot(page, 'Visitor_Sittings_Page');

        // --- Switch layout view (list/grid toggle) ---
        try {
            await page.locator('.p-dataview-layout-options > button:nth-child(2)').click({ timeout: 5000 });
            await sleep(800);
            await takeScreenshot(page, 'Sittings_Layout_Switched');
        } catch (e) {
            console.warn('Layout switch failed:', e.message);
        }

        console.log('✓ Welcome Lounge Dashboard flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'WelcomeLounge_Dashboard_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});