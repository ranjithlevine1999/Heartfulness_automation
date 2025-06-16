const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Insights', async ({ page }) => {
    test.setTimeout(60000);
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

    
    try{
        //Insight button
        await page.getByRole('menuitem', { name: 'INSIGHTS' }).click();

        //Simple Heartfulness
        await page.getByRole('menuitem', { name: 'Simple Heartfulness Practices' }).click();

        await page.getByLabel('DOWNLOAD').click();
        await page.goBack({ timeout: 10000 });

       
         
    }catch(error){
        console.log("Error with Insight", error.message);
    }

    //Heartfulness Research
try{
    await page.getByRole('menuitem', { name: 'INSIGHTS' }).click();
    const page1Promise = page.waitForEvent('popup');

    await page.getByRole('menuitem', { name: 'Heartfulness Research' }).click();
    const page1 = await page1Promise;
      
    const pageTitle = await page.title();
    console.log(pageTitle);

    await page1.close();
}
catch (error){

        console.log("Error with Heartfulness Research", error.message);

    }
    //Heartfulness Magazine

    try{
        await page.getByRole('menuitem', { name: 'INSIGHTS' }).click();
       

        await sleep(3000);

        await page.getByRole('menuitem', { name: 'Heartfulness Magazine' }).click();

      const Magazine = await page.title();
      console.log(Magazine);
          

         // await takeScreenshot(page, 'Got redirected to Heartfulness magazine')
        
          await page.close();

    }
    catch (error){

        console.log("Error with Heartfulness magazine", error.message);

    }

     //Bhandara Message

     try{
        await page.getByRole('menuitem', { name: 'INSIGHTS' }).click();  

        await sleep(3000);

        await page.getByRole('link', { name: 'Bhandara Messages' }).click();
     
          await takeScreenshot(page, 'Got redirected to Heartfulness magazine')
        
           }
    catch (error){

        console.log("Error with Bhandara message", error.message);

    }

})