import { test, expect } from '@playwright/test';

const BOOK_URL = 'https://awsstaging.heartfulness.org/books/the-heartfulness-way-book';

test('The Heartfulness Way - Header Navigation Links', async ({ page }) => {
  try {
    await page.goto(BOOK_URL);

    // ─── About dropdown → "Who we are" ───
    try {
      // Hover (not click) to open the dropdown
      await page.getByRole('button', { name: /about/i }).hover();
      await page.getByRole('link', { name: 'Who we are' }).click();
      console.log('✓ Navigated to "Who we are" page');
    } catch (error) {
      console.error('✗ Failed to navigate via About → Who we are');
      throw error;
    }

    // Return to book page
    await page.goto(BOOK_URL);

    // ─── About dropdown → "Connect with us" ───
    try {
      await page.getByRole('button', { name: /about/i }).hover();
      await page.getByRole('link', { name: /connect with us/i }).click();
      console.log('✓ Navigated to "Connect with us" page');
    } catch (error) {
      console.error('✗ Failed to navigate to Connect with us');
      throw error;
    }

    // Return to book page
    await page.goto(BOOK_URL);

    console.log('✓ Test completed successfully');
  } catch (error) {
    console.error('✗ Test failed with error:', error.message);
    throw error;
  }
});