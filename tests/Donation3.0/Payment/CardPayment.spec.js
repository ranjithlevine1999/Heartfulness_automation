const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Card payment', async ({ page }) => {
     test.setTimeout(60000);
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
  await page.getByTestId('amount-input').fill('45');
  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');
  await page.getByTestId('option-chennai').getByText('chennai').click();

  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('645');
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('600068');
  await page.getByTestId('proceed-to-pay-button').click();

  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByText('Cards (Credit/Debit)').click();
  await page.getByTestId('cardNumber').click();

  await page.getByTestId('cardNumber').fill('5123-4567-8901-2346');
  await page.getByTestId('cardExpiry').fill('05/30');
  await page.getByTestId('cardCvv').fill('123');

  await page.getByTestId('cardOwnerName').fill('rf');
 // await page.getByTestId('user-consent').click();

  await page.getByTestId('userConsentCheckbox').check();

  await page.getByRole('button', { name: 'PROCEED' }).click();
  await page.locator('#password').click();
  await page.locator('#password').fill('123456');

  await page.getByRole('button', { name: 'PAY' }).click();
});