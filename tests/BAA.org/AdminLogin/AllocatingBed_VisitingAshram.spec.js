const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')

//Search by Name
try{

    test('Allocating Bed --> Visiting Ashram Event "Search by Name" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('button', { name: ' Allocate Bed' }).click();
  await page.locator('svg').nth(2).click();

  await page.getByText('Visiting Ashram', { exact: true }).click();
  await page.locator('svg').nth(3).click();
  await page.getByText('Name', { exact: true }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('rakesh');
  await page.getByLabel('Search').click();
  await page.locator('.allocate-btn > .btn').first().click();
  await page.getByRole('row', { name: ' Orion Vale B00085386 +' }).locator('i').click();
  await page.getByLabel('Close').click();
  await page.getByRole('row', { name: 'Actions Name Abhyasi ID' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: ' Orion Vale B00085386 +' }).getByRole('checkbox').uncheck();

  

    });

}catch(error){
 
    console.log("Error with Element", error.message);

}


//Search by PNR Number

try{

    test('Allocating Bed --> Visiting Ashram Event "Search by PNR Number" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();


await page.getByRole('button', { name: ' Allocate Bed' }).click();
  await page.locator('.css-1xc3v61-indicatorContainer').first().click();
 
  // await page.getByText('Visiting Ashram').click();
  
 await page.getByText('Visiting Ashram', { exact: true }).click();
  await page.getByPlaceholder('XX-XXXX-XXXA,XX-XXXX-XXXB,XX-').click();
  await page.getByPlaceholder('XX-XXXX-XXXA,XX-XXXX-XXXB,XX-').fill(' FR-IKDJ-QRBN__-____-____,__-____-____,__-____-____,__-____-____,__-____-____');
 
  await page.getByLabel('Search').click();
  await page.getByLabel('PNR Summary').click();
  await page.getByRole('row', { name: 'Actions Name Abhyasi ID' }).getByRole('checkbox').check();
 
  await page.getByRole('row', { name: ' Orion Vale B00085386 +' }).getByRole('checkbox').uncheck();
  await page.getByRole('row', { name: ' Orion Vale B00085386 +' }).locator('i').click();
 
  await page.getByLabel('Close').click();
  await page.getByRole('row', { name: ' Susan Kabat INBAAE226 +' }).locator('i').click();
  await page.getByLabel('Close').click();

    });

}catch(error){
 
    console.log("Error with Element", error.message);

}

//Search by Email

try{

    test('Allocating Bed --> Visiting Ashram Event "Search by Email" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();


await page.getByRole('button', { name: ' Allocate Bed' }).click();
  await page.locator('.css-1xc3v61-indicatorContainer').first().click();
  //await page.getByText('Visiting Ashram').click();
  await page.getByText('Visiting Ashram', { exact: true }).click();
  await page.locator('.css-1xc3v61-indicatorContainer').click();
 // await page.getByText('Email').click();
  await page.getByText('Email', { exact: true }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('skabat@mailinator.com');
  await page.getByLabel('Search').click();
  await page.getByLabel('PNR Summary').click();
  await page.getByRole('row', { name: 'Actions Name Abhyasi ID' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: ' Orion Vale B00085386 +' }).getByRole('checkbox').uncheck();
  await page.getByRole('row', { name: ' Orion Vale B00085386 +' }).locator('i').click();
  await page.getByLabel('Close').click();
 // await page.locator('.p-row-odd > td:nth-child(2) > div').click();
  await page.getByRole('row', { name: ' Susan Kabat INBAAE226 +' }).locator('i').click();
  await page.getByLabel('Close').click();
    });

}catch(error){
 
    console.log("Error with Element", error.message);

}



//Search by Mobile Number

try{

    test('Allocating Bed --> Visiting Ashram Event "Search by Mobile number" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();


  await page.getByRole('button', { name: ' Allocate Bed' }).click();
  await page.locator('svg').nth(2).click();
 // await page.getByText('Visiting Ashram').click();

  await page.getByText('Visiting Ashram', { exact: true }).click();
  await page.locator('svg').nth(3).click();
 // await page.getByText('Mobile').click();
  await page.getByText('Mobile', { exact: true }).click();
  await page.getByRole('textbox').click();

  await page.getByRole('textbox').fill('\t +916789067891');
  await page.getByLabel('Search').click();
  await page.locator('.allocate-btn > .btn').first().click();

  await page.getByTitle('View Log').click();
  await page.getByLabel('Close').click();
  await page.getByRole('row', { name: 'Actions Name Abhyasi ID' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: ' Orion Vale B00085386 +' }).getByRole('checkbox').uncheck();


    });

}catch(error){
 
    console.log("Error with Element", error.message);

}

