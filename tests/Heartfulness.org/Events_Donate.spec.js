const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Events & Donate', async ({ page, context }) => { 
    test.setTimeout(60000);

    // Element Selectors as Constants
    const selectors = {
              
        // EVENTS page locator
        eventsPageLink: '(//a[@target="_self"])[12]',
        
        // DONATE page locator
        donateLink: '(//a[@target="_blank"])[3]',
        heartfulnessLogoLink: 'a[aria-label="Heartfulness Logo"]'
    };

    try{
        //Launching the Browser
 await page.goto('https://heartfulness.org/in-en');
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

    try {
        // Navigate to EVENTS page
        await page.click(selectors.eventsPageLink);
        await expect(page).toHaveTitle('Events');
        await page.waitForTimeout(3000);
        const eventsH = await page.title();
        console.log("52.", eventsH);
        await page.waitForLoadState();
    } catch (error) {
        console.log("Error with Events page", error.message);
    }

    try {
        // Navigate to DONATE page
       
        await page.getByRole('link', { name: 'DONATE', exact: true }).click();
        const page1 = await page1Promise;

        await sleep(3000);
        await takeScreenshot(page, 'Donate Screen')

        await page1.close();
       
       
        

       
        
    } catch (error) {
        console.log("Error with Donate page", error.message);
    }
});
