const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Greeen Khana Run -> Home screen', async ({ page }) => {
    test.setTimeout(60000);

    try {
        await page.goto('https://staging.greenheartfulnessrun.com/');

        // Navigate through hero slider
        await page.getByLabel('Go to next slide').first().click();
        await page.getByLabel('Go to next slide').first().click();
        await page.getByLabel('Go to next slide').first().click();

        // Open race day images in new tab
        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'GKR RACE DAY IMAGES - Nov' }).click();
        const page1 = await page1Promise;
        await page1.close();

        // Open race results in new tab
        const page2Promise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'GKR RACE RESULTS - Nov' }).click();
        const page2 = await page2Promise;
        await page2.close();

        // Interact with partners section
        await page.getByRole('img', { name: 'Sports Partner' }).click();
        await page.locator('section').filter({ hasText: 'Our partnersWelcoming' }).getByLabel('Go to next slide').click();
        await page.locator('section').filter({ hasText: 'Our partnersWelcoming' }).getByLabel('Go to next slide').click();

        // Navigate footer links
        await page.getByRole('link', { name: 'FAQs' }).click();
        await page.getByRole('link', { name: 'Home' }).click();

        await page.getByRole('link', { name: 'Privacy & Policy' }).click();
        await page.getByRole('link', { name: 'Home' }).click();

        await page.getByRole('link', { name: 'Terms & Conditions' }).click();
        await page.getByRole('link', { name: 'Home' }).click();

        // Certificate download
        await page.getByRole('button', { name: 'Download Certificate' }).click();
        await page.getByRole('link', { name: 'Home' }).click();

        // Registration flow
        await page.getByRole('button', { name: 'Register' }).nth(2).click();
        await page.getByLabel('Close').click();
        await sleep(500);

        await page.getByText('Already registered ? Click').first().click();
        await page.getByLabel('Close').click();
        await sleep(500);

        // Login flow
        const loginBtn = page.getByRole('button', { name: 'Login/Register' });
        await loginBtn.scrollIntoViewIfNeeded();
        await loginBtn.waitFor({ state: 'visible' });
        await loginBtn.click();

        const sendOtpBtn = page.getByRole('button', { name: 'SEND OTP' });
        await sendOtpBtn.waitFor({ state: 'visible', timeout: 10000 });
        await sendOtpBtn.click();

        await page.getByLabel('Close').click();
    } catch (error) {
        console.error('Test failed:', error.message);
        await page.screenshot({ path: `error-${Date.now()}.png`, fullPage: true });
        throw error;
    }
});