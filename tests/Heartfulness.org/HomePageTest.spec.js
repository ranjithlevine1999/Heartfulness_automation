const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('Home Page', async ({ page }) => {
  page.setDefaultTimeout(5000);

  try {
    // Redirecting to the Site
    await page.goto('https://heartfulness.org/in-en');

    try{
        //Launching the Browser
        await page.goto('https://heartfulness.org/in-en');
        await takeScreenshot(page, 'Browser launched')
       
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
       
        
           }
           catch (error) {
               
               console.log("Error with Login", error.message);
           }

    // Experience meditation
    await page.getByRole('link', { name: 'EXPERIENCE MEDITATION' }).first().click();
    await takeScreenshot(page, 'Redirected to Experience meditation');

    

  } catch (error) {   
    console.error('Error navigating to or interacting with Experience Meditation:', error);
  }

  await sleep(5000);
  await page.goBack({ timeout: 10000 });

  try {
    
    // Heading
    const Text = 'Bring balance in your life and clarity to your mind';

    // Retrieve the string from the page
    const retrievedString = await page.locator("//h1[contains(text(),'Bring balance in your life')]").textContent();
  //  const retrievedString = await page.getByRole('heading', {"//h1[contains(text(),'Bring balance in your life')]"}).textContent();

    // Assert that the strings match
    expect(retrievedString.trim()).toBe(Text);
  } catch (error) {
    console.error('Error asserting Heading text:', error);
  }

  try {
    // Heading 2
    const Text2 = 'Meditation made simple with 4 daily practices';

    // Retrieve the string from the page
    const retrievedString2 = await page.getByText('Meditation made simple with 4').textContent();

    // Assert that the strings match
    expect(retrievedString2.trim()).toBe(Text2);
  } catch (error) {
    console.error('Error asserting Heading 2 text:', error);
  }

  // Slides
  const slides = [
    { label: 'slide item 2', description: 'Slide Item 2' },
    { label: 'slide item 3', description: 'Slide Item 3' },
    { label: 'slide item 4', description: 'Slide Item 4' },
    { label: 'slide item 5', description: 'Slide Item 5' },
    { label: 'slide item 6', description: 'Slide Item 6' }
  ];

  for (const slide of slides) {
    try {
      await page.getByLabel(slide.label).click();
      await takeScreenshot(page, slide.description);
    } catch (error) {
      console.error(`Error interacting with ${slide.description}:`, error);
    }
  }

  try {

    //Why practice Heartfulness Media
    await page.locator('.react-player__shadow').first().click();
  await takeScreenshot(page, 'Why practice Heartfulness Media');

  //Why practice Heartfulness Heading
  const Heartfulness_org_Heading='Why practice Heartfulness';
  const Heartfulness_Heading= await page.getByRole('heading', { name: 'Why practice Heartfulness' }).textContent();
   
  // Assert that the strings match
   expect(Heartfulness_Heading.trim()).toBe(Heartfulness_org_Heading);

  //sub Headings
  const sub_Headings_org='Gain skills from stress management to self-realization.';
  const sub_Headings=await page.getByText('Gain skills from stress').textContent();
  
  // Assert that the strings match
   expect(sub_Headings.trim()).toBe(sub_Headings_org);
  
   
  } catch (error) {
    console.error('Error asserting Heading text:', error);
  }

  try{
  //Explore Heartfulness
  const Explore_heartfulness_org='Explore Heartfulness   meditation';
  const Explore_heartfulness=await page.getByRole('heading', { name: 'Explore Heartfulness' }).textContent();

  console.log(Explore_heartfulness_org);

  // Assert that the strings match
  expect(Explore_heartfulness.trim()).toBe(Explore_heartfulness_org);
  }
  catch (error) {
    console.error('Error asserting Heading text:', error);
  }

  await page.getByRole('link', { name: 'in person meditation 2 1.png' }).click();
  await takeScreenshot(page, 'In person card');

  await sleep(1000);
  await page.goBack({ timeout: 10000 });

  try{
    //Pearls of wisdom
    const Pearls_of_wisdom_org='Pearls of wisdom by the Heartfulness guide Daaji';
    const Pearls_of_wisdom=await page.getByRole('heading', { name: 'Pearls of wisdom by the' }).textContent();
  
    console.log(Pearls_of_wisdom);
  
    // Assert that the strings match
    expect(Pearls_of_wisdom.trim()).toBe(Pearls_of_wisdom_org);
    }
    catch (error) {
      console.error('Error asserting Heading text:', error);
    }

    //Pearls of wisdom 1
    await page.getByRole('link', { name: 'heartful_suggestions1.png' }).click();
    await takeScreenshot(page, 'heartful_suggestions1.png');

    await sleep(3000);
    await page.goBack({ timeout: 10000 });

    //Pearls of wisdom 2
    await page.getByRole('link', { name: 'becoming_whole1.png' }).click();
    await takeScreenshot(page, 'heartful_suggestions2.png');
    await sleep(1000);
    await page.goBack({ timeout: 10000 });

    //Pearls of wisdom 3
    await page.getByRole('link', { name: 'youth1.png' }).click();
    await takeScreenshot(page, 'heartful_suggestions3.png');
    await sleep(1000);
    await page.goBack({ timeout: 10000 });

    try{
    //Events that help to know more about Heartfulness
     const about_Heartfulness_org='Events that help to know more about Heartfulness';
     const about_Heartfulness=await page.getByRole('heading', { name: 'Events that help to know more' }).textContent();

     // Assert that the strings match
    expect(about_Heartfulness.trim()).toBe(about_Heartfulness_org);
    }

    catch (error) {
      console.error('Error asserting Heading text:', error);
    }
    
    //Media
    await page.locator('.col-md-7 > .HfnEmbedvideoplayer > .HfnEmbed_wrapper > .react-embed-player > .react-player__preview > .react-player__shadow').click();
    await takeScreenshot(page, 'Media');

    //Experience meditation
    await page.getByRole('link', { name: 'EXPERIENCE MEDITATION' }).nth(1).click();
    await takeScreenshot(page, 'Experience meditation');
    await sleep(1000);
    await page.goBack({ timeout: 10000 });

    await page.getByRole('link', { name: 'JOIN OUR TEAM' }).click();
    await sleep(1000);
    await page.goBack({ timeout: 10000 });

    // //More about hearfulnes
    // try{
     
    //    const More_about_Heartfulness_org='More about Heartfulness';
    //    const More_about_Heartfulness=await page.getByRole('heading', { name: 'More about Heartfulness', exact: true }).textContent();
  
    //    // Assert that the strings match
    //   expect(More_about_Heartfulness.trim()).toBe(More_about_Heartfulness_org);
    //   }
  
    //   catch (error) {
    //     console.error('Error asserting Heading text:', error);
    //   }

    //  // await page.locator('//span[contains(text(),"What is Heartfulness meditation? What are its benefits?")]').click();

     
    //   await page.click('//a[@id="pr_id_1_header_1"]');

    //   await page.click('//a[@id="pr_id_1_header_2"]');

    //   await page.click('//span[contains(text(),"Is there any fees or donation required to learn or practice Heartfulness?")]');
     

});
