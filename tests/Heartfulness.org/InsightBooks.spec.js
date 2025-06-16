const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Insights', async ({ page }) => {
    test.setTimeout(60000);

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
        await page.getByRole('menuitem', { name: 'INSIGHTS New' }).click();
        await page.getByRole('menuitem', { name: 'Books New' }).click();

        const bookLinks = [
            'The Power of Paradox New',
            'Designing Destiny',
            'Wisdom Bridge',
            'Spiritual Anatomy',
            'The Heartfulness Way'
        ];

        for (const book of bookLinks) {
            try {
                const pagePromise = page.waitForEvent('popup');
                await page.getByRole('link', { name: book }).click();
                const newPage = await pagePromise;

                await sleep(3000);
                await newPage.close();
                await sleep(3000);
            } catch (popupError) {
                console.log(`Error handling popup for ${book}:`, popupError.message);
            }
        }

    } catch (navigationError) {
        console.log("Error during navigation:", navigationError.message);
    }
});

