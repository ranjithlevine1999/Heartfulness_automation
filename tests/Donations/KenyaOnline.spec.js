const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Online Doantion --> Kenya [Heartfulness Kenya Donations]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*10lhhnj*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg1NzU0Mjckbzk3JGcwJHQxNzQ4NTc1NDI3JGo2MCRsMCRoMA..');
  await page.getByRole('combobox').selectOption('kenya');
  await page.getByRole('button', { name: 'Heartfulness Kenya Donations' }).click();
  await page.getByRole('button', { name: 'Contribute Now - KES' }).first().click();
  await page.getByPlaceholder('0', { exact: true }).fill('25');
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testenv');

  await page.getByPlaceholder('Email Id').click();
  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();
  await page.getByPlaceholder('1 (702) 123-').fill('+254 712 123 456');

  await page.getByPlaceholder('City').click();
  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('s');
  await page.getByText('Secunderabad').click();

  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('54');
  await page.getByPlaceholder('Pincode').click();
  
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('54650');
  await page.getByRole('button', { name: 'Proceed to Pay KES' }).click();
});