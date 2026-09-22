const { test, expect } = require('@playwright/test');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_URL = 'https://function360.staging.heartfulness.org';

const USERNAME = 'abhyasi.25@mailinator.com';
const PASSWORD = 'password';

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


test('Function360 -> Role selection and navigation', async ({ page }) => {
    test.setTimeout(90000);

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

        // --- View and Select Org ---
        await page.getByRole('button', { name: ' View and Select Org' }).click();
        await sleep(800);

        // --- Clear and search in Region/Zone selector ---
        await page.getByLabel('Clear').click();
        await sleep(300);
        await page.getByPlaceholder('Search for Region/Zone/').click();
        await sleep(500);

        // --- Navigate through sidebar sections ---
        await page.getByRole('button', { name: ' Manage Delegate' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(800);

        await page.getByRole('button', { name: ' List of Practitioners' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(800);

        await page.getByRole('button', { name: ' List of Preceptors' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(800);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-function360-${Date.now()}.png`,
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