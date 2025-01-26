const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { allure } = require('allure-playwright');

// Base directory where all screenshots will be stored
const baseDir = '/Users/htcuser/Documents/HFN_Web_Automation/Screenshots';

// Store the screenshot metadata (optional, can be used for debugging/logging)
let screenshotEntries = [];

// Function to format the current date and time
const getFormattedDateTime = () => {
    const now = new Date();

    // Format the date as DD-MMM-YYYY
    const formattedDate = now.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    }).replace(/ /g, '-');

    // Format the time as HH-MM-SS AM/PM
    const formattedTime = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    }).replace(/:/g, '-');

    return `${formattedDate}__${formattedTime}`;
};

// Create a new folder for each test session, named with the current date and time
const createSessionFolder = () => {
    const folderName = getFormattedDateTime(); 
    const sessionDir = path.join(baseDir, folderName);

    // Always create the folder (even if the name already exists due to OS rules)
    fs.mkdirSync(sessionDir, { recursive: true });

    return sessionDir;
};

// Create a session folder for this test run
const sessionDir = createSessionFolder();

async function takeScreenshot(page, actionName) {
    if (!actionName) {
        throw new Error('Action name is required to save the screenshot.');
    }

    // Construct the full file path for the screenshot
    const timestamp = Date.now();
    const screenshotFileName = `${actionName}_${timestamp}.png`;
    const screenshotPath = path.join(sessionDir, screenshotFileName);

    // Take a screenshot and save it to the specified path
    await page.screenshot({ path: screenshotPath });

    // Optional: Create the metadata entry for the screenshot
    const createdAt = new Date(timestamp).toLocaleString();
    screenshotEntries.push({
        actionName: actionName,
        screenshotPath: screenshotPath,
        createdAt: createdAt,
    });

    console.log(`Screenshot saved at: ${path.resolve(screenshotPath)}`);

    // Add screenshot to Allure report
    allure.attachment(`${actionName} screenshot`, fs.readFileSync(screenshotPath), 'image/png');
}

// To use this function, export it:
module.exports = { takeScreenshot };
