const { test, expect } = require('@playwright/test');
//const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ESSAY_EVENT_URL = 'https://awsstaging.heartfulness.org/education/essay-event/';
const PASSWORD = 'Test@123';

// Users to test - each gets the same login + Participant flow
const TEST_USERS = [
    { name: 'Round2user',  email: 'Round2user@gmail.com',  role: 'Round-2'         },
    { name: 'Round3User',  email: 'Round3user@gmail.com',  role: 'Round-3'         },
    { name: 'MeritShort',  email: 'Meritshort@gmail.com',  role: 'Merit Shortlist' },
    { name: 'FinalShort',  email: 'finalShort@gmail.com',  role: 'Final Shortlist' },
];

async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}


// Run the login + Participant flow for each user
for (const user of TEST_USERS) {
    test(`Essay Event -> Login as ${user.name} (${user.role})`, async ({ page }) => {
        test.setTimeout(60000);

        try {
            page.on('framenavigated', async () => {
                try {
                    await hideStagingBanner(page);
                } catch (e) {
                    // ignore
                }
            });

            await page.goto(ESSAY_EVENT_URL);
            await hideStagingBanner(page);

            // --- Open Institution Registration in new tab ---
            const institutionPagePromise = page.waitForEvent('popup');
            await page.getByRole('link', { name: 'Institution Registration &' }).click();
            const institutionPage = await institutionPagePromise;
            await institutionPage.waitForLoadState('domcontentloaded');

            // --- Login flow ---
            await institutionPage.getByRole('link', { name: 'Login' }).click();
            await institutionPage.waitForLoadState('domcontentloaded');

            await institutionPage.getByLabel('User Name').fill(user.email);
            await institutionPage.getByLabel('Password').fill(PASSWORD);
            await institutionPage.getByRole('button', { name: 'Login' }).click();
            await institutionPage.waitForLoadState('domcontentloaded');
            await sleep(1000);

            // --- Navigate to Participant page ---
            await institutionPage.getByRole('link', { name: 'Participant' }).click();
            await institutionPage.waitForLoadState('domcontentloaded');

            // --- Click InstituteAdmin button ---
            await institutionPage.getByRole('button', { name: 'InstitueAd InstitueAdmin1' }).click();
            await sleep(1000);
        } catch (error) {
            console.error(`Test failed for ${user.email}:`, error.message);
            if (!page.isClosed()) {
                try {
                    await page.screenshot({
                        path: `error-essay-${user.name}-${Date.now()}.png`,
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
}