const { test, expect } = require('@playwright/test');
//const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const LOGIN_URL = 'https://visitor.staging.heartfulness.org/admin/login';

const USERNAME = 'abhyasi.25@mailinator.com';
const PASSWORD = 'password';

// Filter columns in the Visitor Log table (matches th:nth-child positions)
const FILTERS = [
    { name: 'Name',        column: 2, value: 'Test spotTest spot'        },
    { name: 'Abhyasi ID',  column: 3, value: 'B00085387'                 },
    { name: 'Phone',       column: 4, value: '917639856721'              },
    { name: 'Email',       column: 5, value: 'fixedissue@mailinator.com' },
    { name: 'PNR',         column: 6, value: 'ID-INCM-JCOJ'              },
];

async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}

// Reusable login helper
async function loginAsAbhyasi(page) {
    await page.goto(LOGIN_URL);
    await hideStagingBanner(page);

    await page.getByRole('link', { name: 'Signin with Email' }).click();
    await page.waitForLoadState('domcontentloaded');

    await page.getByLabel('Email ID *').fill(USERNAME);
    await page.getByLabel('Password', { exact: true }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1500);
}

// Reusable navigation to Visitor Log
async function goToVisitorLog(page) {
    await page.getByRole('button', { name: ' Visitor Log' }).click();
    await page.waitForLoadState('domcontentloaded');
    await sleep(1000);
}


test.describe('Visitor Portal -> Visitor Log filters', () => {
    // Hide staging banner on every page change (applied to each test)
    test.beforeEach(async ({ page }) => {
        page.on('framenavigated', async () => {
            try {
                await hideStagingBanner(page);
            } catch (e) {
                // ignore
            }
        });
    });

    // Generate one test per filter
    for (const filter of FILTERS) {
        test(`Filter Visitor Log by ${filter.name} = "${filter.value}"`, async ({ page }) => {
            test.setTimeout(60000);

            try {
                await loginAsAbhyasi(page);
                await goToVisitorLog(page);

                // Fill the corresponding filter column
                const filterInput = page.locator(
                    `th:nth-child(${filter.column}) > div > .p-fluid > .filterElementWrapper > .hfn_input > input`
                );
                await filterInput.click();
                await filterInput.fill(filter.value);
                await sleep(1500); // let the filter debounce and results render

                // TODO: add assertion here to verify filtered results
                // Example: await expect(page.locator('.visitor-row')).toContainText(filter.value);
            } catch (error) {
                console.error(`Test failed (${filter.name}):`, error.message);
                if (!page.isClosed()) {
                    try {
                        await page.screenshot({
                            path: `error-visitor-log-${filter.name.replace(/\s/g, '')}-${Date.now()}.png`,
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
});