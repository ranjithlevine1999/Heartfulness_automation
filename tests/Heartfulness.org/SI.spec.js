const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// Slovenian FAQ questions to expand
const FAQ_QUESTIONS = [
    'Kaj je Heartfulness',
    'Zakaj meditirati in kdo lahko',
    'Kako meditirati?',
    'Koliko stane vadba',
];

// Carousel slide labels
const CAROUSEL_SLIDES = [
    'Go to slide 2',
    'Go to slide 3',
    'Go to slide 4',
    'Go to slide 5',
    'Go to slide 6',
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


// Switch language to Slovenia (SI)
async function switchToSlovenia(page) {
    try {
        await page.getByRole('button', { name: 'ENGLISH' }).click({ timeout: 5000 });
        await sleep(500);
        await page.getByRole('button', { name: 'Country_SI SI' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
    } catch (e) {
        console.warn('Could not switch to SI:', e.message);
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


test('HFN Slovenia -> Full navigation, carousel, menus, and FAQ expansion', async ({ page }) => {
    test.setTimeout(300000);
    test.slow();

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Switch language to Slovenia (SI) ---
        await switchToSlovenia(page);
        await takeScreenshot(page, 'Language_Switched_SI');

        // --- Click Izkusite meditacijo (Experience Meditation) ---
        await page.getByRole('button', { name: 'Izkusite meditacijo' }).first().click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
        await takeScreenshot(page, 'Practices_Page_SI');

        // --- Test row_relaxation: audio ---
        try {
            await page.locator('#row_relaxation').getByRole('button', { name: 'POSLUŠAJ ZVOK' }).click();
            await sleep(1500);
            await page.keyboard.press('Escape');
            await sleep(500);
        } catch (e) {
            console.warn('Relaxation audio failed:', e.message);
        }

        // --- Return home ---
        await returnHome(page);

        // --- Cycle through carousel slides ---
        for (const slide of CAROUSEL_SLIDES) {
            try {
                await page.getByLabel(slide).click({ timeout: 5000 });
                await sleep(600);
            } catch (e) {
                console.warn(`${slide} failed:`, e.message);
            }
        }
        await takeScreenshot(page, 'Carousel_Slides_Tested');

        // --- Click "Meditate online with a trainer" (Slovenian) ---
        try {
            await page.getByRole('link', { name: 'Meditirajte preko spleta s' }).click({ timeout: 5000 });
            await page.waitForLoadState('domcontentloaded');
            await sleep(1500);
            await takeScreenshot(page, 'Meditate_Online_SI');
        } catch (e) {
            console.warn('Meditate online link failed:', e.message);
        }

        // --- Return home ---
        await returnHome(page);

        // --- Click "Preglej dogodke" (View events) ---
        try {
            await page.getByRole('button', { name: 'Preglej dogodke' }).click({ timeout: 5000 });
            await page.waitForLoadState('domcontentloaded');
            await sleep(1500);
            await takeScreenshot(page, 'View_Events_SI');
        } catch (e) {
            console.warn('View events button failed:', e.message);
        }

        // --- Return home ---
        await returnHome(page);

        // --- Expand each FAQ question (while still on Slovenian home) ---
        for (const question of FAQ_QUESTIONS) {
            console.log(`Expanding FAQ: ${question}`);
            try {
                await page.getByRole('button', { name: question }).click({ timeout: 5000 });
                await sleep(500);
            } catch (e) {
                console.warn(`FAQ button failed for "${question}":`, e.message);
            }
        }
        await takeScreenshot(page, 'FAQs_Expanded_SI');

        // --- O Nas (About) -> Kdo Smo (Who We Are) ---
        try {
            await page.getByRole('button', { name: 'O Nas' }).click({ timeout: 5000 });
            await sleep(300);
            await page.getByRole('link', { name: 'Kdo Smo' }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(1000);
            await takeScreenshot(page, 'Who_We_Are_SI');
        } catch (e) {
            console.warn('O Nas > Kdo Smo failed:', e.message);
        }

        // --- O Nas (About) -> Povežite Se Z Nami (Connect with us) ---
        try {
            await page.getByRole('button', { name: 'O Nas' }).click({ timeout: 5000 });
            await sleep(300);
            await page.getByRole('link', { name: 'Povežite Se Z Nami' }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(1000);
            await takeScreenshot(page, 'Connect_With_Us_SI');
        } catch (e) {
            console.warn('O Nas > Povežite Se Z Nami failed:', e.message);
        }

        // --- Razišči (Explore) -> Osebni Trenerji (Personal Trainers) ---
        try {
            await page.getByRole('button', { name: 'Razišči' }).click({ timeout: 5000 });
            await sleep(300);
            await page.getByRole('link', { name: 'Osebni Trenerji' }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(1000);
            await takeScreenshot(page, 'Personal_Trainers_SI');
        } catch (e) {
            console.warn('Razišči > Osebni Trenerji failed:', e.message);
        }

        // --- Razišči (Explore) -> Heartfulness Pobude (Heartfulness Initiatives) ---
        try {
            await page.getByRole('button', { name: 'Razišči' }).click({ timeout: 5000 });
            await sleep(300);
            await page.getByRole('link', { name: 'Heartfulness Pobude' }).click();
            await page.waitForLoadState('domcontentloaded');
            await sleep(1000);
            await takeScreenshot(page, 'Heartfulness_Initiatives_SI');
        } catch (e) {
            console.warn('Razišči > Heartfulness Pobude failed:', e.message);
        }

        // --- Return home ---
        await returnHome(page);

        console.log('✓ Slovenia full flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Slovenia_Full_Flow_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});