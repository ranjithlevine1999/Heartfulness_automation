const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')


try{

    test('Allocating Bed --> Attending Event "Search by Name" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('button', { name: ' Allocate Bed' }).click();
  await page.locator('svg').nth(2).click();
  await page.locator('#react-select-2-option-0').click();
  await page.locator('svg').nth(3).click();

  await page.getByText('Name', { exact: true }).click();
  await page.getByRole('textbox').click();

  await page.getByRole('textbox').fill('rakesh');
  await page.getByLabel('Search').click();
  await page.getByLabel('PNR Summary').first().click();

  await page.locator('th').first().click();
  await page.getByRole('row', { name: 'Actions Name Abhyasi ID' }).getByRole('checkbox').uncheck();
  await page.getByRole('row', { name: '  aadivasi - +919198767878' }).locator('i').nth(1).click();
  await page.getByLabel('Close').click();

  await page.getByTitle('Move to Paid Accommodation').first().click();

  await page.getByLabel('No').click();
  await page.getByLabel('Manual Allocation').click();
  await page.getByLabel('Close').click();

  await page.getByRole('button', { name: 'Modify Preference' }).click();
  await page.getByRole('button', { name: 'Cancel' }).click();


    });

}catch(error){
 
    console.log("Error with Element", error.message);

}

//Search using Email
try{

    test('Allocating Bed --> Attending Event "Search by Email" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

 await page.getByRole('button', { name: ' Allocate Bed' }).dblclick();
await page.locator('svg').nth(3).click();
  
  await page.getByText('Email', { exact: true }).click();

  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('rakeshb1000@mailinator.com');

  await page.getByLabel('Search').click();
  await page.locator('th').first().click();

  await page.getByRole('row', { name: ' Rakesh B B00086768 +' }).getByRole('checkbox').uncheck();
  await page.getByRole('row', { name: ' Rakesh B B00086768 +' }).locator('i').click();

  await page.getByLabel('Close').click();
  await page.getByRole('row', { name: '  Rakesh Bonagiri B00086767' }).locator('i').nth(1).click();
  await page.getByLabel('Close').dblclick();
 


    });

}catch(error){
 
    console.log("Error with Element", error.message);

}



try{

    test('Allocating Bed --> Attending Event "Search by Mobile number" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('button', { name: ' Allocate Bed' }).dblclick();

  await page.locator('div:nth-child(2) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer').click();
  await page.getByText('Mobile', { exact: true }).click();
  await page.getByRole('textbox').click();
 
  await page.getByRole('textbox').fill('+ 919198767878');
  await page.getByLabel('Search').click();
  await page.locator('.allocate-btn > .btn').first().click();
  await page.getByRole('row', { name: 'Actions Name Abhyasi ID' }).getByRole('checkbox').check();

  await page.getByRole('row', { name: ' Ramar - +919898989867 5-9 F' }).getByRole('checkbox').uncheck();
  await page.locator('tr:nth-child(6) > td:nth-child(2) > div').click();

  await page.getByRole('row', { name: '  Aaron Burtonopxvs' }).locator('i').nth(1).click();
  await page.getByLabel('Close').click();
  await page.getByTitle('Move to Paid Accommodation').nth(4).click();
  await page.getByLabel('No').click();
 
    });

}catch(error){
 
    console.log("Error with Element", error.message);

}

//Abhyasi ID Search

try{

    test('Allocating Bed --> Attending Event "Search by Abhyasi ID" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  
await page.getByRole('button', { name: ' Allocate Bed' }).click();
  await page.locator('svg').nth(3).click();
 // await page.getByText('Abhyasi ID').click();
  await page.getByText('Abhyasi ID', { exact: true }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('B00087789');
  await page.getByLabel('Search').click();
  await page.getByRole('row', { name: ' Ramar - +919898989867 5-9 F' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: ' Ramar - +919898989867 5-9 F' }).locator('i').click();
  await page.getByLabel('Close').click();
  await page.getByTitle('Move to Paid Accommodation').nth(4).click();
  await page.getByLabel('No').click();

    });

}catch(error){
 
    console.log("Error with Element", error.message);

}

//PNR Number Search

try{

    test('Allocating Bed --> Attending Event "Search by PNR Number" ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  
await page.getByRole('button', { name: ' Allocate Bed' }).click();
  await page.locator('svg').nth(3).click();
 // await page.getByText('Abhyasi ID').click();
  await page.getByText('Abhyasi ID', { exact: true }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('B00087789');
  await page.getByLabel('Search').click();
  await page.getByRole('row', { name: ' Ramar - +919898989867 5-9 F' }).getByRole('checkbox').check();
  await page.getByRole('row', { name: ' Ramar - +919898989867 5-9 F' }).locator('i').click();
  await page.getByLabel('Close').click();
  await page.getByTitle('Move to Paid Accommodation').nth(4).click();
  await page.getByLabel('No').click();

    });

}catch(error){
 
    console.log("Error with Element", error.message);

}


