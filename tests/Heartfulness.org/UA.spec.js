const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('UA country site', async ({ page }) => {

  await page.goto('https://heartfulness.org/ua/');

  await page.getByLabel('УВІЙТИ').click();

  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'СПРОБУВАТИ МЕДИТАЦІЮ' }).click();
  await page.locator('#row_relaxation').getByRole('button', { name: 'СЛУХАТИ АУДІО' }).click();
  await page.getByLabel('Close').click();


  await page.locator('#row_relaxation section div').nth(3).click();
  await page.locator('#row_meditation section div').nth(3).click();


  await page.locator('#row_meditation').getByRole('button', { name: 'СЛУХАТИ АУДІО' }).click();
  await page.getByLabel('Close').click();
  await page.locator('#row_cleaning').getByRole('button', { name: 'СЛУХАТИ АУДІО' }).click();
  await page.getByLabel('Close').click();
  await page.locator('#row_cleaning section div').nth(3).click();
  await page.locator('#row_inner-connect section div').nth(3).click();
  await page.locator('#row_inner-connect').getByRole('button', { name: 'СЛУХАТИ АУДІО' }).click();
  await page.getByLabel('Close').click();


  await page.getByRole('button', { name: 'Слухати аудіо', exact: true }).click();
  await page.getByLabel('Close').click();


  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.locator('.react-player__shadow').first().click();
  await page.locator('[id="Діпак\\ Чопра\\ про\\ книгу\\ \\"Духовна\\ Анатомія\\""] div').nth(3).click();
  await page.getByRole('link', { name: '20231016_AJY_6124_5afa899fe5.' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'remote.webp' }).click();


  await page.waitForTimeout(2000); 
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Переглянути 1й майстер-клас' }).click();
  const page1 = await page1Promise;
  await page1.close();

  await page.waitForTimeout(2000); 
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Переглянути 2й майстер-клас' }).click();
  const page2 = await page2Promise;
   await page2.close();
   
  await page.waitForTimeout(2000); 

  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Переглянути 3й майстер-клас' }).click();
  const page3 = await page3Promise;
   await page3.close();


  await page.waitForTimeout(2000); 


  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'UA_ukr_meditating_14a37fec83.' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'Переглянути всі' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'СПРОБУВАТИ НА ВЛАСНОМУ ДОСВІДІ' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'ПРИЄДНУЙСЯ ДО НАШОЇ КОМАНДИ' }).click();


  await page.getByLabel('SUBMIT').click();


  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.locator('#pr_id_26_header_0').click();
  await page.locator('#pr_id_26_header_1').click();
  await page.locator('#pr_id_26_header_2').click();
  await page.getByRole('link', { name: 'БІЛЬШЕ ЗАПИТАНЬ' }).click();
});