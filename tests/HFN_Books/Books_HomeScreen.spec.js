const { test, expect } = require('@playwright/test');

test('The Heartfulness Way - Book Page Links and Downloads', async ({ page }) => {
  try {
    await page.goto('https://awsstaging.heartfulness.org/books/the-heartfulness-way-book');

    // ─── Excerpt Download (triggers both popup and download) ───
    try {
      const page1Promise = page.waitForEvent('popup');
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('button', { name: 'Excerpt from Book' }).click();
      const page1 = await page1Promise;
      const download = await downloadPromise;
      console.log('✓ Excerpt popup opened and download triggered');
    } catch (error) {
      console.error('✗ Failed to trigger excerpt download');
      throw error;
    }

    // ─── Close modal / overlay ───
    await page.locator('.mx-4').click();

    // ─── Primary CTA links (each opens in a new tab) ───
    try {
      const page2Promise = page.waitForEvent('popup');
      await page.getByRole('link', { name: 'Order Now arrow-right' }).click();
      const page2 = await page2Promise;

      const page3Promise = page.waitForEvent('popup');
      await page.getByRole('link', { name: 'Explore More arrow-right' }).click();
      const page3 = await page3Promise;

      const page4Promise = page.waitForEvent('popup');
      await page.getByRole('link', { name: 'Excerpt from Book arrow-right' }).click();
      const page4 = await page4Promise;

      const page5Promise = page.waitForEvent('popup');
      await page.getByRole('link', { name: 'Amazon' }).click();
      const page5 = await page5Promise;

      console.log('✓ Primary CTA links opened (Order Now, Explore More, Excerpt, Amazon)');
    } catch (error) {
      console.error('✗ Failed to open one of the primary CTA links');
      throw error;
    }

    // ─── Related Books carousel - Slide 1 ───
    try {
      const page6Promise = page.waitForEvent('popup');
      await page.locator('p > .text-center').first().click();
      const page6 = await page6Promise;

      const page7Promise = page.waitForEvent('popup');
      await page.locator('div:nth-child(2) > .bg-card > .duration-\\[2200\\] > p > .text-center').click();
      const page7 = await page7Promise;

      // Click Spiritual Anatomy book image (does not open popup)
      await page.getByRole('img', { name: 'Spiritual Anatomy' }).click();

      const page8Promise = page.waitForEvent('popup');
      await page.locator('div:nth-child(3) > .bg-card > .duration-\\[2200\\] > p > .text-center').click();
      const page8 = await page8Promise;

      const page9Promise = page.waitForEvent('popup');
      await page.locator('div:nth-child(4) > .bg-card > .duration-\\[2200\\] > p > .text-center').click();
      const page9 = await page9Promise;

      console.log('✓ Related books slide 1 verified');
    } catch (error) {
      console.error('✗ Failed during related books slide 1');
      throw error;
    }

    // ─── Related Books carousel - Slide 2 ───
    try {
      await page.getByLabel('Go to slide 2').click();

      const page10Promise = page.waitForEvent('popup');
      await page.locator('div:nth-child(5) > .bg-card > .duration-\\[2200\\] > p > .text-center').click();
      const page10 = await page10Promise;

      console.log('✓ Related books slide 2 verified');
    } catch (error) {
      console.error('✗ Failed during related books slide 2');
      throw error;
    }

    // ─── Related Books carousel - Slide 3 ───
    try {
      await page.getByLabel('Go to slide 3').click();

      const page11Promise = page.waitForEvent('popup');
      await page.locator('div:nth-child(6) > .bg-card > .duration-\\[2200\\] > p > .text-center').click();
      const page11 = await page11Promise;

      console.log('✓ Related books slide 3 verified');
    } catch (error) {
      console.error('✗ Failed during related books slide 3');
      throw error;
    }

    console.log('✓ Test completed successfully');
  } catch (error) {
    console.error('✗ Test failed with error:', error.message);
    throw error;
  }
});