const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')



    try{

    test('Listing out the Room', async ({ page }) => { 

    await page.goto('https://staging-lodging.aaram.co/login');
 
 
 
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.10@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Master Data ' }).click();
  await page.locator('.css-19bb58m').click();
  await page.locator('#react-select-2-input').fill('East central');
 
  await page.getByText('East central demo dom', { exact: true }).click();
 // await page.locator('.css-1xc3v61-indicatorContainer > .css-8mmkcg > path').first().click();
  await page.locator('th:nth-child(7) > div > .p-fluid > .filterElementWrapper > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
 
  //await page.getByText('Sisters Only').click();
  await page.getByText('Sisters Only', { exact: true }).click();
  await page.getByRole('cell', { name: 'option Sisters Only, selected' }).getByRole('button').click();
  await page.locator('div').filter({ hasText: /^1010$/ }).getByRole('button').click();
  await page.getByLabel('50').click();
  await page.locator('.filterElementWrapper > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer').first().click();
  await page.locator('#react-select-3-option-0').click();


    });
}catch(error) {
        
        console.log("Error with Element", error.message);
    }

    try{

    test('Listing out the Bed', async ({ page }) => { 

   await page.goto('https://staging-lodging.aaram.co/login');
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.10@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();
 await page.getByRole('link', { name: 'Master Data ' }).click();
 // await page.locator('.loader_container').click();
  await page.getByRole('button', { name: 'Bed', exact: true }).click();
  await page.locator('.css-19bb58m').click();
  await page.locator('#react-select-3-input').fill('');

  await page.locator('.css-19bb58m').click();
  await page.locator('#react-select-3-input').fill('east centr');

  await page.getByText('East central demo dom', { exact: true }).click();
  await page.locator('.css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();

  await page.getByText('East Room 1', { exact: true }).click();

  await page.locator('div').filter({ hasText: /^1010$/ }).getByRole('button').click();
  await page.getByLabel('50').click();
  await page.getByTitle('View').first().click();
  
  await page.getByLabel('Close').click();
  await page.locator('.filterElementWrapper > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-5-option-0').click();

  
    });
}
catch(error) {
        
        console.log("Error with Element", error.message);
    }
