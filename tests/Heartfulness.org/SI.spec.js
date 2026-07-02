const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Sl country site', async ({ page }) => {

  await page.goto('https://heartfulness.org/si/');

  await page.getByLabel('VPIŠI SE').click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();


  await page.getByRole('link', { name: 'Izkusite meditacijo' }).first().click();
  await page.locator('#row_relaxation').getByRole('button', { name: 'POSLUŠAJ ZVOK' }).click();
  await page.getByLabel('Close').click();


  await page.locator('[id="Sprostitev\\ \\(relaksacija\\)"] div').nth(3).click();
  await page.locator('#Meditacija div').nth(3).click();
  await page.locator('#row_meditation').getByRole('button', { name: 'POSLUŠAJ ZVOK' }).click();
  await page.getByLabel('Close').click();


  await page.locator('#row_cleaning').getByRole('button', { name: 'POSLUŠAJ ZVOK' }).click();
  await page.getByLabel('Close').click();


  await page.locator('#row_cleaning section div').nth(3).click();
  await page.locator('#row_inner-connect section div').nth(3).click();
  await page.locator('#row_inner-connect').getByRole('button', { name: 'POSLUŠAJ ZVOK' }).click();
  await page.getByLabel('Close').click();


  await page.locator('#row_explore').getByRole('button', { name: 'POSLUŠAJ ZVOK' }).click();
  await page.getByLabel('Close').click();
  await page.getByLabel('Close').click();
  await page.locator('#row_explore section div').nth(3).click();
  await page.locator('#row_explore').getByRole('button', { name: 'POSLUŠAJ ZVOK' }).click();
  await page.getByLabel('Close').click();

  
  await page.getByRole('button', { name: 'Poslušaj zvok', exact: true }).click();
  await page.getByLabel('Close').click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('button', { name: 'Open video player' }).click();
 

  await page.locator('li:nth-child(3) > button').click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('li:nth-child(4) > button').click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('li:nth-child(5) > button').click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('li:nth-child(6) > button').click();
  await page.getByRole('button', { name: 'Open video player' }).click();
  await page.locator('[id="Zakaj\\ prakticirati\\ Heartfulness"] div').nth(3).click();
  await page.getByRole('link', { name: 'remote.webp' }).click();


  await page.locator('iframe[title="Online Meditation"]').contentFrame().getByRole('button', { name: 'Povežite se z inštruktorjem' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'in person meditation 2 1.png' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'Preglej dogodke' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();



  await page.locator('#Video div').nth(3).click();


  await page.getByRole('link', { name: 'Prikaži vse' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'Izkusite meditacijo' }).nth(1).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'Preglejte vse' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'Dogodki' }).click();
  const page1Promise = page.waitForEvent('popup');


  await page.locator('[id="\\32 98"]').getByRole('link', { name: 'Donacije' }).click();
  const page1 = await page1Promise;
});