const { test, expect } = require('@playwright/test');
//const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ESSAY_EVENT_URL = 'https://awsstaging.heartfulness.org/education/essay-event/';
const USERNAME = 'karthiga.natarajan@volunteer.heartfulness.org';
const PASSWORD = 'Welcome@123';

async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}


test('Essay Event -> Institute Admin management flow', async ({ page }) => {
    test.setTimeout(120000);

    try {
        page.on('framenavigated', async () => {
            try {
                await hideStagingBanner(page);
            } catch (e) {
                // ignore
            }
        });

        await page.goto(ESSAY_EVENT_URL);
        await hideStagingBanner(page);

        // --- Open Institution Registration in new tab ---
        const institutionPagePromise = page.waitForEvent('popup');
        await page.getByRole('link', { name: 'Institution Registration &' }).click();
        const institutionPage = await institutionPagePromise;
        await institutionPage.waitForLoadState('domcontentloaded');

        // --- Login flow ---
        await institutionPage.getByRole('link', { name: 'Login' }).click();
        await institutionPage.waitForLoadState('domcontentloaded');

        await institutionPage.getByLabel('User Name').fill(USERNAME);
        await institutionPage.getByLabel('Password').fill(PASSWORD);
        await institutionPage.getByRole('button', { name: 'Login' }).click();
        await institutionPage.waitForLoadState('domcontentloaded');
        await sleep(1000);

        // --- Navigate to Institute Admin page ---
        await institutionPage.getByRole('link', { name: 'Institute Admin' }).click();
        await institutionPage.waitForLoadState('domcontentloaded');

        // --- Export Institute Admins ---
        const exportDownloadPromise = institutionPage.waitForEvent('download');
        await institutionPage.getByRole('button', { name: 'Export' }).click();
        const exportDownload = await exportDownloadPromise;
        console.log('Export downloaded:', await exportDownload.path());
        await sleep(1000);

        // --- Search by ID 34 ---
        await institutionPage.getByPlaceholder('Id').fill('34');
        await institutionPage.getByRole('button', { name: 'Search' }).click();
        await sleep(800);

        // --- View → Back ---
        await institutionPage.getByRole('link', { name: 'View' }).click();
        await institutionPage.waitForLoadState('domcontentloaded');
        await institutionPage.getByRole('link', { name: 'Back' }).click();
        await institutionPage.waitForLoadState('domcontentloaded');

        // --- Edit → Update → Back ---
        await institutionPage.getByRole('link', { name: 'Edit' }).click();
        await institutionPage.waitForLoadState('domcontentloaded');
        await institutionPage.getByRole('button', { name: 'Update' }).click();
        await sleep(1000);
        await institutionPage.getByRole('link', { name: 'Back' }).click();
        await institutionPage.waitForLoadState('domcontentloaded');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-essay-instadmin-${Date.now()}.png`,
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