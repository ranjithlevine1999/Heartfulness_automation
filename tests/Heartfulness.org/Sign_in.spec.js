const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

test('sign in',async({page})=>{ 
    await page.context().clearCookies();

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

 try {
    //My Account
    await page.locator('(//button[@data-pc-name="button"])[2]').click()
    await takeScreenshot(page, 'My Account')

    const pagePromise = context.waitForEvent('page')
    await page.getByText('My Account').click()
    await page.waitForTimeout(2000)

    const myacc = await pagePromise;
    await myacc.waitForLoadState()

    //Retrive title
    await expect(myacc).toHaveTitle("Sign in to Heartfulness")
    const myaccount = await myacc.url();
    console.log("04.", myaccount);
   
    await myacc.waitForTimeout(2000)
   
    await myacc.close()

    await page.waitForTimeout(2000)
    await page.locator('(//button[@data-pc-name="button"])[2]').click()

    await page.waitForTimeout(1000)
    await takeScreenshot(page, 'Account')

    //profile icon
 await page.locator('//img[@alt="user_icon"]').click();
 await takeScreenshot(page, 'Profile Icon')

 //Sign out
 await page.locator('//button[@class="HfnButton uppercase"]').click();
 await takeScreenshot(page, 'Profile Icon')

} catch (error) {
    console.log("Error with My Profile", error.message);
}
 
 
})