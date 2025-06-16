const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//General Donation to SMSF-Europe

test('Offline Europe -> [General Donation to SMSF-Europe]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');

  await page.getByText('Offline modes of Donation').click();
  await page.getByRole('combobox').selectOption('europe');
  
  await page.getByRole('button', { name: 'General Donation to SMSF-' }).click();
  await page.getByRole('button', { name: 'Proceed to Registration' }).click();

  await page.getByPlaceholder('EUR:').click();
  await page.getByRole('spinbutton').fill('54');
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Email Id').click();


  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.locator('#site-inner div').filter({ hasText: 'General Donation SMSF, EUROPE offlinePayment OptionDonation by Check/Money' }).nth(4).click();
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+49 3723 654564');

  await page.getByPlaceholder('City').click();
  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('s');
  await page.getByText('Secunderabad').click();

  await page.getByPlaceholder('Door No, Street Address').click();
  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('49');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('9948');
  await page.getByRole('button', { name: 'Confirm the details' }).click();

  await page.getByRole('button', { name: 'Go Back' }).click();
});