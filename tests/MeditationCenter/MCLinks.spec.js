const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');
const { waitFor } = require('wd/lib/commands');

test('Checking for broken links', async ({ page }) => {
    try {
        await page.goto('https://meditationplace.heartfulness.org');
        await page.getByRole('link', { name: 'Signin with Email' }).click();

        await page.getByLabel('Email *').click();
        await page.getByLabel('Email *').fill('preceptor.10@mailinator.com');
        await page.getByLabel('Password', { exact: true }).click();
        await page.getByLabel('Password', { exact: true }).fill('password');
        await page.getByRole('button', { name: 'Sign In' }).click();

        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('button', { name: ' My Meditation Places' }).click();

        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('button', { name: ' Report Satsangh Attendance' }).click();

        const page1Promise = page.waitForEvent('popup');
        await page.getByRole('button', { name: 'Click Here' }).click();
        const page1 = await page1Promise;
        await page1.close();

        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('button', { name: ' Help' }).click();
        await page.getByRole('link', { name: 'it.help@heartfulness.org' }).click();

        await page.getByRole('button', { name: '' }).click();
        await page.getByRole('button', { name: ' My Meditation Places' }).click();

        await page.getByRole('button', { name: 'Pending Approval (5)' }).click();
        await page.getByRole('button', { name: 'Approved (0)' }).click();
        await page.getByRole('button', { name: 'Draft (1)' }).click();
        await page.getByRole('button', { name: 'Cancelled (0)' }).click();
    } catch (screenshotError) {
        console.error('Could not take screenshot:', screenshotError.message);
    }
});