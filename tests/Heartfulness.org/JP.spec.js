const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Country site for Japan', async ({ page }) => {

  try{
  await page.goto('https://heartfulness.org/jp/');

  await page.getByLabel('サインイン').click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: '瞑想を体験する' }).first().click();
  await page.locator('#row_relaxation').getByRole('button', { name: '音声を聞く' }).click();
  await page.getByLabel('Close').click();

  await page.locator('#row_relaxation section div').nth(3).click();
  await page.locator('#row_meditation section div').nth(3).click();
  await page.locator('#row_meditation').getByRole('button', { name: '音声を聞く' }).click();

  await page.getByLabel('Close').click();

  await page.locator('#row_cleaning').getByRole('button', { name: '音声を聞く' }).click();
  await page.getByLabel('Close').click();
  await page.locator('#row_cleaning section div').nth(3).click();
  await page.locator('#row_inner-connect').getByRole('button', { name: '音声を聞く' }).click();
  await page.getByLabel('Close').click();

  await page.locator('#row_inner-connect section div').nth(3).click();
  await page.locator('#row_explore').getByRole('button', { name: '音声を聞く' }).click();
  await page.getByLabel('Close').click();

  await page.locator('#row_explore section div').nth(3).click();
  await page.locator('#row_prayer').getByRole('button', { name: '音声を聞く' }).click();
  await page.getByLabel('Close').click();

  await page.getByRole('link', { name: 'クリック' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'remote.webp' }).click();

  await page.locator('iframe[title="Online Meditation"]').contentFrame().getByTestId('AddCircleOutlineIcon').locator('path').click();
  await page.locator('iframe[title="Online Meditation"]').contentFrame().getByTestId('RemoveCircleOutlineIcon').locator('path').click();
  await page.locator('iframe[title="Online Meditation"]').contentFrame().getByRole('button', { name: 'Connect with a trainer' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();

  await page.getByRole('link', { name: 'in person meditation 2 1.png' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).dblclick();

  await page.locator('#pr_id_40_header_0').click();
  await page.locator('#pr_id_40_header_1').click();
  await page.locator('#pr_id_40_header_2').click();
  await page.locator('#pr_id_40_header_3').click();

  await page.getByRole('img', { name: 'events.webp' }).click();

 // await page.locator('section div').nth(3).click();

  await page.getByRole('link', { name: '全イベントを表示' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: 'Check all' }).click();
  await page.getByRole('link', { name: 'Heartfulnesss Logo' }).click();
  await page.getByRole('link', { name: '私たちのチームに参加する' }).click();

  await page.getByLabel('提出する').click();

  await page.getByRole('menuitem', { name: 'はじめに' }).click();
  await page.getByRole('menuitem', { name: 'お問い合わせ' }).click();
  await page.getByLabel('提出する').click();

  await page.getByRole('menuitem', { name: 'はじめに' }).click();
  await page.getByRole('menuitem', { name: 'Heartfulnessとは' }).click();
  await page.getByLabel('Go to slide 2').click();

  await page.locator('#row_four-guides').getByRole('listitem').nth(3).click();
  await page.getByLabel('Go to slide 4').click();
  await page.getByRole('menuitem', { name: '体験' }).click();
  await page.getByRole('menuitem', { name: '日々の実践' }).click();

  await page.waitForTimeout(2000); // waits for 2 seconds

  await page.getByRole('menuitem', { name: '体験' }).click();
  await page.getByRole('menuitem', { name: 'オンライン個別体験' }).click();

  await page.waitForTimeout(2000); // waits for 2 seconds

  await page.getByRole('menuitem', { name: '体験' }).click();
  await page.getByRole('menuitem', { name: 'グループセッション' }).click();

 // await page.getByRole('menuitem', { name: '体験' }).dblclick();
await page.waitForTimeout(2000); // waits for 3 seconds



  await page.getByRole('menuitem', { name: '体験' }).click();
  await page.getByRole('menuitem', { name: 'Heartfulness 活動(英)' }).click();


   await page.getByRole('menuitem', { name: 'その他活動' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('menuitem', { name: 'Heartfulness Research (英語)' }).click();
  const page1 = await page1Promise;


 // await page.waitForTimeout(2000); 
  await page1.close();

  await page.getByRole('link', { name: 'イベント' }).click();
  await page.getByRole('link', { name: 'ご寄付' }).click();


} catch (error) {
    console.error('Test failed in JP country Page flow:', error);
    await takeScreenshot(page, 'JP Error');
    throw error;
  }
});
