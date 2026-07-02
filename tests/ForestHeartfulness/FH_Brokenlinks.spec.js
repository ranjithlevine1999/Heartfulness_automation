const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const FORESTS_URL = 'https://forest.staging.heartfulness.org/forests/';

async function handlePopup(popupPromise) {
    const popup = await popupPromise;
    try {
        await popup.waitForLoadState('domcontentloaded', { timeout: 5000 });
    } catch (e) {
        // Popup didn't fully load - okay
    }
    await popup.close();
}

// Hide the QA/STAGING banner on the current page state
async function hideStagingBanner(page) {
    await page.evaluate(() => {
        const banners = Array.from(document.querySelectorAll('div'))
            .filter(div => div.textContent?.trim() === 'QA/STAGING SERVER');
        banners.forEach(b => b.style.display = 'none');
    });
}


test('Heartfulness Forest -> Nav and Footer links', async ({ page }) => {
    test.setTimeout(90000);

    // Register a hook to hide the banner whenever the page navigates or re-renders
    page.on('framenavigated', async () => {
        try {
            await hideStagingBanner(page);
        } catch (e) {
            // Frame might not be ready yet - ignore
        }
    });

    try {
        await page.goto(FORESTS_URL);
        await hideStagingBanner(page);

        // --- Same-page anchor links (scroll to sections) ---
        const navLinks = [
            'Introduction',
            'Donations & Gifting',
            'Contact',
            'FAQs',
            'Our Team',
        ];

        for (const linkName of navLinks) {
            await page.getByRole('link', { name: linkName, exact: true }).click();
            await sleep(800);
        }

        // --- Footer popup links ---
        const popupLinks = [
            'Terms & Conditions',
            'Privacy Policy',
            'Refund Policy',
        ];

        for (const linkName of popupLinks) {
            const popupPromise = page.waitForEvent('popup');
            await page.getByRole('link', { name: linkName, exact: true }).click();
            await handlePopup(popupPromise);
        }

        // --- MHA Documents ---
        await page.getByRole('link', { name: 'MHA Documents' }).click();
        await sleep(1000);
        await hideStagingBanner(page); // re-hide after navigation

        // --- Process link ---
        await page.getByRole('link', { name: 'Process', exact: true }).click({ force: true });
        await sleep(800);
    } catch (error) {
        console.error('Test failed:', error.message);
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: `error-forests-nav-${Date.now()}.png`,
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