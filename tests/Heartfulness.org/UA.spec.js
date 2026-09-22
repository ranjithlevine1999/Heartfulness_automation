const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// Ukrainian FAQ questions to expand
const FAQ_QUESTIONS = [
    'Що таке медитація',
    'Навіщо і кому слід медитувати?',
    'Як медитувати?',
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


async function switchToUkrainian(page) {
    try {
        await page.getByRole('button', { name: 'ENGLISH' }).click({ timeout: 5000 });
        await sleep(500);
        await page.getByRole('button', { name: 'Country_UA UA' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
    } catch (e) {
        console.warn('Could not switch to UA:', e.message);
    }
}


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


test('HFN Ukrainian -> Full navigation, menus, and FAQ expansion', async ({ page }) => {
    test.setTimeout(300000);
    test.slow();

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Switch language to Ukrainian (UA) ---
        await switchToUkrainian(page);
        await takeScreenshot(page, 'Language_Switched_UA');

        // --- Click СПРОБУВАТИ МЕДИТАЦІЮ ---
        await page.getByRole('button', { name: 'СПРОБУВАТИ МЕДИТАЦІЮ' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);
        await takeScreenshot(page, 'Practices_Page_UA');

        // --- Test row_relaxation: audio + video ---
        try {
            await page.locator('#row_relaxation').getByRole('button', { name: 'СЛУХАТИ АУДІО' }).click();
            await sleep(1500);
            await page.keyboard.press('Escape');
            await sleep(500);

            await page.locator('#row_relaxation').getByLabel('Open video player').click();
            await sleep(1500);
            await page.keyboard.press('Escape');
            await sleep(500);
        } catch (e) {
            console.warn('Relaxation section failed:', e.message);
        }

        // --- Return home ---
        await returnHome(page);

        // --- About -> Heartfulness In The World ---
        try {
            await page.getByRole('button', { name: 'Про Нас' }).click({ timeout: 5000 });
            await sleep(300);
            await page.getByRole('link', { name: 'Heartfulness В Світі' }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(1000);
            await takeScreenshot(page, 'Heartfulness_In_World');
        } catch (e) {
            console.warn('About > Heartfulness In World failed:', e.message);
        }

        // --- Practice -> Individual Practice ---
        try {
            await page.getByRole('button', { name: 'Практика' }).click({ timeout: 5000 });
            await sleep(300);
            await page.getByRole('link', { name: 'Індивідуальна Практика' }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(1000);
            await takeScreenshot(page, 'Individual_Practice_UA');
        } catch (e) {
            console.warn('Practice > Individual Practice failed:', e.message);
        }

        // --- About -> Contact Us ---
        try {
            await page.getByRole('button', { name: 'Про Нас' }).click({ timeout: 5000 });
            await sleep(300);
            await page.getByRole('link', { name: "Зв'язатись Із Нами" }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(1000);
            await takeScreenshot(page, 'Contact_Us_UA');
        } catch (e) {
            console.warn('About > Contact Us failed:', e.message);
        }

        // --- Return home ---
        await returnHome(page);

        // --- Click Basic Practices with Guidance (if visible on home) ---
        try {
            await page.getByRole('link', { name: 'Базові практики з супроводом' }).click({ timeout: 5000 });
            await page.waitForLoadState('domcontentloaded');
            await sleep(1000);
            await takeScreenshot(page, 'Basic_Practices_UA');
        } catch (e) {
            console.warn('Basic Practices link failed:', e.message);
        }

        // --- Navigate directly to home URL for FAQ section ---
        console.log('Navigating directly to home URL for FAQ section...');
        await page.goto(HFN_URL);
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Switch back to Ukrainian ---
        console.log('Switching language back to UA for FAQ section...');
        await switchToUkrainian(page);
        await takeScreenshot(page, 'Home_UA_Before_FAQ');

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

        await takeScreenshot(page, 'FAQs_Expanded_UA');

        console.log('✓ Ukrainian full flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Ukrainian_Full_Flow_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});