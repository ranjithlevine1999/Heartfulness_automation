const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//SRCM

test('Offline United state -> [SRCM]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Offline modes of Donation').click();

  await page.getByRole('combobox').selectOption('united states');

  await page.getByRole('button', { name: 'SRCM' }).click();
  await page.getByRole('button', { name: 'Proceed to Registration' }).click();
  await page.getByPlaceholder('USD:').click();

  await page.getByRole('spinbutton').fill('55');
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 569-94644');
  await page.getByPlaceholder('City').click();

  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('s');
  await page.getByText('Secunderabad').click();

  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('651');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('6546');
  await page.getByRole('button', { name: 'Confirm the details' }).click();

  await page.getByRole('button', { name: 'Go Back' }).click();
});

//SMSF

test('Offline United state -> [SMSF]', async ({ page }) => {

  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Offline modes of Donation').click();

  await page.getByRole('combobox').selectOption('united states');

  await page.getByRole('button', { name: 'SMSF' }).click();
  await page.getByRole('button', { name: 'Proceed to Registration' }).click();
  await page.locator('.css-vagxaa').first().click();

  await page.getByPlaceholder('USD:').click();
  await page.getByRole('spinbutton').fill('45');
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');

  await page.getByPlaceholder('1 (702) 123-').click();
  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 594-89455');

  await page.getByPlaceholder('City').click();

  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('h');
  await page.getByRole('option', { name: 'Harda Madhya Pradesh, India' }).click();
  await page.locator('.css-ylz44l > div:nth-child(6)').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('546');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('89745');
  await page.getByRole('button', { name: 'Confirm the details' }).click();
});

//HI

test('Offline United state -> [HI]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Offline modes of Donation').click();

  await page.getByRole('combobox').selectOption('united states');


  await page.getByRole('button', { name: 'HI' }).click();
  await page.getByRole('button', { name: 'Proceed to Registration' }).click();
  await page.getByPlaceholder('USD:').click();
  await page.getByRole('spinbutton').fill('454');

  await page.getByPlaceholder('Name').click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Random');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Random@gmail.com');

  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 569-78796');

  await page.getByPlaceholder('City').click();

  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('ca');
  await page.getByText('Cali', { exact: true }).click();

  await page.getByPlaceholder('Street Address').click();

  await page.locator('div').filter({ hasText: /^Street Address$/ }).getByRole('textbox').fill('78');
  await page.getByPlaceholder('Zipcode').click();
  
  await page.locator('div').filter({ hasText: /^Zipcode$/ }).getByRole('textbox').fill('654');
  await page.getByRole('button', { name: 'Confirm the details' }).click();
});