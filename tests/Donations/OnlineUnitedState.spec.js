const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


//SRCM

test('Online Doantion --> United State [SRCM]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*1djt65i*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg0MDc4MDckbzkxJGcxJHQxNzQ4NDA3OTMwJGo2MCRsMCRoMA..');
  await page.getByRole('combobox').selectOption('united states');
  await page.getByRole('button', { name: 'SRCM' }).click();
  await page.getByRole('button', { name: 'Contribute Now' }).first().click();
  await page.getByPlaceholder('0', { exact: true }).fill('25');

  await page.getByPlaceholder('Name').click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testing');
  await page.getByPlaceholder('Email Id').click();
  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();
  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 564-54811');

  await page.getByPlaceholder('City').click();
  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('s');
  await page.getByText('Sitapur').click();
  
  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('55');
  await page.getByPlaceholder('Pincode').click();
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('9781');
  await page.getByRole('button', { name: 'Proceed to Pay US' }).click();
});

//SMSF

test('Online Doantion --> United State [SMSF]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*1djt65i*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg0MDc4MDckbzkxJGcxJHQxNzQ4NDA3OTMwJGo2MCRsMCRoMA..');
  await page.getByRole('combobox').selectOption('united states');
  await page.getByRole('button', { name: 'SMSF' }).click();
  await page.getByRole('button', { name: 'Contribute Now' }).first().click();
  await page.getByPlaceholder('0', { exact: true }).fill('55');
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Email Id').click();
  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 574-9875');
  await page.getByPlaceholder('City').click();
  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('s');
  await page.getByText('Sagar').click();
  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('564');
  await page.getByPlaceholder('Pincode').click();
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('9784');
  await page.getByRole('button', { name: 'Proceed to Pay US' }).click();
});

//HI

test('Online Doantion --> United State [HI]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*1djt65i*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg0MDc4MDckbzkxJGcxJHQxNzQ4NDA3OTMwJGo2MCRsMCRoMA..');
  await page.getByRole('combobox').selectOption('united states');
  await page.getByRole('button', { name: 'HI' }).click();

  await page.getByRole('link', { name: 'Contribute' }).click();
  await page.getByRole('button', { name: 'USD 50 - Donate Now' }).click();
  await page.getByPlaceholder('Name').click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testing');

  await page.getByPlaceholder('Email Id').click();
  await page.locator('input[type="email"]').fill('Test@gmail.com');

  await page.getByPlaceholder('1 (702) 123-').click();
  await page.getByPlaceholder('1 (702) 123-').fill('+1 (234) 569-78454');
  await page.getByPlaceholder('City').click();

  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('f');
  await page.getByText('Fatehpur').click();
  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('545');
  await page.getByPlaceholder('Pincode').click();
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('68544');
  await page.getByRole('button', { name: 'Proceed to Pay US' }).click();
});