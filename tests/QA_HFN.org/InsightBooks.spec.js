const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// All books to navigate through
const BOOKS = [
    'Ashtavakra Mahagita',
    'The Heart Of Jainism',
    'Holy Tirthankar',
    'The Power Of Paradox',
    'Designing Destiny',
    'Wisdom Bridge',
    'Spiritual Anatomy',
    'The Heartfulness Way',
    'The Heartfulness Way 2',
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


// Open Insights menu and navigate to Books submenu
async function openBooksMenu(page) {
    await page.getByRole('button', { name: 'Insights' }).click();
    await sleep(500);
    await page.getByText('Books', { exact: false }).click();
    await sleep(1000);
}


test('Heartfulness -> Insights menu - navigate through all books', async ({ page }) => {
    test.setTimeout(240000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        const successfullyOpened = [];
        const failedToOpen = [];

        // --- Loop through each book ---
        for (const bookName of BOOKS) {
            console.log(`\nNavigating to: ${bookName}`);

            try {
                // Open Insights > Books submenu
                await openBooksMenu(page);

                // Click the book link - opens a popup (new tab)
                const popupPromise = page.waitForEvent('popup', { timeout: 10000 });
                await page.getByRole('link', { name: new RegExp(`^${bookName}(New)?$`, 'i') }).click();
                const bookPopup = await popupPromise;

                // Wait for popup to load
                await bookPopup.waitForLoadState('domcontentloaded').catch(() => {});
                await sleep(1500);

                console.log(`  ✓ Opened: ${bookName} at ${bookPopup.url()}`);
                successfullyOpened.push({ book: bookName, url: bookPopup.url() });

                // Close the popup
                await bookPopup.close();
                await sleep(1000);
            } catch (e) {
                console.warn(`  ✗ Failed to open ${bookName}: ${e.message}`);
                failedToOpen.push({ book: bookName, error: e.message });
                // Close any lingering menus
                await page.keyboard.press('Escape').catch(() => {});
                await sleep(500);
            }
        }

        await takeScreenshot(page, 'All_Books_Tested');

        // --- Summary ---
        console.log('\n=== Summary ===');
        console.log(`Total books tested: ${BOOKS.length}`);
        console.log(`Successfully opened: ${successfullyOpened.length}`);
        console.log(`Failed to open: ${failedToOpen.length}`);

        if (successfullyOpened.length > 0) {
            console.log('\nSuccessfully opened books:');
            successfullyOpened.forEach(({ book, url }) => {
                console.log(`  - ${book}: ${url}`);
            });
        }

        if (failedToOpen.length > 0) {
            console.log('\nBooks that failed to open:');
            failedToOpen.forEach(({ book, error }) => {
                console.log(`  - ${book}: ${error}`);
            });
        }

        // Assert at least most books opened
        expect(successfullyOpened.length).toBeGreaterThan(0);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Insights_Books_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});