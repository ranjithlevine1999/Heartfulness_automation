const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Hearts of Kenya', async ({ page }) => {

       try{

  await page.goto('https://contributions.staging.heartfulness.org/ke');

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();

  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('button', { name: 'DONATE NOW icon' }).click();

  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('85');
  await page.getByTestId('donor-first-name').click();
  await page.getByTestId('donor-first-name').fill('Ranjith');
  await page.getByTestId('donor-last-name').click();
  await page.getByTestId('donor-last-name').fill('kumar');

  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('nige');
  await page.getByText('Gaja, Tehri Garhwal,').click();

  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('8th st');
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('856');

  
  await page.getByRole('combobox').nth(4).click();

  await page.getByRole('option', { name: 'Others' }).click();
 
  await page.getByTestId('donor-meditation-place-name').fill('pol');
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByLabel('Card Number').click();
  await page.getByLabel('Card Number').fill('4242424242424242');
  await page.getByLabel('Invalid Expiry Date').click();
  await page.getByLabel('Invalid Expiry Date').fill('12/26');
  await page.getByLabel('Security Code').click();

  await page.getByLabel('Security Code').fill('1123');
  await page.getByLabel('Name on Card').click();
  await page.getByLabel('Name on Card').fill('rj');
  await page.getByRole('button', { name: 'Pay KSh' }).click();
 
} catch (error) {
    console.error('Test failed in Kenya Page flow:', error);
    await takeScreenshot(page, 'Hearts of kenya Error');
    throw error;
  }
 
});