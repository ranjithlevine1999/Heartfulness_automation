const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Experience Mediataion',async({page})=>{ 
try {
    
    //Launching the Browser
    await page.goto('https://heartfulness.org/in-en');
     await takeScreenshot(page, 'Browser launched')

    //Login
       
    // Sign in button
    await page.click('//button[@aria-label="SIGN IN"]');
    await takeScreenshot(page, 'Sign in button clicked')
   
    //sign in with Email
    await page.locator('//button[contains(text(),"Sign in with Email")]').click();
    await takeScreenshot(page, 'Sign in with e-mail clicked')
   
    // Email field
    await page.fill('#email','karadipai@mailinator.com');
    await takeScreenshot(page, 'Given mail has entered')
   
    //Password field
    await page.fill('#password','Test@123');
    await takeScreenshot(page, 'Password has been entered')
   
    //Login button
    await page.locator('//button[contains(text(),"Login")]').click();
    await takeScreenshot(page, 'Login button clicked')
   
    

    //EXPERIENCE MEDITATION
    await page.locator("(//a[text()='EXPERIENCE MEDITATION'])[1]").click()
    await page.waitForTimeout(3000)
     
    // const MEDITATION01= await page.title();
    console.log('11.Heartfulness: Practice');
   
      //Play Audio 1
    await page.locator('#row_relaxation').getByRole('button', { name: 'LISTEN AUDIO' }).click();
    await page.getByLabel('Close').click();
   
    // //Play Video 1
    await page.locator('#row_relaxation section div').nth(3).click();
    await page.frameLocator('iframe[title="Guided Relaxation Heartfulness \\| Guided Meditation \\| Relaxation Heartfulness"]').locator('video').click();
   
    await page.waitForTimeout(1000)

    //Play Video 2
    await page.locator('#row_meditation section div').nth(3).click();
    await page.frameLocator('iframe[title="Heartfulness Meditation Technique \\| Free Guided Meditation \\| Heartfulness"]').locator('video').click();
   
    await page.waitForTimeout(1000)

    //Play Audio 2
    await page.locator('#row_meditation').getByRole('button', { name: 'LISTEN AUDIO' }).click();
    await page.getByLabel('Close').click();

    //Play audio 3
    await page.locator('#row_cleaning').getByRole('button', { name: 'LISTEN AUDIO' }).click();
    await page.getByLabel('Close').click();
   
    await page.waitForTimeout(1000)

    ////Play Video 3
    await page.locator('#row_cleaning section div').nth(3).click();
    await page.frameLocator('iframe[title="How to Cleanse or clean Your Mind and Body\\? - A Guided Heartfulness Cleaning Technique"]').locator('video').click();
   
    await page.waitForTimeout(1000)

    //Play Video 4
    await page.locator('#row_inner-connect section div').nth(3).click();
    await page.frameLocator('iframe[title="Connecting To Source – A 3-Minute Guided Meditation \\| Prayer For Healing \\| Heartfulness"]').locator('video').click();
  
   
    ////Play audio 4
    await page.waitForTimeout(1000)
    await page.locator('#row_inner-connect').getByRole('button', { name: 'LISTEN AUDIO' }).click();
    await page.getByLabel('Close').click();
  
    
    ////Play Video 5
    await page.waitForTimeout(1000)
    await page.locator('#row_explore section div').nth(3).click();
    await page.frameLocator('#widget10').locator('video').click();
   
    ////Play audio 5
    await page.waitForTimeout(1000)
    await page.locator('#row_explore').getByRole('button', { name: 'LISTEN AUDIO' }).click();
    await page.getByLabel('Close').click();

} catch (error) {
    console.log("Error with Practice page", error.message);
}





})