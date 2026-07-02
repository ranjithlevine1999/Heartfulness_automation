const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('SG country site', async ({ page }) => {
  test.setTimeout(60000);
      try{

  await page.goto('https://heartfulness.org/sg/');

  await page.getByLabel('SIGN IN').click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'EXPERIENCE MEDITATION' }).first().click();
  await page.locator('#row_relaxation').getByRole('button', { name: 'LISTEN AUDIO' }).click();

  await page.getByLabel('Close').click();

  await page.locator('#row_relaxation section div').nth(3).click();
  await page.locator('#row_meditation section div').nth(3).click();
  await page.locator('#row_meditation').getByRole('button', { name: 'LISTEN AUDIO' }).click();

  await page.getByLabel('Close').click();
  await page.locator('#row_cleaning').getByRole('button', { name: 'LISTEN AUDIO' }).click();
  await page.getByLabel('Close').click();

  await page.locator('#row_cleaning section div').nth(3).click();
  await page.locator('#row_inner-connect section div').nth(3).click();
  await page.locator('#row_inner-connect').getByRole('button', { name: 'LISTEN AUDIO' }).click();
  await page.getByLabel('Close').click();
  await page.locator('#row_explore').getByRole('button', { name: 'LISTEN AUDIO' }).click();
  await page.getByLabel('Close').click();


  await page.locator('#row_explore section div').nth(3).click();
  await page.getByRole('button', { name: 'Listen Audio', exact: true }).click();
  await page.getByLabel('Close').click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.locator('.react-multi-carousel-dot > button').first().click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('li:nth-child(2) > button').click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('li:nth-child(3) > button').click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('.react-multi-carousel-dot-list > li:nth-child(4)').click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('.react-multi-carousel-dot-list > li:nth-child(5)').click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('li:nth-child(6) > button').click();


  await page.getByRole('button', { name: 'Open video player' }).click();

  await page.locator('.react-player__shadow').first().click();
  await page.getByRole('link', { name: 'remote.webp' }).click();


  await page.locator('iframe[title="Online Meditation"]').contentFrame().getByTestId('AddCircleOutlineIcon').locator('path').click();
  await page.locator('iframe[title="Online Meditation"]').contentFrame().getByRole('button', { name: 'Connect with a trainer' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();


  await page.getByRole('link', { name: 'in person meditation 2 1.png' }).click();
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.locator('.col-md-7 > .HfnEmbedvideoplayer > .HfnEmbed_wrapper > .react-embed-player > .react-player__preview > .react-player__shadow').click();
  await page.getByRole('link', { name: 'Explore all events' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'View All' }).click();


  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'EXPERIENCE MEDITATION' }).nth(1).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'JOIN OUR TEAM' }).click();
  await page.getByLabel('SUBMIT').click();


  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();


  await page.locator('#pr_id_44_header_0').click();
  await page.locator('#pr_id_44_header_1').click();
  await page.locator('#pr_id_44_header_2').click();
  await page.locator('#pr_id_44_header_3').click();


//   await page.getByRole('menuitem', { name: 'EXPLORE' }).click();
//   await page.getByRole('link', { name: 'Individual Practice' }).click();
//   await page.getByRole('menuitem', { name: 'EXPLORE' }).click();
//   await page.getByRole('link', { name: 'Personal Trainer' }).click();
//   await page.getByRole('menuitem', { name: 'EXPLORE' }).click();
//   await page.getByRole('link', { name: 'Group Sessions' }).click();


//    await page.waitForTimeout(2000); 


//   await page.getByRole('menuitem', { name: 'EXPLORE' }).click();
//    await page.waitForTimeout(2000); 
//    await page.locator('#317').click();
//  // await page.getByRole('link', { name: 'Our Journey So Far' }).click();



  await page.getByRole('menuitem', { name: 'EVENTS' }).click();
  await page.getByRole('link', { name: 'What\'s Next' }).click();


  await page.getByRole('menuitem', { name: 'FIND US' }).click();
  await page.getByRole('link', { name: 'Contact us' }).click();
  await page.getByRole('menuitem', { name: 'FIND US' }).click();
  await page.getByRole('link', { name: 'Singapore Heartfulness Center' }).click();
  
  await page.waitForTimeout(2000); 
  await page.getByRole('menuitem', { name: 'FIND US' }).click();
  await page.getByRole('link', { name: 'Meditation Timings & Locations' }).click();


  await page.getByRole('menuitem', { name: 'ABOUT' }).click();
  await page.getByRole('link', { name: 'Who we are' }).click();


  await page.getByLabel('Go to slide 2').click();
  await page.getByLabel('Go to slide 3').click();
  await page.getByLabel('Go to slide 4').click();


  await page.getByRole('menuitem', { name: 'EXPLORE' }).click();
  await page.getByRole('menuitem', { name: 'INSIGHTS' }).click();
   
      }
  catch (error) {
    console.error('Test failed in SG country Page flow:', error);
    await takeScreenshot(page, 'SG Error');
    throw error;
  }
});