const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const EDUCATION_URL = 'https://awsstaging.heartfulness.org/education/';


test('Heartfulness Education -> Fellowship form submission', async ({ page }) => {
    try {
        await page.goto(EDUCATION_URL);

        // Navigate to Fellowship section
        await page.getByRole('link', { name: 'Fellowship', exact: true }).click();
        await page.waitForLoadState('domcontentloaded');

        // Open the online application form
        await page.getByRole('link', { name: 'online form' }).click();
        await page.waitForLoadState('domcontentloaded');

        // Scope all form interactions to the Contact Me form
        const contactForm = page.getByLabel('Contact Me');

        // Fill out the form
        await contactForm.getByLabel('Name *').fill('Test');
        await contactForm.getByLabel('Email *').fill('Test@gmail.com');
        await contactForm.getByLabel('Message *').fill('HI');

        // Accept terms and submit (within the Contact Me form)
        await page.getByLabel('I agree to the Terms of Use').check();
        await contactForm.getByRole('button', { name: 'Submit' }).click();

        // Wait for submission to complete
        await sleep(2000);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-fellowship-${Date.now()}.png`,
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