const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')

   try{

    test('Creating a Room', async ({ page }) => {
    
      await page.goto('https://staging-lodging.aaram.co/login');
    await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

//await page.locator('#retry-btn').click();

        await page.getByRole('button', { name: ' Master Data' }).click();
  await page.getByRole('button', { name: 'Room' }).click();
  await page.getByLabel('Add Room').click();

  await page.locator('.form-wrapper > .row > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByText('East central demo dom', { exact: true }).click();
  await page.getByLabel('Room name*').click();
  await page.getByLabel('Room name*').fill('East Room 1');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Yes', { exact: true }).click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('First Floor').click();
  await page.locator('div:nth-child(4) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  //await page.getByText('Metal').click();

  await page.getByText('Metal', { exact: true }).click();
  await page.locator('div:nth-child(5) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow').click();
  await page.locator('#react-select-8-option-0').click();

  await page.locator('div:nth-child(6) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-9-option-0').click();
  await page.getByLabel('% Released').click();

  await page.getByLabel('% Released').fill('3');
  await page.locator('div:nth-child(8) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-10-option-0').click();

  await page.locator('div:nth-child(10) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByText('Active', { exact: true }).click();
  await page.getByLabel('Save').click();
  await page.getByLabel('Yes').click();
    });

   }catch(error) {
        
        console.log("Error with Element", error.message);
    }


    test('Trying to create a Room but tapping on the Cancel', async ({ page }) => { 

        
     await page.goto('https://staging-lodging.aaram.co/login');
    await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

//await page.locator('#retry-btn').click();

 await page.getByRole('button', { name: ' Master Data' }).click();
  await page.getByRole('button', { name: 'Room' }).click();
  await page.getByLabel('Add Room').click();

  await page.locator('.form-wrapper > .row > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByText('East central demo dom', { exact: true }).click();
  await page.getByLabel('Room name*').click();
  await page.getByLabel('Room name*').fill('East Room 1');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Yes', { exact: true }).click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('First Floor').click();
  await page.locator('div:nth-child(4) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  //await page.getByText('Metal').click();

  await page.getByText('Metal', { exact: true }).click();
  await page.locator('div:nth-child(5) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow').click();
  await page.locator('#react-select-8-option-0').click();

  await page.locator('div:nth-child(6) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-9-option-0').click();
  await page.getByLabel('% Released').click();

  await page.getByLabel('% Released').fill('3');
  await page.locator('div:nth-child(8) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.locator('#react-select-10-option-0').click();

  await page.locator('div:nth-child(10) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByText('Active', { exact: true }).click();
  await page.getByLabel('Cancel').click();

    });