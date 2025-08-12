 const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')


 
try{
 
 test('View Allocation', async ({ page }) => {

     await page.goto('https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();


 await page.getByRole('button', { name: ' View Allocation' }).click();
  await page.getByPlaceholder('PNR').click();
  await page.getByPlaceholder('PNR').fill('SA-IKHW-LZLI');
  await page.getByLabel('Search').click();

  //await page.getByText('Shayne Haithcock').first().click();
  await page.locator('div').filter({ hasText: /^Dorm\*Select\.\.\.$/ }).locator('svg').click();
  await page.locator('#react-select-2-input').fill('Test');

  await page.getByText('Test', { exact: true }).click();
  await page.locator('.col-lg-3 > .hfn_input > .hfn_select_field > .css-13cymwt-control > .css-1wy0on6 > .css-1xc3v61-indicatorContainer > .css-8mmkcg').click();
  await page.getByText('T02', { exact: true }).click();

  //await page.locator('.css-15lsz6c-indicatorContainer > .css-8mmkcg > path').click();
  await page.getByLabel('Reset Room Filter').click();

  await page.getByLabel('Clear').click();


 });

}catch (error) {
     
     console.log("Error with Element", error.message);
 }
