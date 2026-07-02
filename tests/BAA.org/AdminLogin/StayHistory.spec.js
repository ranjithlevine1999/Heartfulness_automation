 const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')


 try{

    test('Stay History ', async ({ page }) => {

      await page.goto(' https://staging-lodging.aaram.co/login');
      await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

 await page.getByRole('button', { name: ' Stay History' }).click();
  await page.getByPlaceholder('INABCD123').click();

  await page.getByPlaceholder('INABCD123').fill('rakesh@mailinator.com');
  await page.getByLabel('Go').click();
  await page.locator('div').filter({ hasText: /^1010$/ }).getByRole('button').click();
  await page.getByLabel('50').click();

  await page.getByLabel('Clear').click();
    });
    }catch (error) {
        
        console.log("Error with Element", error.message);
    }