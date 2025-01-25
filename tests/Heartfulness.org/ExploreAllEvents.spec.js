const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

test('Events',async({page})=>{ 

    try {

        //Launching the Browser
        await page.goto('https://heartfulness.org/in-en');
        await takeScreenshot(page, 'Browser launched')

     
        // EventS Home
        const pagePromise2 = context.waitForEvent('page')
        await page.locator("(//i[@class='pi pi-arrow-up-right'])[1]").hover();
      
        await page.waitForTimeout(1000)
        await page.locator("(//i[@class='pi pi-arrow-up-right'])[1]").click();
      
        await takeScreenshot(page, 'EventsHome')


        const EventS = await pagePromise2;
        await EventS.waitForLoadState()
        await expect(EventS).toHaveTitle("Heartfulness Event Registration - Heartfulness.org")
        const EventSs = await EventS.title();
        
        console.log("06.", EventSs);
        
        await EventS.waitForTimeout(3000)
        await EventS.close()
    } catch (error) {
        console.log("Error with Events", error.message);
    }
   
    //    // Assert that the strings match
    //   expect(More_about_Heartfulness.trim()).toBe(More_about_Heartfulness_org);
    //   }
  
    //   catch (error) {
    //     console.error('Error asserting Heading text:', error);
    //   }

    //  // await page.locator('//span[contains(text(),"What is Heartfulness meditation? What are its benefits?")]').click();

     

    try {
        // Getting Better Sleep
        await page.locator("(//i[@class='pi pi-arrow-up-right'])[2]").click();
        await expect(page).toHaveURL('https://heartfulness.org/in-en/getting-better-sleep');
        
        await takeScreenshot(page, 'Getting better sleep')

        console.log("07.Getting better sleep.");
        await page.waitForTimeout(2000)
        await page.getByText('Back').first().click();

        await expect(page).toHaveURL('https://heartfulness.org/in-en/heartfulness-blogs');
        console.log("08.Heartfulness Blogs");
       
        //Home Button
        await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
        await takeScreenshot(page, 'Home')
        await page.waitForLoadState();

    } catch (error) {
        console.log("Error with Heartfulness Blogs", error.message);
    }

    try {
       
        // Thought
        await page.waitForLoadState()
        await page.waitForTimeout(3000)
        await page.locator("(//i[@class='pi pi-arrow-up-right'])[3]").click();
        
        await takeScreenshot(page, 'Thoughts')

        await expect(page).toHaveURL('https://heartfulness.org/in-en/subscribe-to-one-beautiful-thought');
        console.log('09.one-beautiful-thought | Heartfulness');

        // Form
        await page.locator("//span[text()='SUBSCRIBE']").click();

        await takeScreenshot(page, 'Action performed in Subscribe button')

        await page.locator('input[name="fname"]').fill('Test');
        await page.locator('input[name="lname"]').fill('Qa');
        await page.locator('input[name="from"]').fill('karadipai@mailinator.com');
       
        await page.locator('div').filter({ hasText: /^empty$/ }).nth(1).click();
     
        await page.getByLabel('English').click();
        await page.locator('.p-checkbox-box').click();

        await takeScreenshot(page, 'Completion of Form')

        await page.waitForTimeout(2000)

    } catch (error) {
        console.log("Error with OBT subscription", error.message);
    }
})