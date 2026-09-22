// auth-delegate-management.spec.js

import { test, expect } from '@playwright/test';

test('manage delegate flow', async ({ page }) => {
  const baseUrl = 'https://function360.staging.heartfulness.org/';
   const DELEGATE_ID = 'AEMDAA001';

  // Build auth URL using the provided base URL
  const authUrl =
    'https://function360.staging.heartfulness.org/';

  await page.goto(authUrl, { waitUntil: 'load' });

  // Sign in with email
  await page.getByRole('link', { name: 'Signin with Email' }).click();

  const emailInput = page.getByLabel('Email ID *');
  await emailInput.waitFor({ state: 'visible' });
  await emailInput.fill('abhyasi.25@mailinator.com');

  const passwordInput = page.getByLabel('Password', { exact: true });
  await passwordInput.waitFor({ state: 'visible' });
  await passwordInput.fill('password');

  await page.getByRole('button', { name: 'Sign In' }).click();

  // Wait for role selection row to appear
  const presidentRow = page.getByRole('row', { name: /President-Global SRCM/i });
  await presidentRow.waitFor({ state: 'visible' });

  const roleRadio = presidentRow.locator('input[name="pr_id_1_dt_radio"]');
  await roleRadio.waitFor({ state: 'visible' });
  await roleRadio.check();

  await page.getByLabel('Continue').click();


 await page.getByRole('button', { name: 'profile Johna Rheaume ' }).click();
  await page.getByRole('menuitem', { name: ' Switch Roles' }).click();
  await page.locator('#pr_id_1_content svg').click();

  await page.getByText('President-Global - SRCM', { exact: true }).click();
  await page.getByLabel('Proceed').click();

  // Wait for manage delegate button
  const manageDelegateBtn = page.getByRole('button', { name: /Manage Delegate/i });
  await manageDelegateBtn.waitFor({ state: 'visible' });
  await manageDelegateBtn.click();

  // Add delegate
  const addDelegateBtn = page.getByLabel('+ Add Delegate');
  await addDelegateBtn.waitFor({ state: 'visible' });
  await addDelegateBtn.click();

  const delegateIdInput = page.getByPlaceholder('INABCD123');
  await delegateIdInput.waitFor({ state: 'visible' });
await delegateIdInput.fill('AEMFAA002'); //Chnage the ID

  const goBtn = page.getByLabel('Go');
  await goBtn.waitFor({ state: 'visible' });
  await goBtn.click();

  const addDelegateConfirmBtn = page.getByLabel('Add Delegate', { exact: true });
  await addDelegateConfirmBtn.waitFor({ state: 'visible' });
  await addDelegateConfirmBtn.click();

  // Wait for delegate row to appear before interacting
  const delegateRow = page.locator('tr').filter({ hasText: 'AEMDAA001' }).first();
  await delegateRow.waitFor({ state: 'visible' });

  // Edit delegate
  const editBtn = delegateRow.getByTitle('Edit').first();
  await editBtn.waitFor({ state: 'visible' });
  await editBtn.click();

  // Close edit modal/form
  const closeBtn = page.getByLabel('Close');
  await closeBtn.waitFor({ state: 'visible' });
  await closeBtn.click();

  // Remove delegate
  const removeBtn = delegateRow.getByTitle('Remove').first();
  await removeBtn.waitFor({ state: 'visible' });
  await removeBtn.click();

  const confirmYesBtn = page.getByLabel('Yes');
  await confirmYesBtn.waitFor({ state: 'visible' });
  await confirmYesBtn.click();

  // Optional: assert that delegate row is gone or a success message appears
  // await expect(delegateRow).not.toBeVisible();
});