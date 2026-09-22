const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// Singapore FAQ questions to expand
const FAQ_QUESTIONS = [
    'What to expect',
    'Making it fit your routine',
    'What you may experience',
    'Guidance and support',
    'Cost and commitment',
    'Benefits and deeper insights',
    'In Singapore',
    'Talk to us',
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


// Switch language to Singapore (SG)
async function switchToSingapore(page) {
    try {
        await page.getByRole('button', { name: 'ENGLISH' }).click({ timeout: 5000 });
        await sleep(500);
        await page.getByRole('button', { name: 'Country_SG SG' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
    } catch (e) {
        console.warn('Could not switch to SG:', e.message);
    }
}


// Return home by clicking the logo (falls back to direct navigation)
async function returnHome(page) {
    try {
        await page.getByRole('link', { name: 'HeartfulnessLogo_Blk_Pwd' }).click({ timeout: 5000 });
    } catch (e) {
        console.log('Logo click failed, navigating directly to home URL');
        await page.goto(HFN_URL);
    }
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);
}


test('HFN Singapore -> Full navigation, menus, and FAQ expansion', async ({ page }) => {
    test.setTimeout(300000);
    test.slow();

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Switch language from English to Singapore (SG) ---
        await switchToSingapore(page);
        await takeScreenshot(page, 'Language_Switched_SG');

        // --- Click EXPERIENCE MEDITATION ---
        await page.getByRole('button', { name: 'EXPERIENCE MEDITATION' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await takeScreenshot(page, 'Experience_Meditation_SG');

        // --- Return home and open About -> Who We Are ---
        await returnHome(page);
        await page.getByRole('button', { name: 'About' }).click();
        await sleep(300);
        await page.getByRole('link', { name: 'Who We Are' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);
        await takeScreenshot(page, 'Who_We_Are');

        // --- About -> Experiences ---
        await page.getByRole('button', { name: 'About' }).click();
        await sleep(300);
        await page.getByRole('link', { name: 'Experiences' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);
        await takeScreenshot(page, 'Experiences');

        // --- Find Us -> Singapore Heartfulness Center ---
        await page.getByRole('button', { name: 'Find Us' }).click();
        await sleep(300);
        await page.getByRole('link', { name: 'Singapore Heartfulness Center' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);
        await takeScreenshot(page, 'Singapore_Heartfulness_Center');

        // --- Find Us -> Meditation Timings & Locations ---
        await page.getByRole('button', { name: 'Find Us' }).click();
        await sleep(300);
        await page.getByRole('link', { name: 'Meditation Timings & Locations' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);
        await takeScreenshot(page, 'Meditation_Timings');

        // --- Explore -> Individual Practice ---
        await page.getByRole('button', { name: 'Explore' }).click();
        await sleep(300);
        await page.getByRole('link', { name: 'Individual Practice' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1000);
        await takeScreenshot(page, 'Individual_Practice');

        // --- Explore -> Group Sessions ---
        await page.getByRole('button', { name: 'Explore' }).click();
        await sleep(300);
        await page.getByRole('link', { name: 'Group Sessions' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await takeScreenshot(page, 'Group_Sessions');

        // --- Force navigate to home URL for FAQ section ---
        console.log('Navigating directly to home URL for FAQ section...');
        await page.goto(HFN_URL);
        await page.waitForLoadState('domcontentloaded');
        await sleep(2500);

        // --- Switch back to Singapore (SG) since home URL resets to English ---
        console.log('Switching language back to SG for FAQ section...');
        await switchToSingapore(page);
        await takeScreenshot(page, 'Home_SG_Before_FAQ');

        // --- Expand each FAQ question ---
        for (const question of FAQ_QUESTIONS) {
            console.log(`Expanding FAQ: ${question}`);
            try {
                await page.getByRole('button', { name: question }).click({ timeout: 5000 });
                await sleep(500);
            } catch (e) {
                console.warn(`FAQ button failed for "${question}":`, e.message);
            }
        }

        await takeScreenshot(page, 'FAQs_Expanded');

        console.log('✓ Singapore full flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Singapore_Full_Flow_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});