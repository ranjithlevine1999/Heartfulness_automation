 const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')

 try{

    test('Spot Registration without mandatory fields', async ({ page }) => { 

   await page.goto('https://staging-lodging.aaram.co/login');
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: ' Spot Reg' }).click();
  await page.locator('.css-19bb58m').first().click();

  await page.locator('#react-select-2-input').fill('98');
  await page.getByText('98th Birth Anniversary of').click();

  await page.getByLabel('Go').click();
  await page.getByLabel('+ Add New Participant').click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Ranjith');

  await page.locator('input[name="spot_reg_mobile"]').click();
  await page.locator('input[name="spot_reg_mobile"]').fill('+91 89745-62125');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Male', { exact: true }).click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('-35').click();

  await page.locator('.input_city > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByText('India', { exact: true }).click();
  await page.locator('form button').nth(1).click();

  await page.getByRole('cell', { name: '8', exact: true }).click();
  await page.getByLabel('Add Participants').click();

    });
} catch(error) {
        
        console.log("Error with Element", error.message);
    }

    try{

    test('Spot Registration with mandatory fields', async ({ page }) => { 

   await page.goto('https://staging-lodging.aaram.co/login');
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: ' Spot Reg' }).click();
  await page.locator('.css-19bb58m').first().click();

  await page.locator('#react-select-2-input').fill('98');
  await page.getByText('98th Birth Anniversary of').click();

  await page.getByLabel('Go').click();
  await page.getByLabel('+ Add New Participant').click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Ranjith');

  await page.locator('input[name="spot_reg_mobile"]').click();
  await page.locator('input[name="spot_reg_mobile"]').fill('+91 89745-62125');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Male', { exact: true }).click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('-35').click();

  await page.locator('.input_city > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByText('India', { exact: true }).click();
  await page.locator('form button').nth(1).click();

  await page.getByRole('cell', { name: '8', exact: true }).click();
  await page.getByLabel('Add Participants').click();

    });
} catch(error) {
        
        console.log("Error with Element", error.message);
    }