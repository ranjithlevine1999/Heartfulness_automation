const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Insights', async ({ page }) => {
    test.setTimeout(60000);
    try {
    
        //Launching the Browser
        await page.goto('https://heartfulness.org/global');
             
        //Login
           
        // Sign in button
        await page.click('//button[@aria-label="SIGN IN"]');
             
        //sign in with Email
        await page.locator('//button[contains(text(),"Sign in with Email")]').click();
              
        // Email field
        await page.fill('#email','karadipai@mailinator.com');
               
        //Password field
        await page.fill('#password','Test@123');
               
        //Login button
        await page.locator('//button[contains(text(),"Login")]').click();
           }
    catch (error) {
            
        console.log("Error with Login", error.message);
    }
    
    try{
        //Insight button
        await page.getByRole('menuitem', { name: 'INSIGHTS' }).click();

        //Simple Heartfulness
        await page.getByRole('link', { name: 'Simple Heartfulness Practices' }).click();

        await page.getByLabel('DOWNLOAD').click();

        await sleep(5000);
    await page.locator('[id="Simple\\ Heartfulness\\ Practice\\ –\\ Relaxation"] div').nth(3).click();
    await takeScreenshot(page, 'Video - 1')
     
    await sleep(5000);
    await page.locator('[id="Simple\\ Heartfulness\\ Practice\\ –\\ Meditation"] div').nth(3).click();
       
    
    await sleep(5000);
    await page.locator('[id="Simple\\ Heartfulness\\ Practice\\ –\\ Cleaning"] div').nth(3).click();
       
    
    await page.locator('[id="Simple\\ Heartfulness\\ Practice\\ –\\ Inner\\ Connect"] div').nth(3).click();
    await takeScreenshot(page, 'Video - 4')
         
    }catch{
        console.log("Error with Insight", error.message);
    }

    //Heartfulness Research
try{
    await page.getByRole('menuitem', { name: 'INSIGHTS' }).click();
    const page1Promise = page.waitForEvent('popup');

    await page.locator('[id="\\31 1"]').getByRole('link', { name: 'Heartfulness Research' }).click();
    const page1 = await page1Promise;
      
    const pageTitle = await page.title();
    console.log(pageTitle);

    await page.close();
}
catch (error){

        console.log("Error with Heartfulness Research", error.message);

    }
    //Heartfulness Magazine

    try{
        await page.getByRole('menuitem', { name: 'INSIGHTS' }).click();
       

        await sleep(3000);

      await page.locator('[id="\\31 0"]').getByRole('link', { name: 'Heartfulness Magazine' }).click()

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