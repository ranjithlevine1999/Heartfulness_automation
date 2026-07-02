const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('About us', async ({ page }) => {
    try{
await page.goto('https://hil.staging.heartfulness.org/about');

  await page.locator('img').nth(1).click();

  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Adizes Methodology' }).click();
  await page.getByRole('button', { name: 'Clare Graves’ Human' }).click();
  await page.getByRole('button', { name: 'Heartfulness Practices' }).click();

  await page.locator('img').nth(2).click();

  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Peer-to-Peer Learning' }).click();
  await page.getByRole('button', { name: 'Case-Based Approach' }).click();
  await page.getByRole('button', { name: 'Application Orientation' }).click();
  await page.getByRole('button', { name: 'Progressive Skill Development' }).click();
  await page.getByRole('button', { name: 'Flipped Classroom Model' }).click();
  
  await page.locator('.progress-wrap').click();

  }
  catch (error) {
    console.error(' Test failed in AboutUs Page flow:', error);

    // Capture screenshot on failure
    await takeScreenshot(page, 'AboutUs_Screen Error');

    // Fail the test
    throw error;
  }
});