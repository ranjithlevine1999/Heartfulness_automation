const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js');
// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Canada Donation', async ({ page }) => {
     try{

  await page.goto('https://contributions.staging.heartfulness.org/ca');
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
  await page.getByTestId('donor-last-name').click();
  await page.getByTestId('donor-last-name').fill('ranjith');

  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('');
  await page.getByRole('button', { name: '+' }).click();
  await page.getByPlaceholder('Search country').fill('cana');
  await page.getByText('+1 Canada').click();
  await page.getByTestId('donor-phone-number').click();
  await page.getByTestId('donor-phone-number').fill('709-866-7507 ');
  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('toronto');
  await page.getByRole('option', { name: 'Toronto Iowa, United States' }).locator('div').nth(1).click();

  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('asd');
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('12');
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('1as');
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('612323');
  await page.getByTestId('proceed-to-pay-button').click();

  await page.locator('iframe[title="Payment Details"]').contentFrame().getByLabel('Cardholder Name').click();
  await page.locator('iframe[title="Payment Details"]').contentFrame().getByLabel('Cardholder Name').fill('Rj');
 
  await page.locator('iframe[title="Payment Details"]').contentFrame().getByLabel('Card Number', { exact: true }).click();
  await page.locator('iframe[title="Payment Details"]').contentFrame().getByLabel('Card Number', { exact: true }).fill('424242424242');

  await page.locator('iframe[title="Payment Details"]').contentFrame().getByLabel('Expiry Date MMYY').click();

  await page.locator('iframe[title="Payment Details"]').contentFrame().getByLabel('Expiry Date MMYY').fill('1229');
  await page.locator('iframe[title="Payment Details"]').contentFrame().getByRole('textbox', { name: 'CVV' }).click();
  await page.locator('iframe[title="Payment Details"]').contentFrame().getByRole('textbox', { name: 'CVV' }).fill('123');
  await page.locator('iframe[title="Payment Details"]').contentFrame().getByRole('button', { name: 'Donate' }).click();

  await page.goto('https://contributions.staging.heartfulness.org/ca/status?trkId=CA-56610&status=failure&amount=85.0&currency=CAD&refNo=CA-56610');
   
} catch (error) {
    console.error('Test failed in Kenya Page flow:', error);
    await takeScreenshot(page, 'Hearts of kenya Error');
    throw error;
  }
});