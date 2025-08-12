const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Monthly Donation', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('Dhilipan@volunteer.heartfulness.org');

  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Deepu@18');
  await page.getByRole('button', { name: 'Sign In' }).click();
 
  await page.locator('.max-h-\\[300px\\] > a').first().click();
  await page.getByText('Monthly').click();
  await page.getByPlaceholder('Amount').click();

  await page.getByPlaceholder('Amount').fill('4182');
  await page.getByLabel('Until canceled').click();
  await page.getByRole('button', { name: 'Donate Now' }).click();
 
  await page.getByLabel('Until canceled').click();
  await page.getByLabel('Until canceled').click();
  await page.locator('button').filter({ hasText: 'Select city...' }).click();
 
  await page.getByPlaceholder('Search city...').fill('che');
  await page.getByText('chennai', { exact: true }).click();
  await page.getByLabel('Door no., Street Address *').dblclick();
 
  await page.getByLabel('Door no., Street Address *').fill('654');
  await page.getByText('Name *Email *Phone Number *+').click();
  await page.getByLabel('Pin Code *').click();
 
  await page.getByLabel('Pin Code *').fill('60068');
  await page.locator('div:nth-child(5) > div > .relative > .inline-flex').click();
  await page.getByText('Others').click();
  await page.getByLabel('Meditation Place *').click();
 
  await page.getByLabel('Meditation Place *').fill('a');
  await page.locator('div').filter({ hasText: /^Citizenship \*IndiaID Type$/ }).getByRole('combobox').nth(1).click();
 
  await page.getByLabel('PAN').click();
  await page.getByLabel('PAN Number').click();
  await page.getByLabel('PAN Number').fill('GGHYP6634J');
  await page.getByLabel('Abhyasi ID / Member ID').click();
  
  await page.getByLabel('Abhyasi ID / Member ID').fill('CVCVCV111');
 
  await page.getByLabel('This is my personal/private').click();
  await page.getByLabel('This is my personal/private').click();
  await page.getByRole('button', { name: 'Proceed To Donate via UPI (' }).click();
 
  await page.getByLabel('Pin Code *').click();
  await page.getByLabel('Pin Code *').fill('600685');
  await page.getByRole('button', { name: 'Proceed To Donate via UPI (' }).click();
  
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('link', { name: 'Back to Home' }).click();
});