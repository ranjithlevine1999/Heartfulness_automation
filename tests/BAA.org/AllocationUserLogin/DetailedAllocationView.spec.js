const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('/Users/htcuser/Documents/HFN_Web_Automation/utils/CommonClass.js')


try{

    test('Listing out the Dorm', async ({ page }) => { 

   
   await page.goto('https://staging-lodging.aaram.co/login');
 
       await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();

  await page.getByLabel('Email *').fill('preceptor.15@mailinator.com');

  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('password');
  await page.getByRole('button', { name: 'Sign In' }).click();

await page.getByRole('button', { name: ' Detailed Allocation View' }).click();
  await page.locator('.css-19bb58m').first().click();
  await page.locator('#react-select-2-input').fill('East central dem');

  await page.getByText('East central demo dom', { exact: true }).click();

  await page.locator('.css-1xc3v61-indicatorContainer').first().click();
  await page.getByText('East Room').click();
  await page.locator('svg').nth(4).click();

  //await page.getByText('Ascending').click();

  await page.getByText('Ascending', { exact: true }).click();
  await page.getByRole('button', { name: 'Search' }).click();


  await page.locator('div').filter({ hasText: /^150150$/ }).getByRole('button').click();
  await page.getByLabel('2500').click();
  await page.getByRole('row', { name: 'East central demo dom East Room 1 2 lower Active Vacant - - - - ' }).locator('i').click();
  await page.getByLabel('Close').click();

  await page.getByRole('row', { name: 'East central demo dom East Room 1 54 lower Active Vacant - - - - ' }).locator('i').click();
  await page.getByLabel('Close').click();
  const downloadPromise = page.waitForEvent('download');

  await page.getByRole('button', { name: 'Download Report' }).click();
  const download = await downloadPromise;
  await page.getByRole('button', { name: 'Clear' }).click();

    });
} catch(error) {
        
        console.log("Error with Element", error.message);
    }
    
    
