const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Tiny drop -> Donate', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.locator('div:nth-child(4) > div > .whitespace-nowrap').first().click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  
  await page.getByLabel('Email *').fill('karadipai@mailinator.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Until canceled').click();
  await page.getByLabel('This is my personal/private').click();

  await page.getByLabel('This is my personal/private').click();
  await page.locator('div:nth-child(5) > div > .relative > .inline-flex').click();
  await page.getByPlaceholder('Type here').fill('');
  await page.getByRole('option', { name: 'Others' }).click();

  await page.getByLabel('Meditation Place *').click();
  await page.getByLabel('Meditation Place *').fill('Random');
  await page.getByRole('button', { name: 'Proceed To Donate via UPI (' }).click();
  await page.getByLabel('Abhyasi ID / Member ID').click();

  await page.getByLabel('Abhyasi ID / Member ID').fill('CARD2779');
  await page.getByRole('button', { name: 'Proceed To Donate via UPI (' }).click();
});