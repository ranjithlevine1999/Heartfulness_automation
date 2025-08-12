const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Sign in with valid and invalid credentials', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');

  // Open sign-in screen
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();

  // Attempt with invalid credentials
  await page.getByLabel('Email *').fill('karadipai@mailinatpr.com');
  await page.getByLabel('Password', { exact: true }).fill('wrongpass');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Now try with valid credentials
  await page.getByLabel('Email *').fill('karadipai@mailinator.com');
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Sign out
  await page.getByRole('button', { name: 'AN' }).click();
  await page.getByRole('button', { name: 'Sign Out' }).click();
  await page.getByRole('button', { name: 'Yes, sign out' }).click();
});
