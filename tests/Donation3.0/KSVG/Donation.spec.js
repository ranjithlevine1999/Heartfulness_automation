const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('KSVG Donations', async ({ page }) => {
    
  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();

  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByTestId('Kanha Shanti Vanam Gaushala').getByRole('button', { name: 'DONATE NOW icon' }).click();
  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('455');
  await page.locator('button').filter({ hasText: 'Select city...' }).click();

  await page.getByPlaceholder('Search city...').fill('chennai');

  await page.getByTestId('option-chennai').getByText('chennai').click();
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('654');

  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('600069');
  await page.getByTestId('donor-info').getByRole('combobox').nth(1).click();
  await page.getByText('Others').click();

  await page.getByTestId('donor-meditation-place-name').click();
  await page.getByTestId('donor-meditation-place-name').fill('chennai');
  await page.getByTestId('id-type-select').click();

  await page.getByText('PAN', { exact: true }).click();
  await page.getByTestId('id-number-input').click();

  await page.getByTestId('id-number-input').fill('HHGDT8793L');
  await page.getByTestId('proceed-to-pay-button').click();
});