const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Home Page', async ({ page }) => {

     try {// Helper to return to homepage via logo
const goHome = () => page.getByRole('link', { name: 'Logo' }).click();

await page.goto('https://hil.staging.heartfulness.org/');
await page.getByRole('button', { name: 'Upcoming Programs' }).click();

// Cycle through "FIND OUT MORE" links on Upcoming Programs
await page.getByRole('link', { name: 'FIND OUT MORE' }).first().click();
await goHome();

await page.getByRole('link', { name: 'FIND OUT MORE' }).nth(1).click();
await goHome();

await page.getByRole('link', { name: 'FIND OUT MORE' }).nth(2).click();
await goHome();

// Other "Find out more" variants
await page.getByRole('link', { name: 'Find out more', exact: true }).click();
await goHome();

await page.getByRole('link', { name: 'Find Out More', exact: true }).click();
await goHome();

// Audience-specific sections
await page.getByRole('link', { name: 'For Organisations' }).click();
await goHome();

await page.locator('div').filter({ hasText: /^For Individuals$/ }).getByRole('link').click();
await goHome();

// Members section
await page.getByRole('link', { name: 'See All Members' }).click();
await goHome();

// First swiper pagination - scoped to its container
const firstSwiper = page.locator('.swiper-pagination').first();
await firstSwiper.locator('span:nth-child(2)').click();
await firstSwiper.locator('span:nth-child(3)').click();
await firstSwiper.locator('span:nth-child(4)').click();
await firstSwiper.locator('span:nth-child(5)').click();
await firstSwiper.locator('span:nth-child(6)').click();
await firstSwiper.locator('span:nth-child(7)').click();

// Second swiper pagination - inside .p-10 container
const secondSwiper = page.locator('.p-10 > .swiper-controls > .swiper-pagination');
await secondSwiper.locator('span:nth-child(5)').click();
await secondSwiper.locator('span:nth-child(6)').click();
await secondSwiper.locator('span:nth-child(7)').click();
await secondSwiper.locator('span:nth-child(8)').click();
  } catch (error) {
    console.error(' Test failed in Home Page flow:', error);

    // Capture screenshot on failure
    await takeScreenshot(page, 'Home_Page_Error');

    // Fail the test
    throw error;
  }
});
