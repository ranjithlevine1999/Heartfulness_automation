const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Online Doantion --> Canada [General Donations to Heartfulness Institute]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*10lhhnj*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg1NzU0Mjckbzk3JGcwJHQxNzQ4NTc1NDI3JGo2MCRsMCRoMA..');
  await page.getByRole('combobox').selectOption('canada');
  await page.getByRole('button', { name: 'General Donations to' }).click();
  await page.getByRole('button', { name: 'Contribute Now' }).first().click();
  await page.getByPlaceholder('0', { exact: true }).fill('25');
  await page.getByPlaceholder('Name').click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testing');

  await page.getByPlaceholder('Email Id').click();
  await page.locator('input[type="email"]').fill('Test@gmail.com');

  await page.getByPlaceholder('1 (702) 123-').click();
  await page.getByPlaceholder('1 (702) 123-').fill('+1 (825) 806-9862');
  await page.getByPlaceholder('City').click();

  await page.locator('div').filter({ hasText: /^City$/ }).getByRole('textbox').fill('c');
  await page.locator('#react-autowhatever-1--item-0').getByText('Tamil Nadu, India').click();

  await page.getByPlaceholder('Door No, Street Address').click();
  
  await page.getByPlaceholder('Door No, Street Address').fill('s');
  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('55');
  await page.getByPlaceholder('Pincode').click();
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('980');


  await page.getByRole('button', { name: 'Proceed to Pay CA' }).click();


});