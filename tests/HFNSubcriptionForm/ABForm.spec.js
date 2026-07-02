const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const GLOBAL_URL = 'https://awsstaging.heartfulness.org/global/';

async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}


test('Heartfulness Global -> Signin and Abhyasi Bulletin signup', async ({ page }) => {
    test.setTimeout(90000);

    try {
        page.on('framenavigated', async () => {
            try {
                await hideStagingBanner(page);
            } catch (e) {
                // ignore
            }
        });

        await page.goto(GLOBAL_URL);
        await hideStagingBanner(page);

        // --- Sign in ---
        await page.getByLabel('SIGN IN').click();
        await page.getByRole('link', { name: 'Signin with Email' }).click();
        await page.waitForLoadState('domcontentloaded');

        await page.getByLabel('Email ID *').fill('ranjithlevine@gmail.com');
        await page.getByLabel('Password', { exact: true }).fill('Test@123');
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);

        // --- Navigate to Abhyasi Bulletin ---
        await page.getByRole('link', { name: 'Abhyasi Bulletin' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);

        // --- Fill form fields ---
        await page.locator('input[name="fname"]').fill('ranjith');
        await page.locator('input[name="lname"]').fill('kumar');
        await page.locator('input[name="from"]').fill('ranjithkumar.krishnamoorthy@volunteer.heartfulness.org');

        // --- Country dropdown - try multiple approaches ---
        // Approach 1: Click the country selector to open the dropdown
        const countrySelector = page.locator('div').filter({ hasText: /^empty$/ }).nth(1);
        await countrySelector.click();
        await sleep(500);

        // Approach 2: Type in whichever textbox is now active (the dropdown's search field)
        await page.keyboard.type('india');
        await sleep(800);

        // Select India from the dropdown
        await page.getByLabel('India').click();
        await sleep(500);

        // --- reCAPTCHA ---
        await page.locator('iframe[name^="a-"]').contentFrame()
            .getByLabel('I\'m not a robot').click();
        await sleep(3000);

        // --- Submit ---
        await page.getByLabel('SUBMIT').click();
        await sleep(2000);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-bulletin-${Date.now()}.png`,
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