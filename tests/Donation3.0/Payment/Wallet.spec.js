const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Wallet success', async ({ page }) => {

  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('Shahjahanpur Renovation').getByRole('button', { name: 'DONATE NOW icon' }).click();
  await page.getByTestId('amount-input').click();

  await page.getByTestId('amount-input').fill('500');
  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');
  await page.getByText('Mayiladuthurai,').click();
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('456');

  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('600069');
  await page.getByTestId('proceed-to-pay-button').click();

  await page.getByTestId('proceed-to-pay-button').click();
  await page.locator('div').filter({ hasText: /^Wallet$/ }).first().click();
  await page.getByTestId('item-AMON').locator('div').filter({ hasText: 'Airtel Payments Bank' }).first().click();
  await page.getByTestId('item-AMON').getByRole('button', { name: 'PROCEED' }).click();
  await page.getByPlaceholder('Enter OTP as').click();
 // await page.getByPlaceholder('Enter OTP as').fill('12345');

//await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByPlaceholder('Enter OTP as').click();
  await page.getByPlaceholder('Enter OTP as').fill('123456');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Simulate Success Response' }).click();
});



test('Wallet Failure', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('Shahjahanpur Renovation').getByRole('button', { name: 'DONATE NOW icon' }).click();
  await page.getByTestId('amount-input').click();

  await page.getByTestId('amount-input').fill('500');
  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');
  await page.getByText('Mayiladuthurai,').click();
  await page.getByTestId('donor-address').click();

  await page.getByTestId('donor-address').fill('458');
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('600062');

  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByText('Wallet').click();

  await page.getByTestId('item-ITZC').click();
  
  await page.getByTestId('item-ITZC').getByRole('button', { name: 'PROCEED' }).click();
  await page.getByPlaceholder('Enter OTP as').click();

  await page.getByPlaceholder('Enter OTP as').fill('123456');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Simulate Failure Response' }).click();
});