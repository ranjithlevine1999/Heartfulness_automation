const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep (kept in case you use it elsewhere)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Valid login', async ({ page }) => {
  try {
    await page.goto('https://meditationplace.heartfulness.org');
    await page.getByRole('link', { name: 'Signin with Email' }).click();

    await page.getByLabel('Email *').fill('preceptor.10@mailinator.com');
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Optional: assert successful login
    // await expect(page.getByRole('button', { name: /Allocate Bed|Profile|Logout/ })).toBeVisible();
  } catch (error) {
    console.error('Test failed in Valid Login flow:', error);
    await takeScreenshot(page, 'ValidLogin_Error');
    throw error; // re-throw so Playwright marks the test as failed
  }
});

test('Invalid login', async ({ page }) => {
  try {
    await page.goto('https://meditationplace.heartfulness.org');
    await page.getByRole('link', { name: 'Signin with Email' }).click();

    await page.getByLabel('Email *').fill('precept.10@mailinator.com');
    await page.getByLabel('Password', { exact: true }).fill('password');
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Optional: assert that an error message appears
    // await expect(page.getByText(/invalid|incorrect|not found/i)).toBeVisible();
  } catch (error) {
    console.error('Test failed in Invalid Login flow:', error);
    await takeScreenshot(page, 'InvalidLogin_Error');
    throw error;
  }
});