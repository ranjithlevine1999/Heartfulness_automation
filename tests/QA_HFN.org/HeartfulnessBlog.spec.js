const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/heartfulness-blogs/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';


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


test('Heartfulness Blogs - Pagination and blog navigation', async ({ page }) => {
    test.setTimeout(90000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Navigate through blog pagination pages ---
        const pages = ['2', '3', '4'];
        for (const pageNum of pages) {
            await page.getByText(pageNum, { exact: true }).click();
            await sleep(1500);
            await takeScreenshot(page, `Blog_Page_${pageNum}`);
        }

        // --- Click on the "March 8," blog heading ---
        await page.getByRole('heading', { name: 'March 8,' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        await takeScreenshot(page, 'Blog_Post_Opened');

        console.log('✓ Blog pagination and navigation completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'HeartfulnessBlogs_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});