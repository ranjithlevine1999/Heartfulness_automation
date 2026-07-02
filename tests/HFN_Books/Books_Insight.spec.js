import { test, expect } from '@playwright/test';

const BOOK_URL = 'https://awsstaging.heartfulness.org/books/the-heartfulness-way-book';

test('The Heartfulness Way - External Resource Links', async ({ page }) => {
  try {
    await page.goto(BOOK_URL);

    // ─── Insights dropdown → Heartfulness Research (opens in new tab) ───
    try {
      await page.getByRole('button', { name: /insights?/i }).hover();
      const page1Promise = page.waitForEvent('popup');
      await page.getByRole('navigation').getByRole('link', { name: 'Heartfulness Research' }).click();
      const page1 = await page1Promise;
      console.log('✓ Opened "Heartfulness Research" in new tab');
    } catch (error) {
      console.error('✗ Failed to open Heartfulness Research');
      throw error;
    }

    // ─── Insights dropdown → Heartfulness Magazine (opens in new tab) ───
    try {
      await page.getByRole('button', { name: /insights?/i }).hover();
      const page2Promise = page.waitForEvent('popup');
      await page.getByRole('navigation').getByRole('link', { name: 'Heartfulness Magazine' }).click();
      const page2 = await page2Promise;
      console.log('✓ Opened "Heartfulness Magazine" in new tab');
    } catch (error) {
      console.error('✗ Failed to open Heartfulness Magazine');
      throw error;
    }

    // ─── Insights dropdown → Daaji's Messages (opens in new tab) ───
    try {
      await page.getByRole('button', { name: /insights?/i }).hover();
      const page3Promise = page.waitForEvent('popup');
      await page.getByRole('link', { name: "Daaji's Messages" }).click();
      const page3 = await page3Promise;
      console.log('✓ Opened "Daaji\'s Messages" in new tab');
    } catch (error) {
      console.error('✗ Failed to open Daaji\'s Messages');
      throw error;
    }

    console.log('✓ Test completed successfully');
  } catch (error) {
    console.error('✗ Test failed with error:', error.message);
    throw error;
  }
});