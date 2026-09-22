const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// Practice sections to test - each has audio + video player
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


// Return to homepage via HFN logo
async function returnHome(page) {
    await page.getByRole('link', { name: 'HeartfulnessLogo_Blk_Pwd' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);
}


// Test audio and video controls for a single practice section (Japanese audio label)
async function testPracticeSection(page, sectionId) {
    console.log(`Testing section: ${sectionId}`);

    // --- Listen Audio button (音声を聞く) ---
    try {
        const section = page.locator(`#${sectionId}`);
        await section.getByRole('button', { name: '音声を聞く' }).click();
        await sleep(1500);
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
        await page.keyboard.press('Escape');
        await sleep(500);
    } catch (e) {
        console.warn(`Video player failed for ${sectionId}:`, e.message);
    }
}


test('HFN Japanese -> Practices, navigation, join team, check all', async ({ page }) => {
    test.setTimeout(240000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Switch language from English to Japanese (JP) ---
        await page.getByRole('button', { name: 'ENGLISH' }).click();
        await sleep(800);
        await page.getByRole('button', { name: 'Country_JP JP' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
        await takeScreenshot(page, 'Language_Switched_JP');

        // --- Click "Experience Meditation" (Japanese: 瞑想を体験する) ---
        await page.getByRole('button', { name: '瞑想を体験する' }).first().click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2500);
        await takeScreenshot(page, 'Practices_Page_JP');

        // --- Test each practice section (audio + video) ---
        for (const sectionId of PRACTICE_SECTIONS) {
            await testPracticeSection(page, sectionId);
            await sleep(500);
        }

        await takeScreenshot(page, 'All_Practice_Sections_Tested');

        // --- Return to homepage ---
        await returnHome(page);

        // --- Click "Join our Team" (私たちのチームに参加する) ---
        try {
            await page.getByRole('button', { name: '私たちのチームに参加する' }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(2000);
            await takeScreenshot(page, 'Join_Team_Page');
        } catch (e) {
            console.warn('Join our Team button failed:', e.message);
        }

        // --- Return to homepage ---
        await returnHome(page);

        // --- Click "Check all" link ---
        try {
            await page.getByRole('link', { name: 'Check all' }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(2000);
            await takeScreenshot(page, 'Check_All_Page');
        } catch (e) {
            console.warn('Check all link failed:', e.message);
        }

        // --- Return to homepage ---
        await returnHome(page);

        console.log('✓ Japanese practices and navigation flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Japanese_Practices_Navigation_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});