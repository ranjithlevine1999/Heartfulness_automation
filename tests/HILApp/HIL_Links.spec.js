const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

test('Links', async ({ page }) => {
  try {
await page.goto('https://hil.staging.heartfulness.org/');

// Handle "Request Custom Program" link that opens in a new tab
const page1Promise = page.waitForEvent('popup');
await page.locator('a').filter({ hasText: /^Request Custom Program$/ }).click();
const page1 = await page1Promise;
await page1.close();


// Main navigation links
await page.getByRole('button', { name: 'Upcoming Programs' }).click();
await page.getByRole('link', { name: 'For Organisation', exact: true }).click();
await page.getByRole('link', { name: 'For Individuals' }).click();
await page.getByRole('navigation').getByRole('link', { name: 'About Us' }).click();
await page.getByRole('link', { name: 'Faculty' }).click();
await page.getByRole('link', { name: 'Blogs' }).click();
await page.getByRole('link', { name: 'Contact Us' }).click();
await page.getByRole('link', { name: 'Logo' }).click();

// Footer navigation links
await page.getByRole('contentinfo').getByRole('link', { name: 'About Us' }).click();
await page.getByRole('link', { name: 'Request Custom Program' }).click();
await page.getByRole('link', { name: 'Refund' }).click();

// Scroll-to-top / progress indicator
//await page.locator('.progress-wrap').click();

  } catch (error) {
    console.error('Test failed in Links Page flow:', error);
    await takeScreenshot(page, 'Links Error');
    throw error;
  }
});
