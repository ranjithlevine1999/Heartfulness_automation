import { test, expect } from '@playwright/test';

const BOOK_URL = 'https://awsstaging.heartfulness.org/books/the-heartfulness-way-book';

test('The Heartfulness Way - Practice & Programs Links', async ({ page }) => {
  try {
    await page.goto(BOOK_URL);

    // ─── Explore dropdown → Individual Practice ───
    try {
      await page.getByRole('button', { name: /explore/i }).hover();
      await page.getByRole('link', { name: 'Individual Practice' }).click();
      console.log('✓ Navigated to "Individual Practice" page');
      await page.goto(BOOK_URL);
    } catch (error) {
      console.error('✗ Failed to navigate to Individual Practice');
      throw error;
    }

    // ─── Explore dropdown → Personal Trainer ───
    try {
      await page.getByRole('button', { name: /explore/i }).hover();
      await page.getByRole('link', { name: 'Personal Trainer' }).click();
      console.log('✓ Navigated to "Personal Trainer" page');
      await page.goto(BOOK_URL);
    } catch (error) {
      console.error('✗ Failed to navigate to Personal Trainer');
      throw error;
    }

    // ─── Explore dropdown → Group Sessions ───
    try {
      await page.getByRole('button', { name: /explore/i }).hover();
      await page.getByRole('link', { name: 'Group Sessions' }).click();
      console.log('✓ Navigated to "Group Sessions" page');
      await page.goto(BOOK_URL);
    } catch (error) {
      console.error('✗ Failed to navigate to Group Sessions');
      throw error;
    }

    // ─── Explore dropdown → Heartfulness Initiatives ───
    try {
      await page.getByRole('button', { name: /explore/i }).hover();
      await page.getByRole('link', { name: 'Heartfulness Initiatives' }).click();
      console.log('✓ Navigated to "Heartfulness Initiatives" page');
      await page.goto(BOOK_URL);
    } catch (error) {
      console.error('✗ Failed to navigate to Heartfulness Initiatives');
      throw error;
    }

    console.log('✓ Test completed successfully');
  } catch (error) {
    console.error('✗ Test failed with error:', error.message);
    throw error;
  }
});