const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//Donation for SMSF India - General Fund

test('Offline India ->[Donation for SMSF India - General Fund]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Offline modes of Donation').click();
  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Donation for SMSF India - General Fund' }).click();
  await page.getByRole('button', { name: 'Proceed to Registration' }).click();

  await page.getByRole('button', { name: 'Confirm the details' }).click();

  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testing');
  await page.getByPlaceholder('Email Id').click();
  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+91 87965-41235');
  await page.getByPlaceholder('City').click();
  await page.getByText('Chennai').click();

  await page.getByPlaceholder('Door No, Street Address').click();


  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('256');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('65548');
  await page.getByRole('button', { name: 'Confirm the details' }).click();
  await page.getByPlaceholder('INR:').click();

  await page.locator('div').filter({ hasText: /^INR:$/ }).getByRole('spinbutton').fill('52');
  await page.getByRole('button', { name: 'Confirm the details' }).click();
  await page.getByRole('button', { name: 'Confirm the details' }).click();

}); 

//Donation for SMSF India - Corpus Fund

test('Offline India ->[Donation for SMSF India - Corpus Fund]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Offline modes of Donation').click();
  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Donation for SMSF India - Corpus Fund' }).click();
  await page.getByRole('button', { name: 'Proceed to Registration' }).click();
  await page.getByPlaceholder('INR:').click();
  await page.locator('div').filter({ hasText: /^INR:$/ }).getByRole('spinbutton').fill('55');

  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+91 84569-87459');
  await page.getByPlaceholder('City').click();
  await page.getByText('Hyderabad').click();

  await page.getByPlaceholder('Door No, Street Address').click();
  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('54');
  await page.getByPlaceholder('Pincode').click();
  
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('651182');
  await page.getByRole('button', { name: 'Confirm the details' }).click();
});

//Donation for SMSF India - Every Drop Counts - Recurring

test('Offline India -> [Donation for SMSF India - Every Drop Counts - Recurring]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Offline modes of Donation').click();
  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Donation for SMSF India - Every Drop Counts - Recurring' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByPlaceholder('0', { exact: true }).fill('54');


  await page.getByPlaceholder('Name').click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');

  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+91 98456-98589');
  await page.getByPlaceholder('City').click();

  await page.getByText('Karnataka, India').click();
  await page.getByPlaceholder('Pincode').click();
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('455');

  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('65456');
  await page.getByRole('button', { name: 'Confirm the details' }).click();
});