const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Net Banking success', async ({ page }) => {
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
  await page.getByTestId('amount-input').fill('458');

  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');
  await page.getByTestId('option-chennai').getByText('chennai').click();

  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('45');
  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('600068');
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByText('Net Banking').click();

  await page.locator('div').filter({ hasText: /^Test bank$/ }).first().click();
  await page.locator('#net-banking-list-TESTPGNB-pop').getByTestId('netbanking-proceed-btn-TESTPGNB').click();
  await page.getByPlaceholder('Enter payu as username').click();
  await page.getByPlaceholder('Enter payu as username').fill('payu');

  await page.getByPlaceholder('Enter payu as password').click();
  await page.getByPlaceholder('Enter payu as password').fill('payu');
  await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByRole('button', { name: 'Simulate Success Response' }).click();
});



test('Net Banking Fail', async ({ page }) => {
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
  await page.getByTestId('option-chennai').getByText('chennai').click();
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('509');

  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('600062');

  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByText('Net Banking').click();

  await page.locator('#net-banking-list-TESTPGNB-pop').getByText('Test bank').click();
  await page.locator('#net-banking-list-TESTPGNB-pop').getByTestId('netbanking-proceed-btn-TESTPGNB').click();
  await page.getByPlaceholder('Enter payu as username').click();

  await page.getByPlaceholder('Enter payu as username').fill('payu');

  await page.locator('#CredForm div').filter({ hasText: 'Password Kindly enter valid' }).locator('div').click();
  await page.getByPlaceholder('Enter payu as password').fill('payu');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Simulate Failure Response' }).click();
});