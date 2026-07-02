const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HIS_URL = 'https://staging.his.edu.in/';


test.describe('HIS Staging', () => {
    test('Home / Classrooms / Labs navigation', async ({ page }) => {
        test.setTimeout(60000);

        try {
            await page.setViewportSize({ width: 1154, height: 882 });
            await page.goto(HIS_URL);

            // Close initial dialog
            await page.locator('button.p-dialog-header-close path').click();
            await sleep(500);

            // --- Click through home page list items 3-9 ---
            for (let i = 3; i <= 9; i++) {
                await page.locator(`li:nth-of-type(${i}) > button`).click();
                await sleep(300);
            }

            // --- Click through home page buttons 2-4 ---
            await page.locator('button:nth-of-type(2) > span').click();
            await page.locator('button:nth-of-type(3) p').click();
            await page.locator('button:nth-of-type(4) > span').click();

            // --- Navigate to Classrooms page ---
            await page.locator('div:nth-of-type(6) a').click();
            await page.waitForLoadState('domcontentloaded');
            expect(page.url()).toBe('https://staging.his.edu.in/classrooms/');

            // Click through classroom list items 2-4
            for (let i = 2; i <= 4; i++) {
                await page.locator(`li:nth-of-type(${i}) > button`).click();
                await sleep(300);
            }

            // --- Return to home ---
            await page.locator('#header_wrapper img').click();
            await page.waitForLoadState('domcontentloaded');
            await page.locator('button.p-dialog-header-close path').click();
            await sleep(500);

            // --- Navigate to Labs page ---
            await page.locator('div:nth-of-type(7) a').click();
            await page.waitForLoadState('domcontentloaded');
            expect(page.url()).toBe('https://staging.his.edu.in/labs/');

            // Click through lab list items 2-3
            await page.locator('div:nth-of-type(2) li:nth-of-type(2) > button').click();
            await page.locator('div:nth-of-type(2) li:nth-of-type(3) > button').click();

            // --- Return to home and close final dialog ---
            await page.locator('#header_wrapper img').click();
            await page.waitForLoadState('domcontentloaded');
            await page.locator('button.p-dialog-header-close > svg').click();
        } catch (error) {
            console.error('Test failed:', error.message);
            if (!page.isClosed()) {
                try {
                    await page.screenshot({
                        path: `error-his-${Date.now()}.png`,
                        fullPage: true,
                        timeout: 5000
                    });
                } catch (screenshotError) {
                    console.error('Screenshot failed:', screenshotError.message);
                }
            }
            throw error;
        }
    });
});