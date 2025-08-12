const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')

try{

    test('Creating the Bed  ', async ({ page }) => {
   
       await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('button', { name: ' Master Data' }).click();
  await page.getByRole('button', { name: 'Bed', exact: true }).click();

  await page.getByLabel('Add Bed').click();
  //await page.locator('#pr_id_1_content path').click();

  await page.locator('#react-select-4-input').fill('East central de');
  await page.getByText('East central demo dom', { exact: true }).click();

  await page.getByRole('dialog', { name: 'Add Bed' }).locator('svg').nth(2).click();
 // await page.getByText('East Room').click();

  await page.getByText('East Room 1', { exact: true }).click();
  await page.getByLabel('Bed number*').click();
  await page.getByLabel('Bed number*').fill('54');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Lower', { exact: true }).click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Yes', { exact: true }).click();

  await page.locator('div:nth-child(4) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-8-option-0').click();

  await page.locator('div:nth-child(5) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByText('Active', { exact: true }).click();

  await page.getByLabel('Save').click();

  await page.getByLabel('Yes').click();


});
}

catch (error) {
        
        console.log("Error with Element", error.message);
    }


    try{

    test('Trying to Create the Bed but tapping on cancel ', async ({ page }) => {
   
   
      await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();



  await page.getByRole('button', { name: ' Master Data' }).click();
  await page.getByRole('button', { name: 'Bed', exact: true }).click();

  await page.getByLabel('Add Bed').click();
  //await page.locator('#pr_id_1_content path').click();

  await page.locator('#react-select-4-input').fill('East central de');
  await page.getByText('East central demo dom', { exact: true }).click();

  await page.getByRole('dialog', { name: 'Add Bed' }).locator('svg').nth(2).click();
 // await page.getByText('East Room').click();

  await page.getByText('East Room 1', { exact: true }).click();
  await page.getByLabel('Bed number*').click();
  await page.getByLabel('Bed number*').fill('54');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Lower', { exact: true }).click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Yes', { exact: true }).click();

  await page.locator('div:nth-child(4) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-8-option-0').click();

  await page.locator('div:nth-child(5) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByText('Active', { exact: true }).click();

  await page.getByLabel('Save').click();

  await page.getByLabel('No').click();


});
}

catch (error) {
        
        console.log("Error with Login", error.message);
    }

