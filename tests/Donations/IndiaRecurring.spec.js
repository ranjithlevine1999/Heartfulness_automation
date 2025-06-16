const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//Donation for SMSF India - Every Drop Counts

test('India recurring-->[Donation for SMSF India - Every Drop Counts]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Recurring Donations').click();

  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Donation for SMSF India -' }).click();

  await page.getByRole('button', { name: 'Donate - ₹1500 Monthly' }).click();
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Email Id').click();
  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+91 89548-58689');
  await page.getByPlaceholder('City').click();

  await page.getByText('Hyderabad').click();

  await page.getByPlaceholder('Door No, Street Address').dblclick();
  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('5');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('543');
  await page.getByRole('button', { name: 'Proceed' }).click();

  await page.getByRole('button', { name: 'Proceed' }).click();
});

//Donation for HFI

test('India recurring-->[Donation for HFI]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Recurring Donations').click();
  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Donation for HFI' }).click();

  await page.getByRole('button', { name: 'Recurring donation' }).click();

  await page.getByPlaceholder('0', { exact: true }).fill('55');
  await page.getByPlaceholder('Name').dblclick();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+91 98471-651564');
  await page.getByPlaceholder('City').click();

  await page.getByRole('option', { name: 'Bengaluru Karnataka, India' }).click();
  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('489');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('643');

  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
});