const { test, expect } = require('@playwright/test');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_URL = 'https://function360.staging.heartfulness.org';

const USERNAME = 'abhyasi.25@mailinator.com';
const PASSWORD = 'password';

const SEARCH_ABHYASI_ID = 'B00097045';

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


test('Function360 -> List of Practitioners filter and navigation', async ({ page }) => {
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
            .locator('input[name="pr_id_1_dt_radio"]')
            .check();
        await sleep(500);
        await page.getByLabel('Continue').click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);

        // --- Navigate to List of Practitioners ---
        await page.getByRole('button', { name: ' List of Practitioners' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);

        // --- Filter by Abhyasi ID column ---
        const abhyasiIdFilter = page.locator(
            'th:nth-child(2) > div > .p-fluid > .filterElementWrapper > .hfn_input > input'
        );
        await abhyasiIdFilter.fill(SEARCH_ABHYASI_ID);
        await sleep(1500);

        // --- Change page size to 50 ---
        await page.locator('div').filter({ hasText: /^10$/ }).getByRole('button').click();
        await sleep(500);
        await page.getByLabel('50').click();
        await sleep(1000);

        // --- Toggle dataview layout ---
        await page.locator('.p-dataview-layout-options > button:nth-child(2)').click();
        await sleep(500);

        // --- Open gender filter dropdown and select Male ---
        await page.locator('.css-1xc3v61-indicatorContainer').first().click();
        await sleep(400);
        await page.getByText('Male', { exact: true }).click();
        await sleep(800);

        // --- Interact with first abhyasi row action button ---
        await page.locator('#abhyasis').getByRole('button').first().click();
        await sleep(800);

        // --- Navigate between Preceptors and Practitioners ---
        await page.getByRole('button', { name: ' List of Preceptors' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(800);

        await page.getByRole('button', { name: ' List of Practitioners' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(800);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-practitioners-${Date.now()}.png`,
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