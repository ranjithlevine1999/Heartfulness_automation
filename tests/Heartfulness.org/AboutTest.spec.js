const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//test.use({ timeout: 90000 }); 


test('About',async({page})=>{ 
  test.setTimeout(90000);

  
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
            // Who we are
            await page.locator('(//a[@target="_self"])[1]').click();
            await page.locator('(//a[@target="_self"])[1]').hover();
            
            await page.waitForTimeout(2000)


            await page.locator('(//a[@target="_self"])[2]').click();
            await takeScreenshot(page, 'Who are we')

            await expect(page).toHaveTitle('Heartfulness: About Heartfulness');
                     await page.waitForTimeout(2000)
            const Whoweare = await page.title();
            console.log("21.", Whoweare);
    
             await page.click('//label[@class="toggle_btn"]');
            await page.locator("(//a[text()='Read More'])[3]").click();

            await takeScreenshot(page, 'page 1')

                await expect(page).toHaveTitle('lalaji');
            await page.waitForTimeout(2000)
                 const lalaji = await page.title();
            console.log("22.", lalaji);

            await takeScreenshot(page, 'Page 2')
            
            await page.locator("//span[text()='Next']").click();
            await expect(page).toHaveTitle('babuji');
            await page.waitForTimeout(2000)
            
            const babuji = await page.title();
            
            
            console.log("23.", babuji);
            await page.locator("//span[text()='Next']").click();
            
            await takeScreenshot(page, 'Page 3')
            

            await expect(page).toHaveTitle('chariji');
                        await page.waitForTimeout(2000)
            const chariji = await page.title();
                        console.log("24.", chariji);
            await page.waitForTimeout(2000)
                             
            
            await page.locator("//span[text()='Next']").click();


            await takeScreenshot(page, 'Page 4')
            

            await expect(page).toHaveTitle('kamlesh-d-patel');
            await page.waitForTimeout(2000)
                    const kamlesh = await page.title();
                                console.log("25.", kamlesh);


            await page.waitForTimeout(2000)
            await page.locator("//span[text()='Back']").click();
            
            await page.waitForTimeout(2000)
    
        } catch (error) {
            console.log("Error in Who we are header", error.message);
        }
    

        //Connect with us
        try {
    
            
            await page.getByRole('menuitem', { name: 'ABOUT' }).click();

            await sleep(2000);

            //await page.getByRole('link', { name: 'Connect with us' }).click();
            await page.getByRole('menuitem', { name: 'Connect with us' }).click();


            await takeScreenshot(page, 'Connect with us')

            await expect(page).toHaveTitle('Heartfulness: Connect with us');
            
            await sleep(2000);
           
            const connectwithus = await page.title();
            console.log("26.", connectwithus);

            // await page.getByLabel('SUBMIT').click();
            // await sleep(2000);

            await page.getByRole('tab', { name: 'Technical' }).click();

            await sleep(2000);

           // await page.getByLabel('SUBMIT').click();
    
        } catch (error) {
            console.log("Error in Connect with us page redirection", error.message);
        }

})