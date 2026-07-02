const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//Donation for SMSF India - General Fund

test('Offline India ->[Donation for SMSF India - General Fund]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/');

  await page.getByText('Offline modes of Donation').click();
  await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Donation for SMSF India - General Fund' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('50');
  await page.getByTestId('simple-donation-button').click();

   await page.getByTestId('donor-first-name').click();
  await page.getByTestId('donor-first-name').fill('Karadipai');

  await page.getByTestId('donor-phone-number').click();
  await page.getByTestId('donor-phone-number').fill('8954621358');
  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');
  await page.getByTestId('option-Chennai').getByText('Chennai, Tamil Nadu, India').click();
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('84th chennai');
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('6002558');
  await page.getByTestId('donor-info').getByRole('combobox').nth(1).click();
  await page.getByText('Others').click();
  await page.getByTestId('donor-meditation-place-name').click();
  await page.getByTestId('donor-meditation-place-name').fill('chennai');
  await page.getByTestId('proceed-to-pay-button').click();

 
 
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('600255');
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('proceed-to-pay-button').click();
  
}); 

//Donation for SMSF India - Corpus Fund

test('Offline India ->[Donation for SMSF India - Corpus Fund]', async ({ page }) => {
   await page.goto('https://donations.heartfulness.org/');
  
   await page.getByText('Offline modes of Donation').click();
  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Donation for SMSF India - Corpus Fund' }).click();
  await page.getByTestId('amount-input').click();

  await page.getByTestId('amount-input').fill('50');
  await page.getByTestId('simple-donation-button').click();

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('50');

  await page.getByTestId('simple-donation-button').click();
 
  await page.getByTestId('donor-first-name').click();
  await page.getByTestId('donor-first-name').fill('Karadipai');

  await page.getByTestId('donor-phone-number').click();
  await page.getByTestId('donor-phone-number').fill('8745621458');

  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');

  await page.getByTestId('option-Chennai').getByText('Chennai, Tamil Nadu, India').click();
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('89 chennai');

  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('600065');

  await page.getByTestId('donor-info').getByRole('combobox').nth(1).click();
  await page.getByText('Others').click();

  await page.getByTestId('donor-meditation-place-name').click();

  await page.getByTestId('donor-meditation-place-name').fill('Madurai');
  await page.getByTestId('proceed-to-pay-button').click();

  await page.getByTestId('proceed-to-pay-button').click();

});

//Donation for SMSF India - Every Drop Counts - Recurring

test('Offline India -> [Donation for SMSF India - Every Drop Counts - Recurring]', async ({ page }) => {
 
 await page.goto('https://donations.heartfulness.org/');

  await page.getByText('Offline modes of Donation').click();
  await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Donation for SMSF India - Every Drop Counts - Recurring' }).click();
  await page.getByTestId('custom-amount-input').click();
  await page.getByTestId('custom-amount-input').fill('50');
  //await page.locator('div').filter({ hasText: 'AboutWho we areConnect with' }).nth(1).click();
  
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
 
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
 // await page.getByLabel('Password', { exact: true }).fill('password');
  
 await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
 
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('donate-now-button').click();
  await page.getByTestId('donor-first-name').click();
 
  await page.getByTestId('donor-first-name').fill('Karadipai');
  await page.getByTestId('donor-phone-number').click();
 
  await page.getByTestId('donor-phone-number').fill('8745129568');
  await page.locator('button').filter({ hasText: 'Select city...' }).click();
  await page.getByPlaceholder('Search city...').fill('chennai');
 
  await page.getByTestId('option-Chennai').getByText('Chennai, Tamil Nadu, India').click();
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('sad 78th st');
 
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('699855');
 
  await page.getByTestId('donor-info').getByRole('combobox').nth(1).click();
  await page.getByRole('option', { name: 'Others' }).click();
 
  await page.getByTestId('donor-meditation-place-name').click();
  await page.getByTestId('donor-meditation-place-name').fill('Tirchy');
  await page.getByTestId('proceed-to-pay-button').click();
 
  await page.getByTestId('account-type-savings').check();
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('proceed-to-pay-button').click();
  

});