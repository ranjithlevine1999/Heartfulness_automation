const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


try{

test('Sign in with valid and invalid credentials', async ({ page }) => {

await page.goto('https://contributions.staging.heartfulness.org/in-en');

  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('Shahjahanpur Renovation').getByTestId('know-more').click();
  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('50');

  await page.getByTestId('simple-donation-button').click();

  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');
  await page.getByTestId('option-Chennai').getByText('Chennai').click();

  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('95th street chennai');

  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('600069');

  await page.getByTestId('donor-info').getByRole('combobox').nth(1).click();
  await page.getByText('Others').click();
  await page.getByTestId('donor-meditation-place-name').click();

  await page.getByTestId('donor-meditation-place-name').fill('mathur');
  await page.getByTestId('id-type-select').click();
  await page.getByLabel('PAN').click();

  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('HHKUP9967K');
  await page.getByTestId('proceed-to-pay-button').click();
});
}catch (error) {
            console.log("Error in element", error.message);
}