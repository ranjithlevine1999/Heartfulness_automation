const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Tiny drop -> Know more', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');

  // Click on the "Know more" link under Tiny Drop
  await page.locator('.max-h-\\[300px\\] > a').first().click();

  // Select different donation amounts
  await page.getByText('₹ 100').click();
  await page.getByText('₹ 200').click();
  await page.getByText('₹ 50').click();

  // Select donation frequency
  await page.getByText('Until canceled').click();

  // Proceed to donation
  await page.getByRole('button', { name: 'Donate Now' }).click();

  // Login flow
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').fill('karadipai@mailinator.com');
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
});
