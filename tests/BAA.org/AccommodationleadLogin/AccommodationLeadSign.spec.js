const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_URL = 'https://staging-lodging.aaram.co/login';

const VALID_EMAIL = 'preceptor.10@mailinator.com';
const VALID_PASSWORD = 'password';

const INVALID_EMAIL = 'invalid.user@mailinator.com';
const INVALID_PASSWORD = 'wrongpassword';


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


test.describe('Aaram Lodging Login', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    test('Valid login', async ({ page }) => {
        test.setTimeout(60000);

        try {
            await performLogin(page, VALID_EMAIL, VALID_PASSWORD);

            // Assert we're on the aaram app domain (not the Keycloak auth domain)
            await expect(page).toHaveURL(/staging-lodging\.aaram\.co/, { timeout: 10000 });

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

            // Assert still on Keycloak auth domain (login failed)
            await expect(page).toHaveURL(/hfnauth\.qa\.heartfulness\.org/, { timeout: 5000 });

            // Verify error message appears
            const errorLocator = page.locator('#input-error, .pf-m-error, .kc-feedback-text').first();
            await expect(errorLocator).toBeAttached({ timeout: 5000 });

            const errorText = await errorLocator.textContent();
            expect(errorText).toMatch(/invalid|incorrect|not found|does not exist|does not match/i);

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