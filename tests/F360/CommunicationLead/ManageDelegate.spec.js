const { test, expect } = require('@playwright/test');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_URL = 'https://function360.staging.heartfulness.org';

const USERNAME = 'abhyasi.25@mailinator.com';
const PASSWORD = 'password';

const DELEGATE_ABHYASI_ID = 'B00097045';

async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}

async function loginAsAbhyasi(page) {
    await page.goto(LOGIN_URL);
    await hideStagingBanner(page);

    await page.getByRole('link', { name: 'Signin with Email' }).click();
    await page.waitForLoadState('domcontentloaded');

    await page.getByLabel('Email ID *').fill(USERNAME);
    await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);
}


test('Function360 -> Manage Delegate flow', async ({ page }) => {
    test.setTimeout(120000);

    try {
        page.on('framenavigated', async () => {
            try {
                await hideStagingBanner(page);
            } catch (e) {
                // ignore
            }
        });

        await loginAsAbhyasi(page);

        // --- Select role: Communication Lead India ---
        await page.getByRole('row', { name: 'Communication Lead India' })
            .getByRole('radio').first().click();
        await sleep(500);
        await page.getByLabel('Continue').click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);

        // --- Navigate to Manage Delegate ---
        await page.getByRole('button', { name: ' Manage Delegate' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);

        // --- Toggle dataview layout (grid/list) ---
        await page.locator('.p-dataview-layout-options > button:nth-child(2)').click();
        await sleep(500);
        await page.locator('.p-dataview-layout-options > button').first().click();
        await sleep(500);

        // --- Add a delegate ---
        await page.getByLabel('+ Add Delegate').click();
        await sleep(800);

        await page.getByPlaceholder('INABCD123').fill(DELEGATE_ABHYASI_ID);
        await page.getByLabel('Go').click();
        await sleep(1000);

        await page.getByLabel('Add Delegate', { exact: true }).click();
        await sleep(1500);

        // --- Edit delegate (open + close dialog) ---
        await page.getByTitle('Edit').click();
        await sleep(800);
        await page.getByLabel('Close').click();
        await sleep(500);

        // --- Remove delegate + confirm ---
        await page.getByTitle('Remove').click();
        await sleep(500);
        await page.getByLabel('Yes').click();
        await sleep(1500);

        // --- Change page size to 100 ---
        await page.locator('div').filter({ hasText: /^20$/ }).getByRole('button').click();
        await sleep(500);
        await page.getByLabel('100').click();
        await sleep(1000);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-manage-delegate-${Date.now()}.png`,
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