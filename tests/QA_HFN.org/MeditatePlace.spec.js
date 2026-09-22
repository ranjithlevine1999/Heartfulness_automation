const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const HFN_URL = 'https://heartfulness.org/meditation-places/';
const USERNAME = 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const PASSWORD = 'Test@123';

const SEARCH_QUERY = 'Heartfulness Meditation Center Rawalpada Dahisar East';

const CONTACT_FORM = {
    name: 'Test',
    email: 'Test@gmail.com',
    phone: '+91 89652 02589',
    location: 'chennai',
    message: 'QA',
};

const REGISTRATION_FORM = {
    firstName: 'Qa',
    lastName: 'Test',
    email: 'Test@gmail.com',
    phone: '+91 89562 30258',
    address: 'QA',
    comments: 'Test',
};

// Threshold for reporting excessive white space (in pixels)
const WHITE_SPACE_THRESHOLD = 300;

// Screenshot directory - one per test run
const SCREENSHOT_DIR = path.join(process.cwd(), 'ui-issue-screenshots', `run-${Date.now()}`);

// Global array to collect all UI issues found
const uiIssues = [];


// Ensure screenshot directory exists
function ensureDir() {
    if (!fs.existsSync(SCREENSHOT_DIR)) {
        fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
    }
}


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


// --- Sanitize filename ---
function safeFilename(str) {
    return str.replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 80);
}


// --- Capture a full-page screenshot with highlighted issue area ---
async function captureIssueScreenshot(page, issueType, pageName, yPosition, height = 200) {
    ensureDir();
    const filename = `${safeFilename(issueType)}_${safeFilename(pageName)}_${Date.now()}.png`;
    const filepath = path.join(SCREENSHOT_DIR, filename);

    // Draw a red highlight overlay at the issue Y position
    await page.evaluate(({ y, h }) => {
        // Remove any previous highlight
        const existing = document.getElementById('__ui_issue_highlight__');
        if (existing) existing.remove();

        // Add a red-bordered overlay to mark the issue area
        const overlay = document.createElement('div');
        overlay.id = '__ui_issue_highlight__';
        overlay.style.cssText = `
            position: absolute;
            top: ${y}px;
            left: 0;
            width: 100%;
            height: ${h}px;
            border: 4px solid red;
            background: rgba(255, 0, 0, 0.15);
            z-index: 999999;
            pointer-events: none;
            box-sizing: border-box;
        `;

        // Add label
        const label = document.createElement('div');
        label.style.cssText = `
            position: absolute;
            top: 4px;
            left: 4px;
            background: red;
            color: white;
            padding: 4px 10px;
            font-family: monospace;
            font-size: 14px;
            font-weight: bold;
            border-radius: 4px;
        `;
        label.textContent = `UI ISSUE: ${h}px at y=${y}px`;
        overlay.appendChild(label);

        document.body.appendChild(overlay);
    }, { y: yPosition, h: height });

    await sleep(300);

    // Scroll to bring the issue area into view
    await page.evaluate((y) => {
        window.scrollTo({ top: Math.max(0, y - 150), behavior: 'instant' });
    }, yPosition);
    await sleep(500);

    // Take full-page screenshot with the highlight visible
    try {
        await page.screenshot({
            path: filepath,
            fullPage: true,
            timeout: 10000,
        });
        console.log(`📸 Screenshot saved: ${filename}`);
    } catch (e) {
        console.warn(`Failed to capture screenshot: ${e.message}`);
    }

    // Remove the highlight overlay
    await page.evaluate(() => {
        const existing = document.getElementById('__ui_issue_highlight__');
        if (existing) existing.remove();
    });

    return filepath;
}


// --- Helper: Check for horizontal overflow (misalignment) ---
async function checkPageAlignment(page, pageName) {
    console.log(`\n=== Alignment check on: ${pageName} ===`);

    const overflow = await page.evaluate(() => {
        return {
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
            scrollHeight: document.documentElement.scrollHeight,
            clientHeight: document.documentElement.clientHeight,
        };
    });

    console.log(`Viewport: ${overflow.clientWidth}x${overflow.clientHeight}, Content: ${overflow.scrollWidth}x${overflow.scrollHeight}`);

    if (overflow.scrollWidth > overflow.clientWidth + 5) {
        const screenshotPath = await captureIssueScreenshot(
            page,
            'HORIZONTAL_OVERFLOW',
            pageName,
            0,
            overflow.clientHeight
        );

        const issue = {
            type: 'HORIZONTAL_OVERFLOW',
            page: pageName,
            severity: 'HIGH',
            details: `Page has ${overflow.scrollWidth - overflow.clientWidth}px of horizontal overflow`,
            screenshot: screenshotPath,
        };
        uiIssues.push(issue);
        console.log(`⚠ ALIGNMENT ISSUE: ${issue.details}`);
    } else {
        console.log(`✓ No horizontal overflow`);
    }
}


// --- Helper: Detect excessive white space and blank areas ---
async function checkWhiteSpace(page, pageName) {
    console.log(`\n=== White space check on: ${pageName} ===`);

    const analysis = await page.evaluate((threshold) => {
        const allElements = Array.from(document.body.querySelectorAll('*'));
        const visibleElements = allElements
            .map(el => {
                const rect = el.getBoundingClientRect();
                const style = window.getComputedStyle(el);
                return {
                    tag: el.tagName,
                    className: el.className || '',
                    top: rect.top + window.scrollY,
                    bottom: rect.bottom + window.scrollY,
                    left: rect.left,
                    right: rect.right,
                    width: rect.width,
                    height: rect.height,
                    isVisible: rect.width > 0 && rect.height > 0 &&
                               style.visibility !== 'hidden' &&
                               style.display !== 'none' &&
                               parseFloat(style.opacity) > 0,
                };
            })
            .filter(el => el.isVisible && el.height > 10 && el.width > 10)
            .sort((a, b) => a.top - b.top);

        // Find vertical gaps larger than threshold
        const verticalGaps = [];
        for (let i = 0; i < visibleElements.length - 1; i++) {
            const currentBottom = visibleElements[i].bottom;
            const nextTop = visibleElements[i + 1].top;
            const gap = nextTop - currentBottom;

            if (gap > threshold) {
                verticalGaps.push({
                    gap: Math.round(gap),
                    afterElement: `${visibleElements[i].tag}.${visibleElements[i].className || ''}`.slice(0, 60),
                    beforeElement: `${visibleElements[i + 1].tag}.${visibleElements[i + 1].className || ''}`.slice(0, 60),
                    yPosition: Math.round(currentBottom),
                });
            }
        }

        // Detect one-sided content (large blank area on left or right)
        const viewportWidth = document.documentElement.clientWidth;
        const midX = viewportWidth / 2;
        const sidedGaps = [];

        for (let i = 0; i < visibleElements.length; i++) {
            const el = visibleElements[i];
            if (el.width < viewportWidth * 0.4) {
                const isLeftSide = el.right < midX;
                const isRightSide = el.left > midX;

                if (isLeftSide || isRightSide) {
                    const sameRow = visibleElements.filter(other =>
                        other !== el &&
                        Math.abs(other.top - el.top) < 100 &&
                        other.width > viewportWidth * 0.2
                    );

                    if (sameRow.length === 0 && el.height > 200) {
                        sidedGaps.push({
                            side: isLeftSide ? 'RIGHT-blank' : 'LEFT-blank',
                            elementHeight: Math.round(el.height),
                            yPosition: Math.round(el.top),
                            element: `${el.tag}.${el.className || ''}`.slice(0, 60),
                        });
                    }
                }
            }
        }

        return {
            totalElements: visibleElements.length,
            verticalGaps: verticalGaps.slice(0, 5),
            sidedGaps: sidedGaps.slice(0, 5),
            bodyHeight: document.documentElement.scrollHeight,
            viewportWidth,
        };
    }, WHITE_SPACE_THRESHOLD);

    console.log(`Body height: ${analysis.bodyHeight}px, Visible elements: ${analysis.totalElements}`);

    // Report vertical gaps + capture screenshots
    if (analysis.verticalGaps.length > 0) {
        console.log(`⚠ Found ${analysis.verticalGaps.length} large vertical white space gaps (>${WHITE_SPACE_THRESHOLD}px):`);
        for (let idx = 0; idx < analysis.verticalGaps.length; idx++) {
            const gap = analysis.verticalGaps[idx];
            console.log(`  ${idx + 1}. Gap of ${gap.gap}px at y=${gap.yPosition}px`);

            const screenshotPath = await captureIssueScreenshot(
                page,
                'EXCESSIVE_WHITE_SPACE',
                pageName,
                gap.yPosition,
                gap.gap
            );

            uiIssues.push({
                type: 'EXCESSIVE_WHITE_SPACE',
                page: pageName,
                severity: 'MEDIUM',
                details: `Vertical gap of ${gap.gap}px at y=${gap.yPosition}px`,
                afterElement: gap.afterElement,
                beforeElement: gap.beforeElement,
                screenshot: screenshotPath,
            });
        }
    } else {
        console.log(`✓ No excessive vertical white space detected`);
    }

    // Report one-sided blank areas + capture screenshots
    if (analysis.sidedGaps.length > 0) {
        console.log(`⚠ Found ${analysis.sidedGaps.length} one-sided blank spaces:`);
        for (let idx = 0; idx < analysis.sidedGaps.length; idx++) {
            const gap = analysis.sidedGaps[idx];
            console.log(`  ${idx + 1}. ${gap.side} of ${gap.elementHeight}px tall element at y=${gap.yPosition}px`);

            const screenshotPath = await captureIssueScreenshot(
                page,
                `ONE_SIDED_${gap.side}`,
                pageName,
                gap.yPosition,
                gap.elementHeight
            );

            uiIssues.push({
                type: 'ONE_SIDED_BLANK_SPACE',
                page: pageName,
                severity: 'MEDIUM',
                details: `${gap.side} space next to ${gap.elementHeight}px element at y=${gap.yPosition}px`,
                element: gap.element,
                screenshot: screenshotPath,
            });
        }
    } else {
        console.log(`✓ No one-sided blank spaces detected`);
    }
}


// --- Helper: Print summary report of all UI issues ---
function printIssueReport() {
    console.log('\n' + '='.repeat(70));
    console.log('           UI ISSUE REPORT SUMMARY');
    console.log('='.repeat(70));

    if (uiIssues.length === 0) {
        console.log('✓ No UI alignment or white space issues detected.');
        return;
    }

    console.log(`\nTotal issues found: ${uiIssues.length}`);
    console.log(`Screenshots saved to: ${SCREENSHOT_DIR}\n`);

    // Group by type
    const grouped = uiIssues.reduce((acc, issue) => {
        acc[issue.type] = acc[issue.type] || [];
        acc[issue.type].push(issue);
        return acc;
    }, {});

    Object.entries(grouped).forEach(([type, issues]) => {
        console.log(`\n[${type}] - ${issues.length} occurrence(s)`);
        console.log('-'.repeat(70));
        issues.forEach((issue, idx) => {
            console.log(`  ${idx + 1}. Page: ${issue.page} | Severity: ${issue.severity}`);
            console.log(`     ${issue.details}`);
            if (issue.element) console.log(`     Element: ${issue.element}`);
            if (issue.screenshot) console.log(`     📸 Screenshot: ${path.basename(issue.screenshot)}`);
        });
    });

    console.log('\n' + '='.repeat(70));

    // Write a JSON report as well
    const reportPath = path.join(SCREENSHOT_DIR, 'issues-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(uiIssues, null, 2));
    console.log(`📄 JSON report saved: ${reportPath}`);
}


test.use({
    viewport: { width: 1920, height: 1080 },
});


test('HFN Meditation Places -> Booking flow with alignment and white space checks', async ({ page }) => {
    test.setTimeout(300000);

    try {
        console.log('Running with maximized viewport: 1920x1080');
        console.log(`Screenshots will be saved to: ${SCREENSHOT_DIR}\n`);

        // --- Login ---
        await loginToHFN(page);
        await checkPageAlignment(page, 'Home / Meditation Places');
        await checkWhiteSpace(page, 'Home / Meditation Places');

        // --- Search ---
        await page.getByPlaceholder('Search by Name/City', { exact: true }).fill(SEARCH_QUERY);
        await sleep(500);
        await page.getByRole('button', { name: 'Search' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
        await checkPageAlignment(page, 'Search Results');
        await checkWhiteSpace(page, 'Search Results');

        // --- Know More ---
        await page.getByRole('link', { name: 'Know More' }).first().click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
        await checkPageAlignment(page, 'Meditation Center Detail Page');
        await checkWhiteSpace(page, 'Meditation Center Detail Page');

        // --- Schedule Session ---
        await page.getByRole('link', { name: 'Schedule a Session Now' }).click();
        await page.waitForLoadState('domcontentloaded');
        await sleep(2000);
        await checkPageAlignment(page, 'Schedule Session Page');
        await checkWhiteSpace(page, 'Schedule Session Page');

        // --- Send a Message trainer card ---
        await page.locator('div')
            .filter({ hasText: /^Kunhiraman VMeditation TrainerSend a Message$/ })
            .getByRole('button').click();
        await sleep(1500);

        // --- Fill contact form ---
        await page.getByPlaceholder('Enter name').fill(CONTACT_FORM.name);
        await page.getByPlaceholder('Enter email').fill(CONTACT_FORM.email);
        await page.getByLabel('Phone Number', { exact: true }).fill(CONTACT_FORM.phone);
        await page.getByPlaceholder('Enter Location').fill(CONTACT_FORM.location);
        await page.getByPlaceholder('Enter your message...').fill(CONTACT_FORM.message);
        await page.getByLabel('I agree to the Terms &').click();
        await sleep(500);

        // --- Submit ---
        await page.getByRole('button', { name: 'SUBMIT' }).click();
        await sleep(2000);

        // --- Close success dialog ---
        try {
            await page.getByLabel('', { exact: true }).locator('div')
                .getByRole('button', { name: 'Close' }).click({ timeout: 5000 });
            await sleep(1000);
        } catch (e) {
            console.warn('Close button not found:', e.message);
        }

        // --- Submit registration form step ---
        try {
            await page.getByRole('button', { name: 'Submit' }).click({ timeout: 5000 });
            await sleep(1500);
        } catch (e) {
            console.warn('Second Submit not found:', e.message);
        }

        // --- Fill registration form ---
        await page.getByLabel('First Name*').fill(REGISTRATION_FORM.firstName);
        await page.getByLabel('Last Name*').fill(REGISTRATION_FORM.lastName);
        await page.getByLabel('Email*').fill(REGISTRATION_FORM.email);
        await page.getByPlaceholder('Enter phone number').fill(REGISTRATION_FORM.phone);
        await page.getByLabel('Address*').fill(REGISTRATION_FORM.address);
        await page.getByLabel('Comments*').fill(REGISTRATION_FORM.comments);
        await sleep(500);
        await checkPageAlignment(page, 'Registration Form');
        await checkWhiteSpace(page, 'Registration Form');

        // --- reCAPTCHA ---
        try {
            await page.locator('iframe[name="a-fxxzro741fnj"]').contentFrame()
                .getByLabel("I'm not a robot").click({ timeout: 5000 });
            await sleep(1500);
        } catch (e) {
            console.warn('reCAPTCHA click failed (expected in automation):', e.message);
        }

        console.log('\n✓ Booking flow completed');
    } catch (error) {
        console.error('Test failed:', error.message);
        console.error('Current URL at failure:', page.url());
        if (!page.isClosed()) {
            try {
                await page.screenshot({
                    path: path.join(SCREENSHOT_DIR, `fatal-error-${Date.now()}.png`),
                    fullPage: true,
                    timeout: 5000
                });
            } catch (screenshotError) {
                console.error('Screenshot failed:', screenshotError.message);
            }
        }
        printIssueReport();
        throw error;
    }

    printIssueReport();

    const criticalIssues = uiIssues.filter(i => i.severity === 'HIGH');
    if (criticalIssues.length > 0) {
        throw new Error(`${criticalIssues.length} critical UI alignment issue(s) detected. See report above.`);
    }
});