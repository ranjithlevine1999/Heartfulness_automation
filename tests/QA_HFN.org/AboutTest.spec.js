const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// General contact form data
const GENERAL_CONTACT = {
    firstName: 'Test',
    lastName: 'QA',
    email: 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org',
    phone: '+91 87451-20258',
    country: 'Angola',
    gender: 'Male',
    message: 'Testing',
};

// Technical contact form data
const TECHNICAL_CONTACT = {
    firstName: 'TEst',
    lastName: 'Tech',
    email: 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org',
    phone: '+91 87451-23658',
    street: 'Random',
    message: 'QA',
};


async function loginToHFN(page) {
    await page.goto(HFN_URL);
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);

    await page.getByRole('button', { name: 'Sign In' }).click();
    await sleep(500);
    await page.getByRole('link', { name: 'Signin with Email' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1000);

    await page.getByLabel('Email ID *').fill(USERNAME);
    await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(2500);
}


test('Heartfulness -> About + Connect With Us forms', async ({ page }) => {
    test.setTimeout(180000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Navigate to About > Who We Are ---
        await page.getByRole('button', { name: 'About' }).click();
        await sleep(500);
        await page.getByRole('link', { name: 'Who We Are' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);

        // --- Cycle through Who We Are carousel slides ---
        await page.getByLabel('Go to slide 2').first().click();
        await sleep(800);
        await page.getByLabel('Go to slide 3').nth(1).click();
        await sleep(800);
        await page.getByLabel('Go to slide 4').nth(2).click();
        await sleep(800);
        await takeScreenshot(page, 'Who_We_Are_Slides');

        // --- Navigate to About > Connect With Us ---
        await page.getByRole('button', { name: 'About' }).click();
        await sleep(500);
        await page.getByRole('link', { name: 'Connect With Us' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);

        // --- General contact form (default tab) ---
        console.log('Filling general contact form...');
        await page.locator('input[name="first_name"]').fill(GENERAL_CONTACT.firstName);
        await page.locator('input[name="last_name"]').fill(GENERAL_CONTACT.lastName);
        await page.locator('input[name="email"]').fill(GENERAL_CONTACT.email);
        await page.getByPlaceholder('1 (702) 123-').fill(GENERAL_CONTACT.phone);

        // Country dropdown
        await page.getByRole('combobox').click();
        await sleep(500);
        await page.getByLabel(GENERAL_CONTACT.country).click();
        await sleep(500);

        // Gender radio
        await page.locator('div').filter({ hasText: new RegExp(`^${GENERAL_CONTACT.gender}$`) })
            .getByRole('radio').click();
        await sleep(300);

        // Message
        await page.locator('textarea[name="message"]').fill(GENERAL_CONTACT.message);

        // Consent checkbox
        await page.getByRole('checkbox').check();
        await sleep(500);

        // reCAPTCHA "I'm not a robot"
        // NOTE: reCAPTCHA v2 blocks automation - may need to be disabled on staging by dev team
        try {
            await page.frameLocator('iframe[title*="reCAPTCHA"], iframe[name^="a-"]')
                .getByLabel("I'm not a robot").click();
            await sleep(2000);
        } catch (e) {
            console.warn('reCAPTCHA could not be checked:', e.message);
        }

        await takeScreenshot(page, 'General_Contact_Filled');

        // Submit general form
        await page.getByLabel('Submit').click();
        await sleep(2500);

        // --- Switch to Technical tab ---
        console.log('Switching to Technical tab...');
        await page.getByRole('tab', { name: 'Technical' }).click();
        await sleep(1500);

        // --- Technical contact form ---
        await page.locator('input[name="first_name"]').fill(TECHNICAL_CONTACT.firstName);
        await page.locator('input[name="last_name"]').fill(TECHNICAL_CONTACT.lastName);
        await page.locator('input[name="email"]').fill(TECHNICAL_CONTACT.email);
        await page.getByPlaceholder('1 (702) 123-').fill(TECHNICAL_CONTACT.phone);
        await page.locator('textarea[name="street"]').fill(TECHNICAL_CONTACT.street);
        await page.locator('textarea[name="message"]').fill(TECHNICAL_CONTACT.message);

        // Consent checkbox
        await page.getByRole('checkbox').check();
        await sleep(500);

        // reCAPTCHA "I'm not a robot"
        try {
            await page.frameLocator('iframe[title*="reCAPTCHA"], iframe[name^="a-"]')
                .getByLabel("I'm not a robot").click();
            await sleep(2000);
        } catch (e) {
            console.warn('reCAPTCHA could not be checked:', e.message);
        }

        await takeScreenshot(page, 'Technical_Contact_Filled');

        // Submit technical form
        await page.getByLabel('Submit').click();
        await sleep(2500);

        console.log('✓ About + Connect With Us forms completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'AboutTest_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});