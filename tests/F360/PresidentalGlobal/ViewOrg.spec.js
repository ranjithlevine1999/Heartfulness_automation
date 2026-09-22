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


test('Function360 -> Org search and selection flow', async ({ page }) => {
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

        // --- Open View and Select Org ---
        await page.getByRole('button', { name: ' View and Select Org' }).click();
        await sleep(800);

        // --- Search for "india" ---
        await page.getByPlaceholder('Search for Region/Zone/').fill('india');
        await page.getByLabel('Go').click();
        await sleep(1000);

        // --- Select India from results ---
        await page.getByText('India', { exact: true }).click();
        await sleep(500);

        // --- Click the action button on India row ---
        await page.getByRole('row', { name: 'India Country Allene Navas' })
            .getByRole('button')
            .click();
        await sleep(500);

        // --- Open selected organization link ---
        await page.getByLabel('Select Organization').locator('a').click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(800);

        // --- Re-open View and Select Org ---
        await page.getByRole('button', { name: ' View and Select Org' }).click();
        await sleep(800);

        // --- Search again and clear ---
        await page.getByPlaceholder('Search for Region/Zone/').fill('india');
        await page.getByLabel('Go').click();
        await sleep(1000);
        await page.getByLabel('Clear').click();
        await sleep(500);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-function360-org-${Date.now()}.png`,
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