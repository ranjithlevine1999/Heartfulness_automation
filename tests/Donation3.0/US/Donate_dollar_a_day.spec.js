const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Donate dollar a day', async ({ page }) => {

  await page.goto('https://contributions.staging.heartfulness.org/us');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('Donate $1 a Day').getByRole('button', { name: 'DONATE NOW icon' }).click();
  await page.getByTestId('end-date-input').click();

 // await page.getByText('Start Date *2026-02-04 End').click();

  await page.getByTestId('until-cancel-checkbox').click();

  await page.getByTestId('donor-first-name').click();

  await page.getByTestId('donor-first-name').fill('Ranjith');
  await page.getByTestId('donor-last-name').click();
  await page.getByTestId('donor-last-name').fill('kumar');
  await page.getByRole('button', { name: '+' }).click();
  await page.getByPlaceholder('Search country').fill('united');
  await page.getByText('+1 United States').click();
  await page.getByTestId('donor-phone-number').click();
  await page.getByTestId('donor-phone-number').fill('418-543-8090');

  await page.getByTestId('donor-info').getByRole('combobox').click();
  await page.getByPlaceholder('Search city...').fill('yel');
  await page.getByTestId('option-Yelori').getByText('Yelori').click();
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('458');
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('65894');
  await page.getByTestId('proceed-to-pay-button').click();

  await page.locator('iframe').contentFrame().getByLabel('Card Number').click();
  await page.locator('iframe').contentFrame().getByPlaceholder('5678 9012 3456').fill('4242 4242 4242 4242');
  await page.locator('iframe').contentFrame().getByLabel('Exp. Date').fill('12/27');
  await page.locator('iframe').contentFrame().getByLabel('Card Code').fill('123');
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'firstName' }).click();
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'firstName' }).fill('Tr');
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'lastName' }).click();
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'lastName' }).fill('Tk');
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'zip' }).click();
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'zip' }).fill('6545');
  await page.locator('iframe').contentFrame().getByRole('button', { name: 'Submit' }).click();

  await page.waitForTimeout(10000);
});