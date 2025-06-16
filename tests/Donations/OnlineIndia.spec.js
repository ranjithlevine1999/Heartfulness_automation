const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//test.use({ timeout: 90000 }); 


test('Online Doantion --> India [Heartfulness Green]',async({page})=>{ 
 // test.setTimeout(90000);

   //Launching the Browser
await page.goto('https://donations.heartfulness.org/?_gl=1*1msmc3f*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDc4ODU4NDgkbzgzJGcxJHQxNzQ3ODg2NjMwJGozOCRsMCRoMCRkVFI0T1lJc01PMzR1MmVqOFJUNjI3WkJ1N2ZEMG90UDlGUQ..');
await takeScreenshot(page, 'Browser launched')

//Heartfulness Green
await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Heartfulness Green' }).click();
  await page.getByRole('button', { name: 'Contribute Now' }).click();

  await page.getByPlaceholder('0', { exact: true }).fill('25');
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Random');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();


  await page.getByPlaceholder('1 (702) 123-').fill('+91 89654-12356');
  await page.getByPlaceholder('City').click();

  await page.getByText('Chennai').click();

  await page.getByPlaceholder('Door No, Street Address').click();
  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('45');

  await page.getByPlaceholder('Pincode').click();


  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('600022');
  await page.getByRole('button', { name: 'Proceed to Pay' }).click();

  await page.getByRole('button', { name: 'Proceed to Pay 25 without' }).click();
});

// =============================

test('Online Doantion --> India [HELP]',async({page})=>{ 
 // test.setTimeout(90000);

   //Launching the Browser
await page.goto('https://donations.heartfulness.org/?_gl=1*1msmc3f*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDc4ODU4NDgkbzgzJGcxJHQxNzQ3ODg2NjMwJGozOCRsMCRoMCRkVFI0T1lJc01PMzR1MmVqOFJUNjI3WkJ1N2ZEMG90UDlGUQ..');
await takeScreenshot(page, 'Browser launched')

//Help

await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Heartfulness Education Trust' }).click();
  await page.getByRole('button', { name: 'Contribute Now' }).click();
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testing');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');

  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+91 87945-13156');
  await page.getByPlaceholder('City').click();
 
  await page.getByText('Chennai').click();

  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('454');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('98882');
  await page.getByRole('button', { name: 'Proceed to Pay' }).click();

  await page.getByRole('button', { name: 'Proceed to Pay 100 without' }).click();



});


//Adopt A Tree Initiative

test('Online Doantion --> India [Adopt A Tree Initiative]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*ypmzpi*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDc5NzY0MTEkbzg2JGcwJHQxNzQ3OTc2NDExJGo2MCRsMCRoMCRkVFI0T1lJc01PMzR1MmVqOFJUNjI3WkJ1N2ZEMG90UDlGUQ..');
  await page.getByRole('combobox').selectOption('india');
  
  await page.getByRole('button', { name: 'Adopt A Tree Initiative' }).click();
  await page.getByRole('button', { name: 'Contribute Now' }).click();
  await page.getByRole('button', { name: 'Proceed to Pay' }).click();
  await page.getByPlaceholder('0', { exact: true }).click();
  
  await page.getByPlaceholder('0', { exact: true }).fill('12');
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testing Team');
  await page.getByPlaceholder('Email Id').click();
  
  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();
  
  await page.getByPlaceholder('1 (702) 123-').fill('+91 86542-313213');
  await page.getByPlaceholder('City').click();


  await page.getByText('Chennai').click();
  await page.getByPlaceholder('Door No, Street Address').click();
  
  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('87');
  await page.getByPlaceholder('Pincode').click();
  
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('60002');
  await page.getByRole('button', { name: 'Proceed to Pay' }).click();
  await page.getByRole('button', { name: 'Proceed to Pay 12 without' }).click();
});



//Heartfulness Yoga

test('Online Doantion --> India [Heartfulness Yoga]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*ypmzpi*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDc5NzY0MTEkbzg2JGcwJHQxNzQ3OTc2NDExJGo2MCRsMCRoMCRkVFI0T1lJc01PMzR1MmVqOFJUNjI3WkJ1N2ZEMG90UDlGUQ..');
  await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Heartfulness Yoga' }).click();
  
  await page.locator('section').filter({ hasText: 'HEARTFULNESS YOGA ACADEMYDonate here' }).getByRole('button').click();
  await page.getByPlaceholder('0', { exact: true }).fill('25');

  await page.getByPlaceholder('Name').click();
  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testing');
  await page.getByPlaceholder('Email Id').click();
  
  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();

  await page.getByPlaceholder('1 (702) 123-').fill('+91 84541-35564');

  await page.getByPlaceholder('City').click();
 
  await page.getByText('Chennai').click();
  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('875');
  await page.getByPlaceholder('Pincode').click();
 
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('600258');
  await page.getByRole('button', { name: 'Proceed to Pay' }).click();
  await page.getByRole('button', { name: 'Proceed to Pay 25 without' }).click();
});


//Donation for SMSF India - General Fund

test('Online Doantion --> India [Donation for SMSF India - General Fund]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*1qlnml2*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg0MDUzMjgkbzkwJGcwJHQxNzQ4NDA1MzI4JGo2MCRsMCRoMA..');

  await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Donation for SMSF India - General Fund' }).click();

  await page.getByRole('button', { name: 'Contribute Now' }).first().click();
  await page.getByPlaceholder('0', { exact: true }).fill('20');
  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Testing');
  await page.getByPlaceholder('Email Id').click();

  await page.locator('input[type="email"]').fill('Test@gmail.com');
  await page.getByPlaceholder('1 (702) 123-').click();
  await page.getByPlaceholder('1 (702) 123-').fill('+91 78954-62158');

  await page.getByPlaceholder('City').click();

  await page.getByText('Tamil Nadu, India').click();

  await page.locator('.css-11jrvu > .css-vagxaa').click();
  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('56');
  await page.getByPlaceholder('Pincode').click();
  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('6998852');
  await page.getByRole('button', { name: 'Proceed to Pay' }).click();

  await page.getByRole('button', { name: 'Proceed to Pay 20 without' }).click();
});


//Donation for SMSF India - Corpus Fund

test('Online Doantion --> India [Donation for SMSF India - Corpus Fund]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*1djt65i*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg0MDc4MDckbzkxJGcxJHQxNzQ4NDA3OTMwJGo2MCRsMCRoMA..');

  await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Donation for SMSF India - Corpus Fund' }).click();
  await page.getByRole('button', { name: 'Contribute Now' }).click();
  
  await page.getByPlaceholder('0', { exact: true }).fill('22');

  await page.getByPlaceholder('Name').click();

  await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill('Test');
  await page.getByPlaceholder('Email Id').click();
  await page.locator('input[type="email"]').fill('Test@gmail.com');

  await page.getByPlaceholder('1 (702) 123-').click();
  await page.getByPlaceholder('1 (702) 123-').fill('+91 89874-58569');

  await page.getByPlaceholder('City').click();

  await page.getByText('Hyderabad').click();

  await page.getByPlaceholder('Door No, Street Address').click();

  await page.locator('div').filter({ hasText: /^Door No, Street Address$/ }).getByRole('textbox').fill('55');
  await page.getByPlaceholder('Pincode').click();

  await page.locator('div').filter({ hasText: /^Pincode$/ }).getByRole('spinbutton').fill('6555478');
  await page.getByRole('button', { name: 'Proceed to Pay' }).click();
  await page.getByRole('button', { name: 'Proceed to Pay 22 without' }).click();
});