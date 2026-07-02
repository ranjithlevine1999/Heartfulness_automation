const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Contact US', async ({ page }) => {
    try{

  await page.goto('https://hil.staging.heartfulness.org/contact-us');

   await page.getByRole('button', { name: 'Submit' }).click();

  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Test');
 
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('Test@gmail.com');

 
  await page.getByPlaceholder('Phone Number').click();
  await page.getByPlaceholder('Phone Number').fill('8521230252');
  await page.getByPlaceholder('Textarea').click();
  await page.getByPlaceholder('Textarea').fill('Testing');
 
  await page.getByRole('button', { name: 'Submit' }).click();
 // await page.getByRole('button', { name: 'Submit' }).click();


  } catch (error) {
    console.error(' Test failed in ContactUs Page flow:', error);

    // Capture screenshot on failure
    await takeScreenshot(page, 'Contact Page_Error');

    // Fail the test
    throw error;
  }
});