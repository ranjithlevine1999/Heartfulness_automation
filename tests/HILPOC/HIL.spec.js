import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
      
try {
  await page.goto('https://hil.staging.heartfulness.org/');
  await page.getByRole('button', { name: 'Upcoming Programs' }).click();
  await page.getByRole('link', { name: 'Find out more', exact: true }).click();
  await page.getByRole('link', { name: 'For Organisation' }).click();
  await page.getByRole('link', { name: 'For Individuals' }).click();
  await page.getByRole('link', { name: 'Faculty' }).click();
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('link', { name: 'For Organisation' }).click();
  await page.getByRole('link', { name: 'For Individuals' }).click();

  await page.getByText('Cultivate greater awareness').click();

  await page.getByRole('button', { name: 'Integrate Personal and' }).click();
  await page.getByRole('button', { name: 'Enhance Decision-Making' }).click();
  await page.getByRole('button', { name: 'Strengthen Team Collaboration' }).click();
  await page.getByRole('button', { name: 'Boost Workforce Engagement' }).click();
  await page.getByRole('button', { name: 'Achieve Strategic Alignment' }).click();
  await page.getByRole('button', { name: 'Build Leadership Confidence' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'About Us' }).click();
  await page.getByRole('button', { name: 'Application Orientation' }).click();
  await page.getByRole('button', { name: 'Flipped Classroom Model' }).click();

  await page.getByRole('link', { name: 'Faculty' }).click();
  await page.getByRole('link', { name: 'Contact Us' }).click();
  await page.getByPlaceholder('Name').click();

  await page.getByPlaceholder('Name').fill('test');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test@gmail.com');
  await page.getByPlaceholder('Phone Number').click();
  await page.getByPlaceholder('Phone Number').fill('8758965235');
  await page.getByPlaceholder('Textarea').click();

  await page.getByPlaceholder('Textarea').fill('HI ');
 // await page.locator('div').filter({ hasText: 'Get In TouchLet\'s make' }).nth(2).click();
  await page.getByRole('button', { name: 'Submit' }).click();

}
  catch (error) {
    console.error('Test failed in HIL flow:', error);
    await takeScreenshot(page, 'HIL flow Error');
    throw error;
  }
  
});