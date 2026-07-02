 const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')

 try{

    test('Spot Registration without mandatory fields', async ({ page }) => { 

   await page.goto('https://staging-lodging.aaram.co/login');
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.10@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: ' Spot Reg' }).click();
  await page.locator('.css-19bb58m').first().click();

  await page.locator('#react-select-2-input').fill('98th');
  await page.getByText('98th Birth Anniversary of').click();


  await page.getByLabel('Go').click();
  await page.getByLabel('+ Add New Participant').click();
  await page.getByLabel('Name*').click();
  await page.getByLabel('Name*').fill('Person001');

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Male', { exact: true }).click();
  await page.locator('.css-t3ipsp-control > .css-1wy0on6 > div:nth-child(3) > .css-8mmkcg').click();
  await page.locator('#react-select-4-option-0').click();

  await page.locator('input[name="spot_reg_mobile"]').click();
  await page.locator('input[name="spot_reg_mobile"]').fill('+91 89564-21578');
  await page.locator('div:nth-child(4) > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
await page.getByText('0-4', { exact: true }).click();

  await page.locator('form').click();

  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test@gmail.com');
  await page.getByLabel('Address').click();
  await page.getByLabel('Address').fill('8th street');
  await page.getByLabel('Pincode').click();
  await page.getByLabel('Pincode').fill('600069');

  await page.locator('input[name="spot_reg_emergency_contact"]').click();
  await page.locator('input[name="spot_reg_emergency_contact"]').fill('+91 89658-96589');
  await page.locator('input[name="spot_reg_preceptor_trainer_contact_no"]').click();
  await page.locator('input[name="spot_reg_preceptor_trainer_contact_no"]').fill('+91 89652-36987');

  await page.locator('form button').nth(1).click();
  await page.locator('.p-datepicker-next').click();
  await page.getByText('30').nth(1).click();
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
  await page.getByLabel('Email *').fill('preceptor.10@mailinator.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: ' Spot Reg' }).click();
  await page.locator('.css-19bb58m').first().click();

  await page.locator('#react-select-2-input').fill('98th');
  await page.getByText('98th Birth Anniversary of').click();
  await page.getByLabel('Go').click();
  await page.getByLabel('+ Add New Participant').click();
  await page.getByLabel('Name*').click();

  await page.getByLabel('Name*').fill('person002');
  await page.locator('input[name="spot_reg_mobile"]').click();
  await page.locator('input[name="spot_reg_mobile"]').fill('+91 87451-23698');
  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('Female').click();

  await page.locator('.fields > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByText('0-4', { exact: true }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('test@gmail.com');
  await page.getByLabel('Address').click();
  await page.getByLabel('Address').fill('no 779');
  await page.getByLabel('Pincode').click();
  await page.getByLabel('Pincode').fill('655589');

  await page.locator('input[name="spot_reg_emergency_contact"]').click();
  await page.locator('input[name="spot_reg_emergency_contact"]').fill('+91 96321-45698');
  await page.locator('input[name="spot_reg_preceptor_trainer_contact_no"]').click();
  await page.locator('input[name="spot_reg_preceptor_trainer_contact_no"]').fill('+91 98745-63215');
  await page.getByLabel('Preceptor / Trainer Name').click();
  await page.getByLabel('Preceptor / Trainer Name').fill('Rj');
  await page.locator('form button').nth(1).click();

  await page.locator('div').filter({ hasText: 'March2026' }).nth(3).click();
  await page.locator('.p-datepicker-next').click();
  await page.getByText('28').click();

  await page.getByLabel('Add Participants').click();
  // await page.locator('.css-t3ipsp-control > .css-hlgwow > .css-19bb58m').click();
  // await page.getByText('Female').click();
  // await page.getByText('Female', { exact: true }).click();
  // await page.getByLabel('Add Participants').click();


    });
} catch(error) {
        
        console.log("Error with Element", error.message);
    }