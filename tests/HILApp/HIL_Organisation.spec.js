const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Organization Screen', async ({ page }) => {

       try {
await page.goto('https://hil.staging.heartfulness.org/organisations');

// Handle "Request Custom Program" link that opens in a new tab
const page1Promise = page.waitForEvent('popup');
await page.locator('a').filter({ hasText: /^Request Custom Program$/ }).click();
const page1 = await page1Promise;
await page1.close();

// Expand and close modal/accordion sections
await page.getByRole('button', { name: 'Making the Organisation' }).click();
await page.getByRole('button', { name: 'Close' }).click();

await page.getByRole('button', { name: 'Developing High Potential' }).click();
await page.getByRole('button', { name: 'Close' }).click();

await page.getByRole('button', { name: "Unlocking the Organisation's" }).click();
await page.getByRole('button', { name: 'Close' }).click();

// Expand remaining benefit sections (no close needed)
await page.getByRole('button', { name: 'Enhanced Team Collabration' }).click();
await page.getByRole('button', { name: 'Increased Workforce Engagement' }).click();
await page.getByRole('button', { name: 'Greater Organisational' }).click();

// Navigate swiper pagination in reverse order
const swiperPagination = page.locator('.swiper-pagination');
await swiperPagination.locator('span:nth-child(5)').click();
await swiperPagination.locator('span:nth-child(4)').click();
await swiperPagination.locator('span:nth-child(3)').click();
await swiperPagination.locator('span:nth-child(2)').click();

} catch (error) {
    console.error(' Test failed in Organization Page flow:', error);

    // Capture screenshot on failure
    await takeScreenshot(page, 'Organization_Screen Error');

    // Fail the test
    throw error;
  }
});