const{test,expect}=require('@playwright/test')
const { takeScreenshot } = require('../../utils/CommonClass');



// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

//General Donations to Heartfulness Institute

test('Offline Canada--> [General Donations to Heartfulness Institute]', async ({ page }) => {
  await page.goto('https://donations.heartfulness.org/?_gl=1*loaar4*_ga*MTk5MzE4NzYzLjE3MzQ1MDIxODQ.*_ga_PHDYQ7YDTM*czE3NDg4NDQ2NDgkbzEwMCRnMCR0MTc0ODg0NDY0OCRqNjAkbDAkaDA.');
  await page.getByText('Offline modes of Donation').click();
  await page.getByRole('combobox').selectOption('canada');
  await page.getByRole('button', { name: 'General Donations to' }).click();
});