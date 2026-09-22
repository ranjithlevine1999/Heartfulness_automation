const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HOME_URL = 'https://meditationplace.staging.heartfulness.org/home';

const VALID_EMAIL = 'preceptor.10@mailinator.com';
const VALID_PASSWORD = 'password';

const INVALID_EMAIL = 'invalid.user@mailinator.com';
const INVALID_PASSWORD = 'wrongpassword';


// Keycloak-safe login helper
async function performLogin(page, email, password) {
    await page.goto(HOME_URL);
    await page.waitForLoadState('domcontentloaded');
    await sleep(3000);

    // Click "Signin with Email" (always required on this app)
    const signinWithEmail = page.getByRole('link', { name: 'Signin with Email' });
    await signinWithEmail.waitFor({ state: 'visible', timeout: 15000 });
    await signinWithEmail.click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(2000);

    // Wait for Keycloak inputs to be attached
    await page.locator('#username').waitFor({ state: 'attached', timeout: 15000 });
    await page.locator('#password').waitFor({ state: 'attached', timeout: 5000 });

    // Set values and submit form via JavaScript (bypass hidden input quirk)
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
    await sleep(3000);
}


test.describe('Meditation Place Login', () => {
    // Force fresh state for each test (no shared cookies)
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Valid login', async ({ page }) => {
        test.setTimeout(60000);

        try {
            await performLogin(page, VALID_EMAIL, VALID_PASSWORD);

            // Assert successful login - back on the app, not on Keycloak
            await expect(page).toHaveURL(/meditationplace\.staging\.heartfulness\.org/, { timeout: 10000 });
            await expect(page).not.toHaveURL(/hfnauth\.qa\.heartfulness\.org/, { timeout: 5000 });

            await takeScreenshot(page, 'Valid_Login_Success');
            console.log('✓ Valid login successful. Current URL:', page.url());
        } catch (error) {
            console.error('Test failed in Valid Login flow:', error.message);
            if (!page.isClosed()) {
                await takeScreenshot(page, 'ValidLogin_Error');
            }
            throw error;
        }
    });

    test('Invalid login', async ({ page }) => {
        test.setTimeout(60000);

        try {
            await performLogin(page, INVALID_EMAIL, INVALID_PASSWORD);

            // Assert still on Keycloak auth page (login failed)
            await expect(page).toHaveURL(/hfnauth\.qa\.heartfulness\.org/, { timeout: 5000 });

            // Verify error message appears
            const errorLocator = page.locator('#input-error, .pf-m-error, .kc-feedback-text').first();
            await expect(errorLocator).toBeAttached({ timeout: 5000 });

            const errorText = await errorLocator.textContent();
            expect(errorText).toMatch(/invalid|incorrect|not found|does not exist|does not match/i);

            await takeScreenshot(page, 'Invalid_Login_Rejected');
            console.log('✓ Invalid login correctly rejected. Error shown:', errorText?.trim());
        } catch (error) {
            console.error('Test failed in Invalid Login flow:', error.message);
            if (!page.isClosed()) {
                await takeScreenshot(page, 'InvalidLogin_Error');
            }
            throw error;
        }
    });
});