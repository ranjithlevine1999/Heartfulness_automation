import { test, expect } from '@playwright/test';

test('whisper subscription after sign-in', async ({ page }) => {
  // ---------- Sign in ----------
  await page.goto('https://awsstaging.heartfulness.org/global/');
  await page.getByLabel('SIGN IN').click();
  await page.getByRole('link', { name: 'Signin with Email' }).click();
  await page.getByLabel('Email ID *').fill('ranjithlevine@gmail.com');
  await page.getByLabel('Password', { exact: true }).fill('Test@123');

  // TODO: confirm the actual sign-in submit button name in the modal
  await page.getByRole('button', { name: /sign in|login|submit/i }).click();

  // ---------- Navigate to Whisper subscription ----------
  await page.getByRole('link', { name: 'Whisper' }).click();

  // ---------- Fill subscription form ----------
  await page.locator('input[name="fname"]').fill('Ranjith');
  await page.locator('input[name="lname"]').fill('kumar');
  await page.locator('input[name="from"]').fill('ranjithkumar.krishnamoorthy@volunteer.heartfulness.org');

  // Language dropdown — scoped by the "Language" label
  await page
    .locator('label:has-text("Language")')
    .locator('..')
    .locator('[class*="dropdown"], [class*="select"]')
    .first()
    .click();
  await page.getByText('English', { exact: true }).click();

  // Consent checkbox
  await page.locator('.p-checkbox-box').click();

  // reCAPTCHA (test key on staging — clicking is sufficient)
  await page
    .frameLocator('iframe[title="reCAPTCHA"]')
    .getByRole('checkbox', { name: /not a robot/i })
    .click();

  // Give reCAPTCHA a moment to mark as verified
  await page.waitForTimeout(1500);

  // ---------- Submit ----------
  await page.getByRole('button', { name: 'SUBSCRIBE' }).click();

  // ---------- Assert success ----------
  await expect(
    page.getByText(/thank you|subscribed|success/i)
  ).toBeVisible({ timeout: 10000 });
});