import { test, expect } from '@playwright/test';
import { takeScreenshot } from '../../utils/CommonClass';

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//test.use({ timeout: 90000 }); 

test('Whisper - Registration condirmed',async({page})=>{ 
  test.setTimeout(90000);

    try{
        //Launching the Browser
 await page.goto('https://sendy-qa.heartfulness.org/staging-sendy');
 await takeScreenshot(page, 'Browser launched')


//sign in with Email
await page.getByPlaceholder('Email', { exact: true }).click();      

 
        await takeScreenshot(page, 'Sign in with e-mail clicked')

// Email field
       await page.getByPlaceholder('Email', { exact: true }).fill('ranjithkumar.krishnamoorthy@volunteer.heartfulness.org');
        await takeScreenshot(page, 'Given mail has entered')

        //Password field
       await page.getByPlaceholder('Password').click();
    await page.getByPlaceholder('Password').fill('fv23EU62VEhl');
 
        await takeScreenshot(page, 'Password has been entered')
        
        //Login button
  await page.getByRole('button', { name: ' Sign in' }).click();

 await page.waitForTimeout(4000); 


  await takeScreenshot(page, 'Login button clicked')

 
    }
    catch (error) {
        
        console.log("Error with Login", error.message);
    }

    //Dashboard -Home Screen

    try{
         await page.getByRole('link', { name: ' Create & send new campaign' }).click();

  await page.getByPlaceholder('Subject of this email').click();

  //Subject of the mail
  await page.getByPlaceholder('Subject of this email').fill('Registration Confirmed for Retreat Celebration - PNR: {{common_header__pnr}}');

    await page.getByLabel('Source').click(); //Content need to be added

  await page.getByPlaceholder('Plain text version of this').click();
  await page.getByPlaceholder('Plain text version of this').fill('Hi');
 
  await page.getByLabel('Attachments').click();

  await page.getByLabel('Attachments').setInputFiles('assets/message_2000-11-11_08-00_AM.pdf');

  await page.waitForTimeout(4000); 

  await page.getByRole('button', { name: ' Save & next' }).click();

  await page.locator('#email_list').selectOption('34');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });

   await page.getByRole('link', { name: 'Schedule this campaign?' }).click();

  await page.getByLabel('Select a timezone').selectOption('Asia/Kolkata');
 
   await page.getByRole('button', { name: ' Schedule campaign now' }).click();
 

  await page.waitForTimeout(4000); 

 // await page.getByRole('button', { name: ' Send newsletter now!' }).click();


 // await page.waitForTimeout(4000); 

    }
 catch (error) {
    console.log("Error with ", error.message);
}


});