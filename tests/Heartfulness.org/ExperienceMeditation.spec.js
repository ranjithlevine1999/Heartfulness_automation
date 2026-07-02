const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Experience Mediataion',async({page,context})=>{ 
try {
    
 
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





    // // //EXPERIENCE MEDITATION
    // await page.locator("(//a[text()='EXPERIENCE MEDITATION'])[1]").click()
    // await page.waitForTimeout(3000)

    const [newPage] = await Promise.all([
  page.waitForEvent('popup'),
  page.locator("(//a[text()='EXPERIENCE MEDITATION'])[1]").click(),

]);

     
await newPage.waitForLoadState('domcontentloaded');
console.log('New tab opened:', await newPage.title());

    // const MEDITATION01= await page.title();
    console.log('11.Heartfulness: Practice');

 

    // Play Audio 1 - Relaxation
await newPage.locator('#row_relaxation').getByRole('button', { name: 'LISTEN AUDIO' }).click();
await newPage.getByLabel('Close').click();
console.log(' Relaxation Audio played and closed');

//  Play Video 1 - Relaxation
await newPage.locator('#row_relaxation section div').nth(3).click();
console.log(' Relaxation Video played');

//  Play Video 2 - Meditation
await newPage.locator('#row_meditation section div').nth(3).click();
console.log(' Meditation Video played');

//  Play Audio 2 - Meditation
await newPage.locator('#row_meditation').getByRole('button', { name: 'LISTEN AUDIO' }).click();
await newPage.getByLabel('Close').click();
console.log(' Meditation Audio played and closed');

// Play Audio 3 - Cleaning
await newPage.locator('#row_cleaning').getByRole('button', { name: 'LISTEN AUDIO' }).click();
await newPage.getByLabel('Close').click();
console.log(' Cleaning Audio played and closed');

//  Play Video 3 - Cleaning
await newPage.locator('#row_cleaning section div').nth(3).click();
console.log(' Cleaning Video played');

// Play Video 4 - Inner Connect
await newPage.locator('#row_inner-connect section div').nth(3).click();
console.log(' Inner Connect Video played');

// Play Audio 4 - Inner Connect
await newPage.locator('#row_inner-connect').getByRole('button', { name: 'LISTEN AUDIO' }).click();
await newPage.getByLabel('Close').click();
console.log(' Inner Connect Audio played and closed');

//  Play Audio 5 - Explore
await newPage.locator('#row_explore').getByRole('button', { name: 'LISTEN AUDIO' }).click();
await newPage.getByLabel('Close').click();
console.log(' Explore Audio played and closed');

//  Play Video 5 - Explore
await newPage.locator('#row_explore section div').nth(3).click();
console.log(' Explore Video played');

//  Extra Listen Audio (Final)
await newPage.getByRole('button', { name: 'Listen Audio', exact: true }).click();
await newPage.getByLabel('Close').click();
console.log(' Final Listen Audio played and closed');

   

} catch (error) {
    console.log("Error with Practice page", error.message);
}


})