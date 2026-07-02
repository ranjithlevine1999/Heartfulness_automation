const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Event drop count -->Know more', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();


  await page.getByTestId('Every Drop Counts').getByTestId('know-more').click();
  await page.getByTestId('custom-amount-input').click();

  await page.getByTestId('custom-amount-input').fill('452');
  await page.getByTestId('until-cancel-checkbox').click();

  await page.getByTestId('until-cancel-checkbox').click();

  await page.getByTestId('donate-now-button').click();
  await page.locator('label').filter({ hasText: 'Savings' }).click();

  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');

  await page.getByTestId('option-chennai').getByText('chennai').click();
  await page.getByText('Name *Email *Phone Number *+').click();

  await page.getByTestId('donor-address').fill('54 street mathur');
  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('655894');

  await page.getByTestId('id-type-select').click();

  await page.getByLabel('PAN').click();
  await page.getByTestId('id-number-input').click();

  await page.getByTestId('id-number-input').fill('GGHHY6749K');

  await page.getByTestId('proceed-to-pay-button').click();

 // await page.goto('https://ext.digio.in/#/enach-mandate-direct/ENA25092211533416362L4G8AU45BIAP/0f47fd65-faf0-419a-b31f-acc284dfe791/ranjithlevine@gmail.com?redirect_url=https:%2F%2Fdonation-service.qa.heartfulnessinstitute.in%2Fdonations%2Fpayments%2Fdigio%2FprocessMandateAcknowledgement');
});