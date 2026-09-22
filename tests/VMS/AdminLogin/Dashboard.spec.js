const { test, expect } = require('@playwright/test');
//const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_URL = 'https://visitor.staging.heartfulness.org/admin/login';

const USERNAME = 'abhyasi.25@mailinator.com';
const PASSWORD = 'password';

async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}


test('Visitor Portal -> Dashboard navigation', async ({ page }) => {
    test.setTimeout(90000);

    try {
        page.on('framenavigated', async () => {
            try {
                await hideStagingBanner(page);
            } catch (e) {
                // ignore
            }
        });

        await page.goto(LOGIN_URL);
        await hideStagingBanner(page);

        // --- Sign in with Email ---
        await page.getByRole('link', { name: 'Signin with Email' }).click();
        await page.waitForLoadState('domcontentloaded');

        await page.getByLabel('Email ID *').fill(USERNAME);
        await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
        await page.getByRole('button', { name: 'Sign In' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);

        // --- Open sidebar menu (two icon buttons) ---
        await page.getByRole('button', { name: '' }).first().click();
        await sleep(300);
        await page.getByRole('button', { name: '' }).nth(1).click();
        await sleep(300);

        // --- Navigate to Dashboard ---
        await page.getByRole('button', { name: ' Dashboard' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(800);

        // --- Click through dashboard stat cards ---
        await page.getByText('0', { exact: true }).first().click();
        await page.getByText('1').first().click();
        await page.getByText('1268').click();
        await page.getByText('0', { exact: true }).nth(1).click();
        await page.getByText('1').nth(2).click();

        // --- Click through 6 dashboard cards ---
        for (let i = 1; i <= 6; i++) {
            const cardSelector = i === 1
                ? '.col-md-4 > .p-card > .p-card-body > .p-card-content'
                : `div:nth-child(${i}) > .p-card > .p-card-body > .p-card-content`;
            await page.locator(cardSelector).first().click();
            await sleep(300);
        }

        // --- Switch dataview layout ---
        await page.locator('.p-dataview-layout-options > button:nth-child(2)').click();
        await sleep(500);

        // --- Navigate through sidebar sections ---
        await page.getByRole('button', { name: ' Visitor Log' }).click();
        await sleep(500);
        await page.getByRole('button', { name: ' Master Data' }).click();
        await sleep(500);
        await page.getByRole('button', { name: ' Preceptor Management' }).click();
        await sleep(500);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-visitor-dashboard-${Date.now()}.png`,
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