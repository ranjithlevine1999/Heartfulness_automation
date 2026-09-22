const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// FAQ questions to expand
const FAQ_QUESTIONS = [
    'What is Heartfulness',
    'Why and who should meditate?',
    'How should we meditate?',
    'Is there any fees or donation',
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


// Helper to return to home page via logo
async function returnHome(page) {
    await page.getByRole('link', { name: 'HeartfulnessLogo_Blk_Pwd' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);
}


test('Heartfulness -> Homepage navigation and FAQ expansion', async ({ page }) => {
    test.setTimeout(120000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Video section: Play first video ---
        await page.locator('.videoLeft > .w-full > .flex').click();
        await sleep(1500);
        await takeScreenshot(page, 'Video_Played');

        // --- Navigate to "Meditate online with a trainer" ---
        await page.getByRole('link', { name: 'Meditate online with a trainer' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await returnHome(page);

        // --- Navigate to "Learn the basics with a" ---
        await page.getByRole('link', { name: 'Learn the basics with a' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await returnHome(page);

        // --- Video section: Click another video (col-md-7 section) ---
        await page.locator('.col-md-7 > .w-full > .flex').click();
        await sleep(1500);

        // --- Click "Explore all events" ---
        await page.getByRole('button', { name: 'Explore all events' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await returnHome(page);

        // --- Click "Check all" ---
        await page.getByRole('link', { name: 'Check all' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await returnHome(page);

        // --- FAQ Section: Expand each FAQ question ---
        for (const question of FAQ_QUESTIONS) {
            console.log(`Expanding FAQ: ${question}`);
            await page.getByRole('button', { name: question }).click();
            await sleep(800);
        }

        await takeScreenshot(page, 'FAQs_Expanded');

        console.log('✓ Homepage navigation and FAQ expansion completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Homepage_Navigation_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});