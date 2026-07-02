const { test, expect } = require('@playwright/test');
//const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ESSAY_EVENT_URL = 'https://awsstaging.heartfulness.org/education/essay-event/';
const USERNAME = 'karthiga.natarajan@volunteer.heartfulness.org';
const PASSWORD = 'Welcome@123';

async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}


test('Essay Event -> Participant filter combinations', async ({ page }) => {
    test.setTimeout(120000);

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

        await institutionPage.getByLabel('User Name').fill(USERNAME);
        await institutionPage.getByLabel('Password').fill(PASSWORD);
        await institutionPage.getByRole('button', { name: 'Login' }).click();
        await institutionPage.waitForLoadState('domcontentloaded');
        await sleep(1000);

        // --- Navigate to Participant page ---
        await institutionPage.getByRole('link', { name: 'Participant', exact: true }).click();
        await institutionPage.waitForLoadState('domcontentloaded');

        // --- Initial filter setup ---
        await institutionPage.locator('#category').selectOption('1');
        await institutionPage.locator('#is_blocked').selectOption('0');

        // --- Filter combinations to test ---
        // Each combination: role + optional rank, then search
        const filterCombinations = [
            { role: '8',  rank: 'I0' },
            { role: '9',  rank: 'R'  },
            { role: '9',  rank: 'S'  }, // role stays 9, rank changes to S
            { role: '10', rank: null },
            { role: '11', rank: null },
            { role: '12', rank: null },
            { role: '7',  rank: 'S'  },
        ];

        for (const { role, rank } of filterCombinations) {
            await institutionPage.locator('#role').selectOption(role);
            if (rank) {
                await institutionPage.locator('#rank').selectOption(rank);
            }
            await institutionPage.getByRole('button', { name: 'Search' }).click();
            await sleep(800);
        }

        // --- Final filter: evaluator dropdown ---
        await institutionPage.locator('#eval').selectOption('3188');
        await institutionPage.getByRole('button', { name: 'Search' }).click();
        await sleep(800);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-essay-filter-${Date.now()}.png`,
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