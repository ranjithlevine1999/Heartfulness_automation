const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')



    try{

    test('Creating the Dorm  ', async ({ page }) => {

      await page.goto(' https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

//await page.locator('#retry-btn').click();


   await page.getByRole('link', { name: 'Master Data ' }).click();
  await page.getByLabel('Add Dorm').click();

  await page.getByLabel('Dorm Name*').click();
  await page.getByLabel('Dorm Name*').fill('East central demo dom');


 
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('Enjoy your stay');
  await page.getByLabel('Amount (INR)*').click();

  await page.getByLabel('Amount (INR)*').fill('500');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow').first().click();
  await page.locator('#react-select-3-option-0').click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-4-option-0').click();

  await page.getByLabel('Save').click();
  await page.getByLabel('Yes').click();
});
    }
catch (error) {
        
        console.log("Error with Element", error.message);
    }


     try{

    test(' Not Creating a Dorm -> Entering all the deatils to create a dorm but tapping on "NO",  ', async ({ page }) => {

     await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  //await page.locator('#retry-btn').click();



   await page.getByRole('link', { name: 'Master Data ' }).click();

        await page.getByLabel('Add Dorm').click();
  await page.getByLabel('Dorm Name*').click();
  await page.getByLabel('Dorm Name*').fill('Demo dorm');
 
  await page.getByLabel('Description').click();
  await page.getByLabel('Description').fill('Enjoy your stay');
 
  await page.getByLabel('Amount (INR)*').click();
  await page.getByLabel('Amount (INR)*').fill('564');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow').first().click();
  await page.locator('#react-select-3-option-0').click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-4-option-0').click();

  await page.getByLabel('Save').click();
 
  await page.getByLabel('No').click();
  await page.getByLabel('Cancel').click();
});
    }
catch (error) {
        
        console.log("Error with Element", error.message);
    }

 try{

test('Accessing the Created Dorm', async ({ page }) => {
 
  await page.goto('https://staging-lodging.aaram.co/login');

  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  //await page.locator('#retry-btn').click();


await page.getByRole('link', { name: 'Master Data ' }).click();
  await page.getByRole('row', { name: 'East central demo dom Enjoy' }).locator('i').first().click();
  await page.getByLabel('Close').click();
  await page.getByRole('row', { name: 'East central demo dom Enjoy' }).locator('i').nth(1).click();

  await page.getByLabel('Save').click();
  await page.getByLabel('Yes').click();
  await page.getByRole('row', { name: 'East central demo dom Enjoy' }).locator('i').nth(2).click();

 
  await page.getByRole('row', { name: 'East central demo dom Enjoy' }).locator('i').nth(3).click();
   
  await page.getByLabel('No').click();
});
    
}
catch (error) {
        
        console.log("Error with Element", error.message);
    }
