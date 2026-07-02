const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Heartfulnes Green', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');

  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByTestId('Heartfulness Green').getByRole('button', { name: 'DONATE NOW icon' }).click();
  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('84');

  await page.getByTestId('donor-info').getByRole('combobox').click();
  await page.getByPlaceholder('Search city...').fill('chennai');
 // await page.getByPlaceholder('Search city...').press('Enter');

  await page.getByTestId('donor-info').getByRole('combobox').click();
  await page.getByPlaceholder('Search city...').fill('chennai');
  await page.getByTestId('option-chennai').getByText('chennai').click();
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('65');

  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('699965');
  await page.getByTestId('id-type-select').click();

  await page.getByLabel('PAN').click();
  
  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('FFLKI7798L');
  await page.getByTestId('proceed-to-pay-button').click();
});