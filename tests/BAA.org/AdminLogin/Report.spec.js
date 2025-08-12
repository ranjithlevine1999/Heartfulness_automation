const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')

try{
 test('Report -->"Report cals summary" ', async ({ page }) => {

    await page.goto(' https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

   
await page.getByRole('button', { name: ' Reports' }).click();

  await page.getByPlaceholder('Search for Event').click();
  await page.getByPlaceholder('Search for Event').fill('98th');


  await page.getByRole('option', { name: '98th Birth Anniversary of' }).click();
  await page.getByLabel('Go').click();

  await page.locator('div').filter({ hasText: /^1010$/ }).getByRole('button').click();
   await page.getByLabel('50').click();

 });


 
} catch(error) {
    console.log("Error with Element", error.message);
}



try{
 test('Report -->"Bed availability report" ', async ({ page }) => {


    await page.goto(' https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

 await page.getByRole('button', { name: ' Reports' }).click();
  await page.getByRole('button', { name: 'Bed Availability Report' }).click();
  
 // await page.locator('div').filter({ hasText: /^Dorm\*Select Dorm\.\.\.$/ }).locator('svg').click();

    await page.locator('.loader_container').click();
  await page.locator('#react-select-5-input').fill('East cent');
  //await page.getByText('East central demo dom').click();
  await page.getByText('East central demo dom', { exact: true }).click();


 // await page.locator('#react-select-8-input').fill('East Central demo');
  //await page.getByText('East central demo dom', { exact: true }).click();
  await page.getByLabel('Search').click();
  await page.getByLabel('Clear').click();

 });
} catch(error) {
    console.log("Error with Element", error.message);
}