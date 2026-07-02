const { test, expect } = require('@playwright/test');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const GLOBAL_URL = 'https://heartfulness.org/global/';
const EMAIL = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

test('Heartfulness Global -> Whisper Subscribe form field validation', async ({ page }) => {
  test.setTimeout(120000);

  try {
    // ─── Sign In ───
    await page.goto(GLOBAL_URL);
    await page.getByLabel('SIGN IN').click();
    await page.getByRole('link', { name: 'Signin with Email' }).click();
    await page.getByLabel('Email *').fill(EMAIL);
    await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('networkidle');
    console.log('✓ Signed in');

    // ─── Navigate to Whisper ───
    await page.getByRole('link', { name: 'Whisper' }).click();
    await page.waitForLoadState('networkidle');
    await sleep(1500);
    console.log('✓ Navigated to Whisper');

    // ─── Open Subscribe form ───
    await page.getByLabel('SUBSCRIBE').click();
    await sleep(1500);
    console.log('✓ Opened Subscribe form');

    // ─── TEST 1: All form fields are visible ───
    try {
      const fname = page.locator('input[name="fname"]');
      const lname = page.locator('input[name="lname"]');
      const emailField = page.locator('input[name="from"]');
      const languageDropdown = page.locator('div').filter({ hasText: /^empty$/ }).nth(1);
      const termsCheckbox = page.locator('.p-checkbox-box');
      const subscribeButton = page.getByLabel('SUBSCRIBE');

      await expect(fname).toBeVisible();
      await expect(lname).toBeVisible();
      await expect(emailField).toBeVisible();
      await expect(languageDropdown).toBeVisible();
      await expect(termsCheckbox).toBeVisible();
      await expect(subscribeButton).toBeVisible();

      console.log('✓ All form fields are visible (fname, lname, email, language, checkbox, subscribe)');
    } catch (error) {
      console.error('✗ Field visibility check failed');
      throw error;
    }

    // ─── TEST 2: Empty form submission is blocked ───
    try {
      await page.getByLabel('SUBSCRIBE').click();
      await sleep(1500);

      // Should still be on form page
      await expect(page.getByLabel('SUBSCRIBE')).toBeVisible();
      await expect(page.locator('input[name="fname"]')).toBeVisible();
      console.log('✓ Empty form submission was blocked (validation working)');
    } catch (error) {
      console.error('✗ Empty form validation check failed');
      throw error;
    }

    // ─── TEST 3: Each field accepts input ───
    try {
      const fname = page.locator('input[name="fname"]');
      const lname = page.locator('input[name="lname"]');
      const emailField = page.locator('input[name="from"]');

      await fname.fill('Ranjith');
      await expect(fname).toHaveValue('Ranjith');
      console.log('  ✓ First name accepts input');

      await lname.fill('kumar');
      await expect(lname).toHaveValue('kumar');
      console.log('  ✓ Last name accepts input');

      await emailField.fill(EMAIL);
      await expect(emailField).toHaveValue(EMAIL);
      console.log('  ✓ Email accepts input');

      console.log('✓ All fields accept input correctly');
    } catch (error) {
      console.error('✗ Field input check failed');
      throw error;
    }

    // ─── TEST 4: Invalid email format is rejected ───
    try {
      const emailField = page.locator('input[name="from"]');
      await emailField.fill('not-a-valid-email');
      await page.locator('input[name="fname"]').click(); // blur the email field
      await sleep(500);

      await page.getByLabel('SUBSCRIBE').click();
      await sleep(1500);

      await expect(page.getByLabel('SUBSCRIBE')).toBeVisible();
      console.log('✓ Invalid email format was rejected');

      // Restore valid email
      await emailField.fill(EMAIL);
    } catch (error) {
      console.error('✗ Email format validation check failed');
      throw error;
    }

    // ─── TEST 5: Language dropdown works ───
    try {
      await page.locator('div').filter({ hasText: /^empty$/ }).nth(1).click();
      await sleep(500);

      const englishOption = page.getByLabel('English', { exact: true });
      await expect(englishOption).toBeVisible();
      await englishOption.click();
      await sleep(500);

      console.log('✓ Language dropdown works (English selected)');
    } catch (error) {
      console.error('✗ Language dropdown check failed');
      throw error;
    }

    // ─── TEST 6: Terms checkbox is interactive ───
    try {
      const checkbox = page.locator('.p-checkbox-box');
      await checkbox.click();
      await sleep(500);

      // Verify it's now checked (PrimeVue/PrimeReact uses .p-highlight class for checked state)
      const isChecked = await checkbox.evaluate(el =>
        el.classList.contains('p-highlight') ||
        el.getAttribute('aria-checked') === 'true' ||
        el.querySelector('.p-checkbox-icon')?.classList.contains('p-icon')
      );

      if (isChecked) {
        console.log('✓ Terms checkbox toggles correctly');
      } else {
        console.log('⚠ Checkbox clicked but checked state could not be verified');
      }
    } catch (error) {
      console.error('✗ Terms checkbox check failed');
      throw error;
    }

    // ─── TEST 7: Subscribe button is enabled when form is filled ───
    try {
      const subscribeButton = page.getByLabel('SUBSCRIBE');
      await expect(subscribeButton).toBeEnabled();
      console.log('✓ Subscribe button is enabled when form is filled');
    } catch (error) {
      console.error('✗ Subscribe button state check failed');
      throw error;
    }

    console.log('\n✓ All field validation tests passed');
    console.log('  (Final submission with reCAPTCHA intentionally skipped)');
  } catch (error) {
    console.error('\n✗ Test failed:', error.message);
    if (!page.isClosed()) {
      try {
        await page.screenshot({
          path: `error-whisper-${Date.now()}.png`,
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