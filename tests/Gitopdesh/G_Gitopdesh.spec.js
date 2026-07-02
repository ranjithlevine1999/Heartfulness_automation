const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const VIDYARTHI_URL = 'https://awsstaging.heartfulness.org/education/vidyarthi-1/';

async function handlePopup(popupPromise) {
    const popup = await popupPromise;
    try {
        await popup.waitForLoadState('domcontentloaded', { timeout: 5000 });
    } catch (e) {
        // Popup didn't fully load - okay
    }
    await popup.close();
}


test('Heartfulness Education -> Gitopadesh course registration', async ({ page }) => {
    test.setTimeout(90000);

    try {
        await page.goto(VIDYARTHI_URL);

        // --- Browse Our Courses section ---
        await page.getByRole('link', { name: 'Our Courses' }).click();
        await sleep(500);

        // --- Click through all 4 "Register Now" links (each opens popup) ---
        for (let i = 0; i < 4; i++) {
            const popupPromise = page.waitForEvent('popup');
            await page.getByRole('link', { name: 'Register Now' }).nth(i).click();
            await handlePopup(popupPromise);
            await sleep(300);
        }

        // --- Click Gitopadesh Summit link (opens popup) ---
        const summitPopupPromise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Gitopadesh Summit' }).click();
        await handlePopup(summitPopupPromise);

        // --- Return to Vidyarthi page to fill registration form ---
        await page.goto(VIDYARTHI_URL);
        await page.waitForLoadState('domcontentloaded');

        // --- Fill Parent details ---
        await page.locator('#first_name_parent').fill('TEST');
        await page.locator('#last_name_parent').fill('QA');
        await page.locator('#whatsapp_number').fill('8745213698');
        await page.locator('#email').fill('test@gmail.com');

        // Country dropdown - type and select
        await page.getByPlaceholder('Select Country').click();
        await page.getByPlaceholder('Select Country').fill('chin');
        await page.getByText('China', { exact: true }).click();

        await page.locator('#state').fill('TEst');
        await page.locator('#city').fill('chennai');

        // Heartfulness practitioner? (radio button - use force click)
        await page.locator('#are_you_a_hf-1').click({ force: true });

        // --- Fill Student details ---
        await page.locator('#first_name').fill('RAm');
        await page.locator('#last_name').fill('TEst');
        await page.locator('#gender-0').click({ force: true });
        await page.locator('#age').selectOption('5 - 9');
        await page.locator('#batch').selectOption('April 2026');

        // --- Agreements (custom-styled checkboxes) ---
        await page.locator('#understand').click({ force: true });
        await page.locator('#read_course_model').click({ force: true });
        await page.locator('#legal_action').click({ force: true });
        await page.locator('#agree').click({ force: true });

        // --- Submit form (first attempt - reveals timeslot options) ---
        await page.getByRole('button', { name: 'Register & Pay' }).click();
        await sleep(500);

        // --- Select timeslot 3, then change to timeslot 1 (custom-styled radios) ---
        await page.locator('#timeslot-3').click({ force: true });
        await page.getByRole('button', { name: 'Register & Pay' }).click();
        await sleep(500);

        await page.locator('#timeslot-1').click({ force: true });
        await page.getByRole('button', { name: 'Register & Pay' }).click();
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-gitopadesh-${Date.now()}.png`,
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