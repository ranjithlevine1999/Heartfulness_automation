const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//HI

test('United state Recurring -->[HI]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Recurring Donations').click();
  await page.getByRole('combobox').selectOption('united states');
  await page.getByRole('button', { name: 'HI' }).click();

  await page.locator('.css-1b3gm99 > div > div > div').click();
  await page.getByPlaceholder('0', { exact: true }).fill('45');
  await page.getByPlaceholder('Name', { exact: true }).click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Last Name').click();
  await page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox').fill('Test@gmail.com');


  await page.getByPlaceholder('Email Id').click();
  await page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox').press('ControlOrMeta+a');

  await page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox').press('ControlOrMeta+c');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');

  await page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox').click();
  await page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 569-84745');
  await page.getByPlaceholder('City').click();

  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('ch');
  await page.locator('#react-autowhatever-1--item-0').getByText('Tamil Nadu, India').click();
  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('47');
  await page.getByPlaceholder('Pincode').click();
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('56');
  await page.getByRole('button', { name: 'Proceed' }).click();
});

//SRCM

test('United state Recurring -->[SRCM]', async ({ page }) => {

  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Recurring Donations').click();
  await page.getByRole('combobox').selectOption('united states');

  await page.getByRole('button', { name: 'SRCM' }).click();

  await page.getByRole('button', { name: 'Donate Now' }).first().click();
  await page.getByPlaceholder('0', { exact: true }).fill('56');

  await page.getByPlaceholder('Name', { exact: true }).click();


  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');


  await page.getByPlaceholder('Last Name').click();
  await page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox').fill('te');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');

  await page.getByPlaceholder('1 (702) 123-').click();
  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 569-7984c');

  await page.getByPlaceholder('City').click();


  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('c');
  await page.locator('#react-autowhatever-1--item-0').getByText('Tamil Nadu, India').click();

  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('6');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('65');
  await page.getByRole('button', { name: 'Proceed' }).click();
});

//SMSF


test('United state Recurring -->[SMSF]', async ({ page }) => {

  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Recurring Donations').click();

  await page.getByRole('combobox').selectOption('united states');

  await page.getByRole('button', { name: 'SMSF' }).click();


  await page.getByRole('button', { name: 'Donate Now' }).first().click();

  await page.getByPlaceholder('0', { exact: true }).fill('64');
  await page.getByPlaceholder('Name', { exact: true }).click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');

  await page.getByPlaceholder('Last Name').click();
  await page.locator('div').filter({ hasText: /^Last Name$/ }).getByRole('textbox').fill('sad');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');

  await page.getByPlaceholder('1 (702) 123-').click();
  
  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 654-65493');
  await page.getByPlaceholder('City').click();


  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('sda');
  await page.getByText('Sdau Kaong').click();

  await page.getByPlaceholder('Street Address').click();

  await page.locator('div').filter({ hasText: /^Street Address$/ }).getByRole('textbox').fill('54');
  await page.getByPlaceholder('Zipcode').click();

  await page.locator('div').filter({ hasText: /^Zipcode$/ }).getByRole('textbox').fill('651');
  await page.getByRole('button', { name: 'Proceed' }).click();
});
