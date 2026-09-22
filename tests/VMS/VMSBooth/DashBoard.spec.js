const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const APP_URL = 'https://visitor.staging.heartfulness.org/admin/login';

const USERNAME = 'vmsbooth@mailinator.com';
const PASSWORD = 'password';

// Dashboard sections to click through
const DASHBOARD_SECTIONS = [
    'Arrival Today',
    'Scheduled Check-ins Today',
    'Scheduled Check-out Today',
    'Check-out Pending',
    'Overseas Arrival Today',
];

// Menu buttons to navigate through
const MENU_ITEMS = [
    ' Visitor Booth',
    ' PNR Search',
    ' Spot Registration',
];


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


test('Visitor Booth -> Dashboard sections and menu navigation', async ({ page }) => {
    test.setTimeout(120000);

    try {
        // --- Login as VMS Booth user ---
        await loginToVisitorBooth(page);
        await takeScreenshot(page, 'After_Login');

        // --- Cycle through dashboard sections ---
        for (const section of DASHBOARD_SECTIONS) {
            console.log(`Clicking dashboard section: ${section}`);
            try {
                await page.getByText(section, { exact: true }).click({ timeout: 5000 });
                await sleep(1200);
                await takeScreenshot(page, `Section_${section.replace(/[^a-zA-Z0-9]/g, '_')}`);
            } catch (e) {
                console.warn(`Section "${section}" failed:`, e.message);
            }
        }

        // --- Switch layout view (list/grid toggle) ---
        try {
            await page.locator('.p-dataview-layout-options > button:nth-child(2)').click({ timeout: 5000 });
            await sleep(800);
            await takeScreenshot(page, 'Layout_Switched');
        } catch (e) {
            console.warn('Layout switch failed:', e.message);
        }

        // --- Navigate through menu items ---
        for (const menuItem of MENU_ITEMS) {
            console.log(`Navigating to: ${menuItem.trim()}`);
            try {
                await page.getByRole('button', { name: menuItem }).click({ timeout: 5000 });
                await page.waitForLoadState('domcontentloaded');
                await sleep(1500);
                await takeScreenshot(page, `Menu_${menuItem.trim().replace(/[^a-zA-Z0-9]/g, '_')}`);
            } catch (e) {
                console.warn(`Menu "${menuItem}" failed:`, e.message);
            }
        }

        console.log('✓ Visitor Booth dashboard and menu flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'VisitorBooth_Dashboard_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});