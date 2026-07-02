const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Individuals Screen', async ({ page }) => {

  try{
await page.goto('https://hil.staging.heartfulness.org/individuals');

// Handle "Upcoming Programs" link that opens in a new tab
const page1Promise = page.waitForEvent('popup');
await page.getByRole('link', { name: 'Upcoming Programs' }).click();
const page1 = await page1Promise;
await page1.close();

// Expand each leadership accordion/section
await page.getByRole('button', { name: 'Expand Leadership' }).click();
await page.getByRole('button', { name: 'Integrate Personal and' }).click();
await page.getByRole('button', { name: 'Enhance Decision-Making' }).click();
await page.getByRole('button', { name: 'Strengthen Team Collaboration' }).click();
await page.getByRole('button', { name: 'Boost Workforce Engagement' }).click();
await page.getByRole('button', { name: 'Achieve Strategic Alignment' }).click();
await page.getByRole('button', { name: 'Build Leadership Confidence' }).click();

// Navigate to Get in Touch and return
await page.getByRole('link', { name: 'Get in Touch' }).click();
await page.goBack();

// Click the scroll-to-top / progress wrap control
await page.locator('.progress-wrap').click();
}
  catch (error) {
    console.error(' Test failed in Individual Page flow:', error);

    // Capture screenshot on failure
    await takeScreenshot(page, 'Individual_Screen Error');

    // Fail the test
    throw error;
  }
});