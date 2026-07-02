import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('https://mail.google.com/');
  await page.getByLabel('Email or phone').click();
  await page.getByLabel('Email or phone').fill('ranjithkumar.krishnamoorthy@volunteer.heartfulness.org');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Enter your password').fill('Ranjith@1999.');
  await page.getByText('LoadingWelcomeranjithkumar.').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Refresh').click();
});