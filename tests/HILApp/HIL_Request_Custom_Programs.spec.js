const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



test('Custom programs', async ({ page }) => {
  try {

await page.goto('https://hil.staging.heartfulness.org/');


  // Handle "Request Custom Program" link that opens in a new tab
const page1Promise = page.waitForEvent('popup');
await page.locator('a').filter({ hasText: /^Request Custom Program$/ }).click();
const page1 = await page1Promise;

// Step 1: Fill personal and organisation details
await page1.getByLabel('Your Name').click();
await page1.getByLabel('Your Name').fill('Test');
await page1.getByLabel('Your Email Address').fill('Test@gmail.com');
await page1.getByLabel('Phone Number').fill('8754896525');
await page1.getByLabel('City & Country').fill('Chennai');
await page1.getByLabel('Organisation Name').fill('Test');
await page1.getByLabel('Your Role/Designation').fill('Tester');
await page1.getByLabel('Year Organisation was').fill('2020');
await page1.getByRole('button', { name: 'Next →' }).click();

// Step 2: Select leadership capacity options
await page1.locator('#leadership_capacity_other').check();
await page1.locator('div').filter({ hasText: /^Develop a roadmap for business restructuring$/ }).click();
await page1.getByLabel('Strengthen decision-making').check();
await page1.getByLabel('Navigate cultural evolution').check();
await page1.getByRole('button', { name: 'Next →' }).click();

// Step 3: Specify additional details
await page1.getByPlaceholder('Please specify').fill('Demo');
await page1.getByRole('button', { name: 'Next →' }).click();

// Step 4: Select organisational challenges
await page1.getByText('Poor delegation and over-').click();
await page1.locator('div').filter({ hasText: /^Interdepartmental friction or lack of trust$/ }).click();
await page1.locator('div').filter({ hasText: /^Lack of succession planning$/ }).click();
await page1.getByLabel('Ineffective meetings and').check();
await page1.getByLabel('Burnout risk in key people').check();
await page1.getByRole('button', { name: 'Next →' }).click();

// Step 5: Company size and final feedback
await page1.getByLabel('Annual Revenue (USD)?').selectOption('$5M – $24M');
await page1.getByLabel('Number of Employees:').selectOption('250 – 749');
await page1.getByLabel('What about HIL resonated with').fill('Test');
await page1.getByRole('button', { name: 'Submit' }).click();


} catch (error) {
    console.error(' Test failed in Organization Page flow:', error);

    // Capture screenshot on failure
    await takeScreenshot(page, 'Organization_Screen Error');

    // Fail the test
    throw error;
  }
});