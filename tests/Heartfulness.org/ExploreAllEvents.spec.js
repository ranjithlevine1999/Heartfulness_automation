const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');

test('Events',async({page,context})=>{ 

    try {

        //Launching the Browser
        await page.goto('https://heartfulness.org/in-en');
        await takeScreenshot(page, 'Browser launched')

     
        // // EventS Home
       await page.getByRole('link', { name: 'Explore all events' }).click();
  await page.getByRole('button', { name: 'Clear Filters' }).click();
  await page.getByLabel('SEARCH').click();

//  const page1Promise = page.waitForEvent('popup');
 // await page.getByRole('img', { name: 'Crest Retreat Bangalore, 5th' }).click();
 // const page1 = await page1Promise;
  await page.locator('.right-arrow').click();
   } catch (error) {
        console.log("Error with Events", error.message);
    }

    try {

         await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
        // Getting Better Sleep
        await page.getByRole('link', { name: 'Heartful Suggestions' }).click();
       // await expect(page).toHaveURL('https://heartfulness.org/in-en/getting-better-sleep');
        
        await takeScreenshot(page, 'Heartful Suggestions')

       // console.log("07.Getting better sleep.");
        await page.waitForTimeout(2000)
        await page.getByText('Back').first().click();

        //await expect(page).toHaveURL('https://heartfulness.org/in-en/heartfulness-blogs');
       // console.log("08.Heartfulness Blogs");
       
        //Home Button
        await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
        await takeScreenshot(page, 'Home')
        await page.waitForLoadState();

    } catch (error) {
        console.log("Error with Heartfulness Blogs", error.message);
    }

   
})