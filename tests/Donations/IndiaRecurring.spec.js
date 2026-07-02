const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//Donation for SMSF India - Every Drop Counts

test('India recurring-->[Donation for SMSF India - Every Drop Counts]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/');

   await page.getByText('Recurring Donations').click();
  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Donation for SMSF India -' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('donate-now-button').click();

  await page.getByTestId('account-type-savings').check();

  await page.getByTestId('donor-address').click();

  await page.getByTestId('donor-address').fill('4th st');
  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('688896');

  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('proceed-to-pay-button').click();
  
});

//Donation for HFI

test('India recurring-->[Donation for HFI]', async ({ page }) => {
 await page.goto('https://donations.heartfulness.org/');  

   await page.getByText('Recurring Donations').click();
  await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Donation for HFI' }).click();
  await page.getByTestId('donate-now-button').click();
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Signin with Email' }).click();

  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByTestId('donate-now-button').click();
  
  await page.getByTestId('account-type-current').check();

  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('688859');

  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('56th st');

  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('proceed-to-pay-button').click();
});