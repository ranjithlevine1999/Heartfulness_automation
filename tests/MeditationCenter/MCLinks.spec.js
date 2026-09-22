const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HOME_URL = 'https://meditationplace.staging.heartfulness.org/home';

const USERNAME = 'preceptor.10@mailinator.com';
const PASSWORD = 'password';


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


async function openSidebar(page) {
    await page.locator('.menu-toggler').click();
    await sleep(800);
}


test('Meditation Center -> Menu navigation and search flow', async ({ page }) => {
    test.setTimeout(180000);

    try {
        // --- Login ---
        await loginToMeditationPlace(page);
        await takeScreenshot(page, 'After_Login');

        // --- Search flow on Meditation Centers page ---
        await page.getByLabel('Reset').click();
        await sleep(800);

        await page.getByPlaceholder('Search').fill('koli');
        await page.getByLabel('Search').click();
        await sleep(1500);
        await takeScreenshot(page, 'Search_Koli');

        await page.getByPlaceholder('Search').fill('koil');
        await page.getByLabel('Search').click();
        await sleep(1500);

        await page.getByLabel('Reset').click();
        await sleep(500);
        await page.getByPlaceholder('Search').fill('koilakuntla');
        await page.getByLabel('Search').click();
        await sleep(1500);
        await takeScreenshot(page, 'Search_Koilakuntla');

        // --- Navigate to Meditation Centers ---
        await openSidebar(page);
        await page.getByRole('button', { name: ' Meditation Centers' }).click();
        await sleep(3000);

        // --- Navigate to My Meditation Places and cycle through status tabs ---
        await openSidebar(page);
        await page.getByRole('button', { name: ' My Meditation Places' }).click();
        await sleep(3000);

        // Tabs have format "Pending Approval (80)", "Approved (52)", etc.
        await page.getByRole('button', { name: /^Pending Approval \(\d+\)$/ }).click();
        await sleep(3000);
        await page.getByRole('button', { name: /^Approved \(\d+\)$/ }).click();
        await sleep(3000);
        await page.getByRole('button', { name: /^Draft \(\d+\)$/ }).click();
        await sleep(3000);
        await page.getByRole('button', { name: /^Cancelled \(\d+\)$/ }).click();
        await sleep(3000);
        await takeScreenshot(page, 'My_Meditation_Places');

        // --- Navigate to GBP Management ---
        await openSidebar(page);
        await page.getByRole('button', { name: ' GBP Management' }).click();
        await sleep(3000);

        await page.getByRole('button', { name: /In-Progress \(\d+\)/ }).click();
        await sleep(3000);
        await page.getByRole('button', { name: /Pending from Google \(\d+\)/ }).click();
        await sleep(3000);
        await page.getByRole('button', { name: /Published \(\d+\)/ }).click();
        await sleep(3000);
        await takeScreenshot(page, 'GBP_Management');

        // --- Download User Manual (opens popup + triggers download) ---
        try {
            const popupPromise = page.waitForEvent('popup', { timeout: 5000 });
            const downloadPromise = page.waitForEvent('download', { timeout: 10000 });
            await page.getByLabel('Download User Manual').click();

            const [popup, download] = await Promise.all([
                popupPromise.catch(() => null),
                downloadPromise.catch(() => null),
            ]);

            if (popup) {
                console.log('User Manual popup opened:', popup.url());
                await popup.close();
            }
            if (download) {
                console.log('User Manual download initiated:', download.suggestedFilename());
            }
            await sleep(2000);
        } catch (e) {
            console.warn('User Manual download failed:', e.message);
        }

        // --- Navigate to Report Satsangh Attendance ---
        await openSidebar(page);
        await page.getByRole('button', { name: ' Report Satsangh Attendance' }).click();
        await sleep(3000);
        await takeScreenshot(page, 'Report_Satsangh_Attendance');

        // --- Navigate to Help ---
        await openSidebar(page);
        await page.getByRole('button', { name: ' Help' }).click();
        await sleep(3000);
        await takeScreenshot(page, 'Help_Page');

        // --- Navigate to Meditation Centers and Reset ---
        await openSidebar(page);
        await page.getByRole('button', { name: ' Meditation Centers' }).click();
        await sleep(3000);
        await page.getByLabel('Reset').click();
        await sleep(1500);
        await takeScreenshot(page, 'Meditation_Centers_Reset');

        console.log('✓ MC Links flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'MCLinks_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});