const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')


try{

test('Valid Admin Login', async ({ page }) => {
   await page.goto(' https://staging-lodging.aaram.co/login');
   
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.2@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();
});

}
catch (error) {
        
        console.log("Error with Login", error.message);
    }

    try{
        
test('Invalid Admin Login', async ({ page }) => {
  await page.goto('https://staging-lodging.aaram.co/login');
   await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.@mailinator.cvom');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('test@1234');
  await page.getByRole('button', { name: 'Sign In' }).click();
});
    }
    catch (error) {
        
        console.log("Error with Login", error.message);
    }



    