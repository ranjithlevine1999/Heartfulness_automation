const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

test('TinyDrop-> Payment Screen', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.getByRole('button', { name: 'Sign In' }).click();

  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email *').click();
  await page.getByLabel('Email *').fill('karadipai@mailinator.com');
  await page.getByLabel('Password', { exact: true }).click();

  await page.getByLabel('Password', { exact: true }).fill('Test@123');
  
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.locator('div:nth-child(4) > div > .whitespace-nowrap').first().click();
  await page.getByLabel('Until canceled').click();
  await page.getByLabel('Abhyasi ID / Member ID').click();

  await page.getByLabel('Abhyasi ID / Member ID').fill('CVCVCV11');
  await page.getByRole('button', { name: 'Proceed To Donate via UPI (' }).click();
  await page.getByLabel('Abhyasi ID / Member ID').click();
  await page.getByLabel('Abhyasi ID / Member ID').fill('CVCVCV111');

  await page.getByRole('button', { name: 'Proceed To Donate via UPI (' }).click();

  await page.getByRole('button', { name: 'Proceed to Pay without Pancard' }).click();
  await page.goto('https://contributions.staging.heartfulness.org/payment/icici?tracking_id=ZHNfY2xpZW50X2lkfFRELTEzMzF8MTc1MDgzMDgyOHw2aHArNG84RmFXaGpnMmlCb3pjMU1nT1J1WXU2MU9iTEFndy8yRWU1bkRvPQ%3D%3D&success=true&merchantTranId=CRM-0007o9wfv2d8a59v47do&merchantId=611477&subMerchantId=611477&slug=tiny-drop-mighty-ocean&locale=in-en&message=Transaction+Successful&terminalId=5411&client_reference_id=TD-1331&Amount=50.00&refId=EZM2025062511234700204754&SignedQRData=upi%3A%2F%2Fmandate%3Fpa%3Dhearfullness%40icici%26pn%3DHearfullness%26tr%3DEZM2025062511234700204754%26am%3D50.00%26cu%3DINR%26orgid%3D400011%26mc%3D5411%26purpose%3D14%26tn%3DSubscriptionIDTD1331%26validitystart%3D25062025%26validityend%3D27092025%26amrule%3DMAX%26Recur%3DASPRESENTED%26Rev%3DY%26Share%3DY%26Block%3DN%26txnType%3DCREATE%26mode%3D13&ActCode=0');
  await page.getByRole('link', { name: 'Back to Home' }).click();
});