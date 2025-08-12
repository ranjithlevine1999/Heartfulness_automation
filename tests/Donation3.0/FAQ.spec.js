const{test,expect}=require('@playwright/test')
const { takeScreenshot  } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('FAQ', async ({ page }) => {
  await page.goto('https://contributions.staging.heartfulness.org/in-en');
  await page.locator('.max-h-\\[300px\\] > a').first().click();
  await page.getByRole('button', { name: 'Is my donation secure?' }).click();
  await page.getByRole('button', { name: 'Is my donation tax-deductible?' }).click();
  
  await page.getByRole('button', { name: 'Do you accept donations from' }).click();
  await page.getByRole('button', { name: 'How will my donation be used?' }).click();

  await page.getByRole('button', { name: 'Donation Options & Preferences' }).click();
  await page.getByRole('button', { name: 'What types of donations do' }).click();
  await page.getByRole('button', { name: 'Can I donate anonymously?' }).click();

  await page.getByRole('button', { name: 'Can I donate in honor of' }).click();
  await page.getByRole('button', { name: 'What is the minimum/maximum' }).click();
  await page.getByRole('button', { name: 'Will I receive a receipt for' }).click();

  await page.getByRole('button', { name: 'How to Claim Tax Deduction' }).click();

  await page.getByRole('button', { name: 'How to Claim Tax Deduction' }).click();
  await page.getByRole('button', { name: 'Recurring Donations' }).click();

  await page.getByRole('button', { name: 'Can I create multiple' }).click();
  await page.getByRole('button', { name: 'What is the end date for a' }).click();

  await page.getByRole('button', { name: 'Can I change or cancel my' }).click();
  await page.getByRole('button', { name: 'Donation Management & Support' }).click();
  await page.getByRole('button', { name: 'How can I track my donation' }).click();

  await page.getByRole('button', { name: 'What happens if I make an' }).click();
  await page.getByRole('button', { name: 'How can I get a refund for my' }).click();
  await page.getByRole('button', { name: 'Additional Involvement' }).click();
  await page.getByRole('button', { name: 'How can I get involved beyond' }).click();
});