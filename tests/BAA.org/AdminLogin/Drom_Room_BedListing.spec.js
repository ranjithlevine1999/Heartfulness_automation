const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')


try{

    test('Listing out the Dorm', async ({ page }) => { 

   
   await page.goto('https://staging-lodging.aaram.co/login');
 
       await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

//await page.locator('#retry-btn').click();


 await page.getByRole('link', { name: 'Master Data ' }).click();

  await page.getByRole('columnheader', { name: 'Dorm Name' }).locator('svg').click();
  await page.locator('.p-dataview-layout-options > button:nth-child(2)').click();
  await page.locator('div').filter({ hasText: /^1010$/ }).getByRole('button').click();
  
  await page.getByLabel('50').click();

  await page.locator('.p-dataview-layout-options > button').first().click();

  await page.getByRole('cell', { name: 'Select... ' }).locator('svg').first().click();
  await page.locator('#react-select-2-option-1').click();

 // await page.getByRole('row', { name: 'option Inactive, selected.' }).locator('svg').first().click();
 // await page.getByText('Active', { exact: true }).click();


    
});

} catch(error) {
        
        console.log("Error with Element", error.message);
    }

    try{

    test('Listing out the Room', async ({ page }) => { 

    await page.goto('https://staging-lodging.aaram.co/login');
 
 
 
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  //  await page.locator('#retry-btn').click();
 
    await page.getByRole('link', { name: 'Master Data ' }).click();

    await page.getByRole('button', { name: 'Room' }).click();
  await page.locator('.css-19bb58m').click();
 // await page.getByText('East central demo dom').click();

  await page.getByText('East central demo dom', { exact: true }).click();

  await page.locator('div').filter({ hasText: /^1010$/ }).getByRole('button').click();
  await page.getByLabel('50').click();

  await page.locator('.p-dataview-layout-options > button:nth-child(2)').click();
  await page.locator('.p-dataview-layout-options > button').first().click();

  await page.locator('.filterElementWrapper > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer > .css-8mmkcg').first().click();
  await page.locator('#react-select-4-option-1').click();

  await page.locator('.filterElementWrapper > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer > .css-8mmkcg').first().click();
  await page.locator('#react-select-5-option-0').click();

    });
}catch(error) {
        
        console.log("Error with Element", error.message);
    }

    try{

    test('Listing out the Bed', async ({ page }) => { 

   await page.goto('https://staging-lodging.aaram.co/login');
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Master Data ' }).click();
  await page.getByRole('button', { name: 'Bed', exact: true }).click();
  await page.locator('#pr_id_5_content_2 svg').click();

  await page.getByText('East central demo dom', { exact: true }).click();
  await page.locator('svg').nth(4).click();
  
  //await page.getByText('East Room').click();

  await page.getByText('East Room 1', { exact: true }).click();
  await page.getByRole('cell', { name: 'Select... ' }).locator('svg').first().click();
  
  await page.getByText('Inactive', { exact: true }).click();
  await page.locator('#pr_id_5_content_2').getByRole('button').nth(2).click();

  await page.locator('#pr_id_5_content_2').getByRole('button').nth(1).click();
  await page.getByRole('button', { name: '' }).click();
  await page.getByTitle('View').click();

  await page.getByLabel('Close').click();

  
    });
}
catch(error) {
        
        console.log("Error with Element", error.message);
    }
