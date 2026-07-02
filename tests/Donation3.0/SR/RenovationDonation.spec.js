const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Donation', async ({ page }) => {
await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.getByRole('button', { name: 'Sign In' }).click();
  
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  //await page.getByLabel('Password', { exact: true }).press('Enter');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByTestId('Shahjahanpur Renovation').getByRole('button', { name: 'DONATE icon' }).click();
  await page.getByTestId('amount-input').click();

  await page.getByTestId('amount-input').fill('50');
  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');

  await page.getByTestId('option-chennai').getByText('chennai').click();

  await page.getByTestId('donor-address').click();

  await page.getByTestId('donor-address').fill('sad');
  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('600255');

  await page.getByTestId('donor-info').getByRole('combobox').nth(1).click();



  await page.getByText('Others').click();
  await page.getByTestId('donor-meditation-place-name').click();
  await page.getByTestId('donor-meditation-place-name').fill('chennai');
  await page.getByTestId('id-type-select').click();

  await page.getByLabel('PAN').click();
  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('HHGRT7756K');

  await page.getByTestId('proceed-to-pay-button').click();

  // await page.getByText('UPI').click();
  // await page.locator('li').filter({ hasText: 'Enter Any UPI ID' }).locator('img').first().click();
  // await page.getByPlaceholder('Enter UPI ID').click();

  // await page.getByPlaceholder('Enter UPI ID').fill('sucess@payu');
  // await page.getByRole('button', { name: 'Verify' }).click();

  // await page.locator('.payment-form > .modal > .v-align-main > .v-align-cntnr').click();
});