const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Insights', async ({ page }) => {
    test.setTimeout(60000);
    try{
        //Launching the Browser
 await page.goto('https://awsstaging.heartfulness.org/in-en/');


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

    
    try{
         await sleep(2000);
        //Insight button
      await page.getByRole('menuitem', { name: 'INSIGHTS New' }).click();

        //Simple Heartfulness
        await page.getByRole('link', { name: 'Simple Heartfulness Practices' }).click();


        await page.getByRole('button', { name: 'Download the PDF Download' }).click();

        await page.goBack({ timeout: 10000 });

       
         
    }catch(error){
        console.log("Error with Insight", error.message);
    }


     
    //Heartfulness Research
    try{
        
        await sleep(2000);
 await page.getByRole('menuitem', { name: 'INSIGHTS New' }).click();
   const page1Promise = page.waitForEvent('popup');
  await page.locator('[id="\\31 1"]').getByRole('link', { name: 'Heartfulness Research' }).click();
  const page1 = await page1Promise;
  page1.close();
         
    }catch(error){
        console.log("Error with Heartfulness Research", error.message);
    }


    //Heartfulness Magazine
  try{
        
     await sleep(2000);
 //  await page.getByRole('menuitem', { name: 'INSIGHTS New' }).click();
  const page2Promise = page.waitForEvent('popup');
  await page.locator('[id="\\31 0"]').getByRole('link', { name: 'Heartfulness Magazine' }).click();
  const page2 = await page2Promise;
   page2.close();
         
    }catch(error){
        console.log("Error with  Heartfulness Magazine", error.message);
    }


//Daaji's messages
  try{
        
     await sleep(2000);
  // await page.getByRole('menuitem', { name: 'INSIGHTS New' }).click();
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Daaji\'s messages' }).click();
  const page3 = await page3Promise;
    page3.close();

         
    }catch(error){
        console.log("Error with  Daaji\'s messages", error.message);
    }





})