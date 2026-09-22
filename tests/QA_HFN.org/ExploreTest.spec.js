const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

const CITY_SEARCH = 'chennai';
const CITY_OPTION = 'Chennai, Tamil Nadu, India';


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


test('Heartfulness -> Explore flow (Personal Trainer + Group Sessions + Initiatives)', async ({ page }) => {
    test.setTimeout(180000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Open Explore menu -> Individual Practice ---
        await page.getByRole('button', { name: 'Explore', exact: true }).click();
        await sleep(500);
        await page.getByRole('link', { name: 'Individual Practice' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);

        // --- Open Explore menu -> Personal Trainer ---
        await page.getByRole('button', { name: 'Explore' }).click();
        await sleep(500);
        await page.getByRole('link', { name: 'Personal Trainer' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        // --- Interact with the Personal Trainer iframe ---
        const trainerFrame = page.locator('iframe[title="Online Meditation"]').contentFrame();

        // Click Add (+) icon to start
        await trainerFrame.getByTestId('AddCircleOutlineIcon').locator('path').click();
        await sleep(1000);

        // Connect with a trainer
        await trainerFrame.getByRole('button', { name: 'Connect with a trainer' }).click();
        await sleep(1500);

        // Cancel the connection
        await trainerFrame.getByRole('button', { name: 'Cancel' }).click();
        await sleep(500);

        // Confirm cancellation
        await trainerFrame.getByRole('button', { name: 'Yes' }).click();
        await sleep(1000);

        // Select "Other reasons" for cancellation
        await trainerFrame.locator('label').filter({ hasText: 'Other reasons' }).click();
        await sleep(500);

        // Submit cancellation feedback
        await trainerFrame.getByRole('button', { name: 'Submit' }).click();
        await sleep(2000);

        await takeScreenshot(page, 'Trainer_Cancellation_Submitted');

        // --- Open Explore menu again -> Group Sessions ---
        await page.getByText('ExploreIndividual').click();
        await sleep(500);
        await page.getByRole('link', { name: 'Group Sessions' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(1500);

        // --- Search location for Group Sessions ---
        const locationSearch = page.getByRole('textbox', { name: 'Search Location' });
        await locationSearch.fill(CITY_SEARCH);
        await sleep(1000);
        await page.getByText(CITY_OPTION, { exact: true }).click();
        await sleep(500);

        // Click SEARCH
        await page.getByRole('button', { name: 'SEARCH', exact: true }).click();
        await sleep(2000);

        await takeScreenshot(page, 'Group_Sessions_Search');

        // --- Open Explore menu -> Heartfulness Initiatives ---
        await page.getByRole('button', { name: 'Explore' }).click();
        await sleep(500);
        await page.getByRole('link', { name: 'Heartfulness Initiatives' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);

        await takeScreenshot(page, 'Heartfulness_Initiatives');

        console.log('✓ Explore flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Explore_Flow_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});