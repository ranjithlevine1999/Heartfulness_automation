const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Language',async({page})=>{

    test.setTimeout(90000);

    try{
        //Launching the Browser
 await page.goto('https://heartfulness.org/global');
 await takeScreenshot(page, 'Browser launched')

 // Sign in button
 await page.click('//button[@aria-label="SIGN IN"]');
 await takeScreenshot(page, 'Sign in button clicked')

//sign in with Email
        await page.getByRole('link', { name: 'Signin with Email' }).click();
        await takeScreenshot(page, 'Sign in with e-mail clicked')

// Email field
        await page.getByLabel('Email *').fill('karadipai@mailinator.com');
        await takeScreenshot(page, 'Given mail has entered')

        //Password field
        await page.getByLabel('Password', { exact: true }).fill('Test@123');
        await takeScreenshot(page, 'Password has been entered')
        
        //Login button
  await page.getByRole('button', { name: 'Sign In' }).click();
  await takeScreenshot(page, 'Login button clicked')

 
    }
    catch (error) {
        
        console.log("Error with Login", error.message);
    }

                 
           await page.getByRole('link', { name: 'EXPERIENCE MEDITATION' }).first().click();

           await sleep(3000);
           await page.goBack({ timeout: 10000 });
           await sleep(3000); 

            await page.locator('li:nth-child(2) > button').click();
  await page.locator('li:nth-child(3) > button').click();
  await page.locator('li:nth-child(4) > button').click();
  await page.locator('li:nth-child(5) > button').click();
  await page.locator('li:nth-child(6) > button').click();
  
        //    await page.getByLabel('slide item 2').click();
        //    await page.getByLabel('slide item 3').click();
        //    await page.getByLabel('slide item 4').click();
        //    await page.getByLabel('slide item 5').click();
        //    await page.getByLabel('slide item 6').click();

           await page.getByRole('link', { name: 'in person meditation 2 1.png' }).click();
           await page.goto('https://heartfulness.org/global');


           //UK

           await page.getByLabel('[object Object]').click();
           await page.getByRole('menuitem', { name: 'UK FlagUK' }).click();
           await page.getByRole('link', { name: 'EXPERIENCE MEDITATION' }).first().click();

           await sleep(3000);
           await page.goBack({ timeout: 10000 });
           await sleep(3000); 

           
            await page.locator('li:nth-child(2) > button').click();
  await page.locator('li:nth-child(3) > button').click();
  await page.locator('li:nth-child(4) > button').click();
  await page.locator('li:nth-child(5) > button').click();
  await page.locator('li:nth-child(6) > button').click();
           
           await page.getByRole('link', { name: 'in person meditation 2 1.png' }).click();

           await sleep(3000);
           await page.goBack({ timeout: 10000 });
           await sleep(3000); 

           //LV
           await page.getByLabel('[object Object]').click();

           await page.getByRole('menuitem', { name: 'LV FlagLV' }).click();

           await page.getByRole('link', { name: 'Izmēģināt' }).click();

           await sleep(3000);
           await page.goBack({ timeout: 10000 });
           await sleep(3000); 

         ///  await page.getByRole('link', { name: 'in_person_meditation_2_1_0acc4e36c0.png' }).click();

        //    await sleep(3000);
        //    await page.goBack({ timeout: 10000 });
        //    await sleep(3000); 


            //Hindi

            await page.getByLabel('[object Object]').click();
            await page.getByRole('menuitem', { name: 'हिंदी Flagहिंदी' }).click();
          

            await page.getByRole('link', { name: 'ध्यान का अनुभव करें' }).first().click();

            await sleep(3000);
           await page.goBack({ timeout: 10000 });
           await sleep(3000); 

          
            await page.locator('li:nth-child(2) > button').click();
  await page.locator('li:nth-child(3) > button').click();
  await page.locator('li:nth-child(4) > button').click();
  await page.locator('li:nth-child(5) > button').click();
  await page.locator('li:nth-child(6) > button').click();

  await page.getByRole('link', { name: 'in person meditation 2 1.png' }).click();

   //SL

//    await page.getByLabel('[object Object]').click();
//    await page.getByRole('menuitem', { name: 'SI FlagSI' }).click();

//    await page.getByRole('link', { name: 'Izkusite meditacijo' }).first().click();


//    await sleep(3000);
//    await page.goBack({ timeout: 10000 });
//    await sleep(3000); 

//    await page.getByLabel('slide item 2').click();
// await page.getByLabel('slide item 3').click();
// await page.getByLabel('slide item 4').click();
// await page.getByLabel('slide item 5').click();
// await page.getByLabel('slide item 6').click();



 })
