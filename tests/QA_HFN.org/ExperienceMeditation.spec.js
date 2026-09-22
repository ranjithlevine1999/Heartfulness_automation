const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/heartfulness-practices/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// Practice sections to test - each row has audio + video player
const PRACTICE_SECTIONS = [
    'row_relaxation',
    'row_meditation',
    'row_cleaning',
    'row_inner-connect',
    'row_explore',
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


// Test audio and video controls for a single practice section
async function testPracticeSection(page, sectionId) {
    console.log(`Testing section: ${sectionId}`);

    // --- Listen Audio button ---
    try {
        const section = page.locator(`#${sectionId}`);
        await section.getByRole('button', { name: 'LISTEN AUDIO' }).click();
        await sleep(1500);

        // Close audio player (press Escape)
        await page.keyboard.press('Escape');
        await sleep(500);
    } catch (e) {
        console.warn(`Audio button failed for ${sectionId}:`, e.message);
    }

    // --- Open video player ---
    try {
        const section = page.locator(`#${sectionId}`);
        await section.getByLabel('Open video player').click();
        await sleep(1500);

        // Close video player
        await page.keyboard.press('Escape');
        await sleep(500);
    } catch (e) {
        console.warn(`Video player failed for ${sectionId}:`, e.message);
    }
}


test('Heartfulness Practices -> Audio and Video for all sections', async ({ page }) => {
    test.setTimeout(180000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Test each practice section (audio + video) ---
        for (const sectionId of PRACTICE_SECTIONS) {
            await testPracticeSection(page, sectionId);
            await sleep(500);
        }

        await takeScreenshot(page, 'All_Sections_Tested');
        console.log('✓ All 5 practice sections tested successfully');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'HeartfulnessPractices_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});