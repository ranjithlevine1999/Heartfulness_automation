const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// Insights menu links to navigate through
const INSIGHTS_LINKS = [
    'Heartfulness Research',
    'Heartfulness Magazine',
    "Daaji's Messages",
];


async function loginToHFN(page) {
    await page.goto(HFN_URL);
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);

    await page.getByRole('button', { name: 'Sign In' }).click();
    await sleep(500);
    await page.getByRole('link', { name: 'Signin with Email' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1000);

    await page.getByLabel('Email ID *').fill(USERNAME);
    await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(2500);
}


// Open the Insights menu
async function openInsightsMenu(page) {
    await page.getByRole('button', { name: 'Insights' }).click();
    await sleep(800);
}


test('Heartfulness -> Insights menu - navigate through all links', async ({ page }) => {
    test.setTimeout(180000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        const successfullyOpened = [];
        const failedToOpen = [];

        // --- Loop through each Insights link ---
        for (const linkName of INSIGHTS_LINKS) {
            console.log(`\nNavigating to: ${linkName}`);

            try {
                // Open Insights menu
                await openInsightsMenu(page);

                // Click the link - opens a popup (new tab)
                const popupPromise = page.waitForEvent('popup', { timeout: 10000 });
                await page.getByRole('link', { name: linkName }).click();
                const popup = await popupPromise;

                // Wait for popup to load
                await popup.waitForLoadState('domcontentloaded').catch(() => {});
                await sleep(1500);

                console.log(`  ✓ Opened: ${linkName} at ${popup.url()}`);
                successfullyOpened.push({ link: linkName, url: popup.url() });

                // Close the popup
                await popup.close();
                await sleep(1000);
            } catch (e) {
                console.warn(`  ✗ Failed to open ${linkName}: ${e.message}`);
                failedToOpen.push({ link: linkName, error: e.message });
                // Close any lingering menus
                await page.keyboard.press('Escape').catch(() => {});
                await sleep(500);
            }
        }

        await takeScreenshot(page, 'All_Insights_Links_Tested');

        // --- Summary ---
        console.log('\n=== Summary ===');
        console.log(`Total links tested: ${INSIGHTS_LINKS.length}`);
        console.log(`Successfully opened: ${successfullyOpened.length}`);
        console.log(`Failed to open: ${failedToOpen.length}`);

        if (successfullyOpened.length > 0) {
            console.log('\nSuccessfully opened links:');
            successfullyOpened.forEach(({ link, url }) => {
                console.log(`  - ${link}: ${url}`);
            });
        }

        if (failedToOpen.length > 0) {
            console.log('\nLinks that failed to open:');
            failedToOpen.forEach(({ link, error }) => {
                console.log(`  - ${link}: ${error}`);
            });
        }

        // Assert at least one link opened
        expect(successfullyOpened.length).toBeGreaterThan(0);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Insights_Menu_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});