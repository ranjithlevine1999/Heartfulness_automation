const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//test.use({ timeout: 90000 }); 


test('Online Doantion --> India [Heartfulness Green]',async({page})=>{ 
 // test.setTimeout(90000);

   //Launching the Browser
await page.goto('https://donations.heartfulness.org/'); 
await takeScreenshot(page, 'Browser launched')

//Heartfulness Green
await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Heartfulness Green' }).click();
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
  await page.getByTestId('donor-address').click();

  await page.getByTestId('donor-address').fill('56th street');
  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('633258');
  await page.getByTestId('id-type-select').click();

  await page.getByLabel('PAN').click();
  await page.getByTestId('id-number-input').click();

  await page.getByTestId('id-number-input').fill('GGDJT6628H');
  await page.getByTestId('proceed-to-pay-button').click();
});

// =============================

test('Online Doantion --> India [HELP]',async({page})=>{ 
 // test.setTimeout(90000);

   //Launching the Browser
 await page.goto('https://donations.heartfulness.org/'); 
await takeScreenshot(page, 'Browser launched')

//Help

await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Heartfulness Education Trust' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();

  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('522');
  await page.getByTestId('simple-donation-button').click();
  await page.getByTestId('donor-address').click();

  await page.getByTestId('donor-address').fill('65th street');
  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('688895');
  await page.getByTestId('id-type-select').click();

  await page.getByLabel('PAN').click();
  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('HHGTR5678K');
  await page.getByTestId('proceed-to-pay-button').click();

});


//Adopt A Tree Initiative

test('Online Doantion --> India [Adopt A Tree Initiative]', async ({ page }) => {
   await page.goto('https://donations.heartfulness.org/'); 
 
   await page.getByText('Online Donations').click();
  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Adopt A Tree Initiative' }).click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();

  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('button', { name: 'Select List of Trees' }).click();
  await page.getByPlaceholder('Quantity').click();

  await page.getByPlaceholder('Quantity').fill('2');
  await page.getByRole('button', { name: 'Select Package of trees' }).click();
  await page.getByTestId('donor-address').click();

  await page.getByTestId('donor-address').fill('chennai');

  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('600069');

  await page.getByTestId('id-type-select').click();
  await page.getByText('PAN', { exact: true }).click();
  await page.getByTestId('id-number-input').click();

  await page.getByTestId('id-number-input').fill('KKJHT6627j');
  await page.getByTestId('proceed-to-pay-button').click();
   
   
});



//Heartfulness Yoga

test('Online Doantion --> India [Heartfulness Yoga]', async ({ page }) => {
   await page.goto('https://donations.heartfulness.org/'); 
 
    await page.getByRole('combobox').selectOption('india');
  await page.getByRole('button', { name: 'Heartfulness Yoga' }).click();
  await page.getByTestId('amount-input').click();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();

  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');

  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('695');

  await page.getByTestId('simple-donation-button').click();

  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('56th street');

 // await page.getByText('Name *Email *Phone Number *+').click();


  await page.getByTestId('donor-postal-code').click();
  await page.getByTestId('donor-postal-code').fill('699985');
  await page.getByTestId('id-type-select').click();
  await page.getByLabel('PAN').click();

  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('KKJHT4653L');

  await page.getByTestId('proceed-to-pay-button').click();
 
});


//Donation for SMSF India - General Fund

test('Online Doantion --> India [Donation for SMSF India - General Fund]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/'); 
 
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

  await page.getByTestId('amount-input').fill('598');
  await page.getByTestId('simple-donation-button').click();

  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('65th street');
  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('988562');
  await page.getByTestId('id-type-select').click();
  await page.getByLabel('PAN').click();
  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('HHGTR4456K');
  await page.getByTestId('proceed-to-pay-button').click();
});


//Donation for SMSF India - Corpus Fund

test('Online Doantion --> India [Donation for SMSF India - Corpus Fund]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/'); 

  await page.getByRole('combobox').selectOption('india');

  await page.getByRole('button', { name: 'Donation for SMSF India - Corpus Fund' }).click();

  
  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('6000');
  await page.getByTestId('simple-donation-button').click();

  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();


  await page.getByTestId('amount-input').click();
  await page.getByTestId('amount-input').fill('6000');
  await page.getByTestId('simple-donation-button').click();
  
  await page.getByTestId('donor-address').click();
  await page.getByTestId('donor-address').fill('76th street');
  await page.getByTestId('donor-postal-code').click();

  await page.getByTestId('donor-postal-code').fill('622226');
  await page.getByTestId('id-type-select').click();

  await page.getByLabel('PAN').click();
  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('LLKUYT66789');
  await page.getByTestId('proceed-to-pay-button').click();

  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('LLKUYT6678');
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('FFDER66HN8');

  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('MMKJT77HN9');
  await page.getByTestId('proceed-to-pay-button').click();
  await page.getByTestId('id-number-input').click();
  await page.getByTestId('id-number-input').fill('OOPDT6626H');
  await page.getByTestId('proceed-to-pay-button').click();
});
