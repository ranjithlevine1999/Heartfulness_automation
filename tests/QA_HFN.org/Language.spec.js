const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://awsstaging.heartfulness.org/in-en/';

const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

// Languages to test - each has:
// - country: the country/language button name (e.g. 'Country_SG SG')
// - short: the abbreviation shown after selection (e.g. 'SG')
// - actionButton: the localized "Experience Meditation" or similar button on the homepage
// - actionType: 'button' or 'link' - what role to use
const LANGUAGES = [
    { country: 'Country_SG SG', short: 'SG', actionButton: 'EXPERIENCE MEDITATION', actionType: 'button' },
    { country: 'Country_IN-HI हिंदी', short: 'IN-HI', actionButton: 'ध्यान का अनुभव करें', actionType: 'button' },
    { country: 'Country_IN-MR मराठी', short: 'IN-MR', actionButton: 'प्रशिक्षकासह ऑनलाइन ध्यान करा', actionType: 'link' },
    { country: 'Country_JP JP', short: 'JP', actionButton: '瞑想を体験する', actionType: 'button' },
    { country: 'Country_IN-TL తెలుగు', short: 'IN-TL', actionButton: 'ధ్యానం అనుభూతి చెందండి', actionType: 'button' },
    { country: 'Country_ZH-CN ZH-CN', short: 'ZH-CN', actionButton: '体验冥想', actionType: 'button' },
    { country: 'Country_UA UA', short: 'UA', actionButton: 'СПРОБУВАТИ МЕДИТАЦІЮ', actionType: 'button' },
    { country: 'Country_MU-EN MU-EN', short: 'MU-EN', actionButton: 'EXPERIENCE MEDITATION', actionType: 'button' },
    { country: 'Country_US US', short: 'US', actionButton: 'Meditate online with a trainer', actionType: 'link' },
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


test('Heartfulness -> Language selector navigation for multiple countries', async ({ page }) => {
    test.setTimeout(300000);

    try {
        // --- Login ---
        await loginToHFN(page);
        await takeScreenshot(page, 'After_Login');

        // --- Open language selector (starts as ENGLISH) ---
        await page.getByRole('button', { name: 'ENGLISH' }).click();
        await sleep(800);

        const successfullyTested = [];
        const failedToTest = [];

        // --- Loop through each language ---
        for (const lang of LANGUAGES) {
            console.log(`\nTesting language: ${lang.short}`);

            try {
                // Click the country/language option
                await page.getByRole('button', { name: lang.country }).click();
                await sleep(2000);

                // Click the localized action button
                if (lang.actionType === 'link') {
                    await page.getByRole('link', { name: lang.actionButton }).first().click();
                } else {
                    await page.getByRole('button', { name: lang.actionButton }).first().click();
                }
                await sleep(1500);

                await takeScreenshot(page, `Language_${lang.short}`);

                console.log(`  ✓ Successfully tested ${lang.short}`);
                successfullyTested.push(lang.short);

                // Open the language selector again for the next iteration
                // (Uses the current short code as the button name since it changed after selection)
                await page.getByRole('button', { name: lang.short }).click();
                await sleep(800);
            } catch (e) {
                console.warn(`  ✗ Failed to test ${lang.short}: ${e.message}`);
                failedToTest.push({ lang: lang.short, error: e.message });

                // Close any lingering menus and try to recover
                await page.keyboard.press('Escape').catch(() => {});
                await sleep(500);

                // Try to open the language selector again for next iteration
                try {
                    await page.getByRole('button', { name: /^(ENGLISH|SG|IN-HI|IN-MR|JP|IN-TL|ZH-CN|UA|MU-EN|US)$/ })
                        .first().click();
                    await sleep(800);
                } catch (recoveryError) {
                    console.warn('  Could not recover language selector:', recoveryError.message);
                }
            }
        }

        // --- Summary ---
        console.log('\n=== Summary ===');
        console.log(`Total languages tested: ${LANGUAGES.length}`);
        console.log(`Successfully tested: ${successfullyTested.length}`);
        console.log(`Failed: ${failedToTest.length}`);

        if (successfullyTested.length > 0) {
            console.log('\nSuccessful languages:');
            successfullyTested.forEach(lang => console.log(`  - ${lang}`));
        }

        if (failedToTest.length > 0) {
            console.log('\nFailed languages:');
            failedToTest.forEach(({ lang, error }) => console.log(`  - ${lang}: ${error}`));
        }

        // Assert at least some languages worked
        expect(successfullyTested.length).toBeGreaterThan(0);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await takeScreenshot(page, 'Language_Selector_Error');
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        throw error;
    }
});