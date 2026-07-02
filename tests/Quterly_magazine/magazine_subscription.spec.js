const { test, expect } = require('@playwright/test');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const SUBSCRIBE_URL = 'https://qtlymag-awsstaging.heartfulness.org/subscribe/';

const testData = {
  firstName: 'Test',
  lastName: 'QA',
  mobile: '8745236985',
  addressLine1: '3245',
  addressLine2: 'chennai',
  city: 'chennai',
  state: 'tamil',
  stateOption: 'Tamil Nadu',
  postalCode: '688829',
  email: 'Test@gmail.com',
  quantities: {
    'English & Hindi (₨ 400)': '2',
    'Telugu (₨ 350)': '4',
    'Tamil (₨ 350)': '1',
    'Malayalam (₨ 350)': '3',
    'Gujrathi (₨ 350)': '5',
    'Marathi (₨ 350)': '8',
    'Kannada (₨ 350)': '2',
  },
};

test('Heartfulness Quarterly Magazine - Subscribe form submission', async ({ page }) => {
  test.setTimeout(120000);

  try {
    await page.goto(SUBSCRIBE_URL);
    await page.waitForLoadState('networkidle');
    console.log('✓ Loaded subscribe page');

    // ─── Personal details ───
    try {
      await page.getByLabel('First Name *').fill(testData.firstName);
      await page.getByLabel('Last Name *').fill(testData.lastName);
      await page.getByLabel('Mobile Number *').fill(testData.mobile);
      console.log('✓ Filled personal details');
    } catch (error) {
      console.error('✗ Failed to fill personal details');
      throw error;
    }

    // ─── Address ───
    try {
      await page.getByLabel('Address Line 1 *').fill(testData.addressLine1);
      await page.getByLabel('Address Line 2 *').fill(testData.addressLine2);
      await page.getByLabel('City *').fill(testData.city);
      console.log('✓ Filled address fields');
    } catch (error) {
      console.error('✗ Failed to fill address fields');
      throw error;
    }

    // ─── State dropdown ───
    try {
      await page.getByRole('link', { name: '- select -' }).click();
      await page.getByRole('combobox', { name: 'State *' }).fill(testData.state);
      await page.getByRole('option', { name: testData.stateOption }).click();
      console.log(`✓ Selected state: ${testData.stateOption}`);
    } catch (error) {
      console.error('✗ Failed to select state');
      throw error;
    }

    // ─── Postal code and email ───
    try {
      await page.getByLabel('Postal Code *').fill(testData.postalCode);
      await page.getByLabel('Email *').fill(testData.email);
      console.log('✓ Filled postal code and email');
    } catch (error) {
      console.error('✗ Failed to fill postal code/email');
      throw error;
    }

    // ─── Magazine quantities ───
    try {
      for (const [label, quantity] of Object.entries(testData.quantities)) {
        await page.getByLabel(label).fill(quantity);
        console.log(`  ✓ ${label} → ${quantity}`);
      }
      console.log('✓ Filled all magazine quantities');
    } catch (error) {
      console.error('✗ Failed to fill magazine quantities');
      throw error;
    }

    // ─── Submit ───
    try {
      await page.getByRole('button', { name: 'Submit' }).click();
      await sleep(3000); // wait 3 sec as requested
      console.log('✓ Form submitted');
      console.log('Now on:', page.url());
    } catch (error) {
      console.error('✗ Failed to submit form');
      throw error;
    }

    console.log('\n✓ Test completed successfully');
  } catch (error) {
    console.error('\n✗ Test failed:', error.message);
    if (!page.isClosed()) {
      try {
        await page.screenshot({
          path: `error-qtlymag-subscribe-${Date.now()}.png`,
          fullPage: true,
          timeout: 5000,
        });
        console.log('Screenshot saved');
      } catch (e) {
        console.error('Screenshot failed:', e.message);
      }
    }
    throw error;
  }
});