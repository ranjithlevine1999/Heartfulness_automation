const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep (kept in case you use it elsewhere)
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ---------- Test data factory (no external deps) ----------
function buildTestData() {
  const runId = Date.now().toString().slice(-6);
  const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const randDigits = (n) => Array.from({ length: n }, () => rand(0, 9)).join('');
  const pick = (arr) => arr[rand(0, arr.length - 1)];
  const randomLetters = (n) => Array.from({ length: n }, () => String.fromCharCode(65 + rand(0, 25))).join('');

  // Random uppercase letter A-Z, changes every run
  const randomLetter = String.fromCharCode(65 + rand(0, 25));

  return {
    user: {
      email: process.env.MP_EMAIL || 'preceptor.10@mailinator.com',
      password: process.env.MP_PASSWORD || 'password',
    },
    place: {
     // name: `${randomLetter}testing`, 
      name: `${randomLetters(3)}testing`,  // e.g. Ktesting_837492
      citySearch: 'Chenn',
      cityOption: 'CHENNAI (Chengalpattu)',
      houseNo: String(rand(1, 999)),
      street: `${rand(1, 99)}th st`,
      addressCitySearch: 'chennai',
      postalCode: '600068',
      ownership: 'Rented',
      connectivity: 'C-connect',
      placeType: 'Residential',
      phone: `+91 ${randDigits(5)}-${randDigits(5)}`,
      amenities: pick(['food', 'transport', 'accessibility']),
      directions: `Test directions ${runId}`,
      mapSearch: 'chennai',
      mapOption: 'Tamil Nadu, India',
    },
  };
}

// ---------- Robust react-select helper ----------
// Opens a react-select dropdown, optionally types to filter, waits for the menu,
// and selects via keyboard (ArrowDown + Enter). Retries up to 3 times.
async function selectFromDropdown(page, controlLocator, optionText = '') {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await controlLocator.waitFor({ state: 'visible', timeout: 5000 });
      await controlLocator.click();

      if (optionText) {
        await page.keyboard.type(optionText, { delay: 80 });
      }

      // Wait for the dropdown menu to render
      const menu = page.locator('[class*="-menu"], [class*="-option"]').first();
      await menu.waitFor({ state: 'visible', timeout: 4000 });

      // Use keyboard navigation — most reliable for react-select
      await page.keyboard.press('ArrowDown');
      await page.keyboard.press('Enter');
      return; // success
    } catch (err) {
      console.log(`Dropdown attempt ${attempt} failed: ${err.message}`);
      await page.keyboard.press('Escape').catch(() => {});
      await page.waitForTimeout(500);
    }
  }

  throw new Error(`Dropdown failed to open after 3 attempts (search: "${optionText}")`);
}

// Allow more time — this flow has many steps
test.setTimeout(120_000);

test('Send for Approval', async ({ page }) => {
  const data = buildTestData();

  try {
    // ---------- Login ----------
    await page.goto('https://meditationplace.heartfulness.org');
    await page.getByRole('link', { name: 'Signin with Email' }).click();
    await page.getByLabel('Email *').fill(data.user.email);
    await page.getByLabel('Password', { exact: true }).fill(data.user.password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // ---------- Create Meditation Place ----------
    await page.getByLabel('Create Meditation Place').click();
    await page.getByPlaceholder('Enter a Place').fill(data.place.name);

    // First city dropdown (rc_select - antd-style)
    await page.locator('#rc_select_0').fill(data.place.citySearch);
    await page.getByTitle(data.place.cityOption).click();
    await page.getByRole('button', { name: 'Proceed' }).click();

    // ---------- Address ----------
    await page.getByLabel('House/Flat. No*').fill(data.place.houseNo);
    await page.getByLabel('Street*').fill(data.place.street);

    // City react-select (address section) — uses robust helper
    await selectFromDropdown(
      page,
      page.locator('.input_city .css-13cymwt-control'),
      data.place.addressCitySearch
    );

    await page.getByLabel('Postal/Zip Code*').fill(data.place.postalCode);

    // ---------- Property dropdowns ----------
    // Ownership
    await selectFromDropdown(
      page,
      page.locator('.hfn_select_field .css-13cymwt-control').first(),
      data.place.ownership
    );

    // Connectivity
    await selectFromDropdown(
      page,
      page.locator('.hfn_select_field .css-13cymwt-control').first(),
      data.place.connectivity
    );

    // Place type (residential/commercial)
    await selectFromDropdown(
      page,
      page.locator('div:nth-child(15) > .hfn_input > .hfn_select_field > .css-13cymwt-control'),
      data.place.placeType
    );

    // Next dropdown — pick first option (no specific text filter)
    await selectFromDropdown(
      page,
      page.locator('div:nth-child(16) > .hfn_input > .hfn_select_field > .css-13cymwt-control')
    );

    // ---------- Visibility toggles ----------
    await page.locator('#location_public_display svg').click();
    await page.locator('#location_display_on_google_places div').nth(1).click();
    await page.locator('#location_public_display div').nth(1).click();
    await page.locator('#location_display_on_google_places svg').click();
    await page.getByLabel('Continue').click();

    // ---------- Map location ----------
    await page.getByPlaceholder('Search your location').fill(data.place.mapSearch);
    await page.getByText(data.place.mapOption).first().click();
    await page.getByLabel('Continue').click();

    // ---------- Contact & extras ----------
    await page.getByPlaceholder('Enter number with country code').fill(data.place.phone);
    await page.getByPlaceholder('Food, Transport, Accessibility').fill(data.place.amenities);
    await page.getByPlaceholder('Direction To Reach').fill(data.place.directions);
    await page.getByLabel('Continue').click();

    // ---------- Final steps ----------
    await page.getByLabel('Add Time').click();
    await page.getByLabel('Proceed to Review').click();
    await page.getByLabel('Send for approval').click();
       await sleep(5000);

    // Optional: assert success
    // await expect(page.getByText(/sent for approval|submitted successfully/i)).toBeVisible();

  } catch (error) {
    console.error('Test failed in Send for Approval flow:', error);

    // Only screenshot if the page is still open
    if (!page.isClosed()) {
      try {
        await takeScreenshot(page, `SendForApproval_Error_${data.place.name}`);
      } catch (screenshotError) {
        console.error('Could not take screenshot:', screenshotError.message);
      }
    } else {
      console.error('Page was already closed — no screenshot taken.');
    }

    throw error;
  }
});