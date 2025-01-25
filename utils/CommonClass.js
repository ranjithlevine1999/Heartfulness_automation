const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');
const { allure } = require('allure-playwright');

// Base directory where all reports will be stored
const baseDir = '/Users/htcuser/Documents/HFN_Web_Automation/Report';

// Store the screenshot metadata
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

    // Create the metadata entry for the screenshot
    const createdAt = new Date(timestamp).toLocaleString();
    screenshotEntries.push({
        actionName: actionName,
        screenshotPath: screenshotPath,
        createdAt: createdAt,
    });

    console.log(`Screenshot saved at: ${path.resolve(screenshotPath)}`);

    // Add screenshot to Allure report
    allure.attachment(`${actionName} screenshot`, fs.readFileSync(screenshotPath), 'image/png');

    // Generate HTML report for all screenshots
    generateHTMLReport();
}

// Function to generate the HTML report
function generateHTMLReport() {
    // HTML Header with Enhanced CSS
    let htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Report</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    margin: 20px; 
                    background-color: #f4f4f9; 
                    color: #333; 
                }
                h1 {
                    text-align: center;
                    color: #2c3e50;
                }
                .screenshot-entry {
                    border: 1px solid #ccc; 
                    border-radius: 8px;
                    padding: 15px; 
                    margin-bottom: 20px; 
                    background-color: #fff;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header { 
                    font-size: 1.2em; 
                    margin-bottom: 10px; 
                    color: #34495e; 
                }
                .timestamp { 
                    color: #7f8c8d; 
                    font-size: 0.9em; 
                    margin-bottom: 10px; 
                }
                .screenshot-entry img { 
                    max-width: 100%; 
                    border-radius: 4px; 
                    margin-top: 10px; 
                }
                .footer {
                    text-align: center;
                    margin-top: 30px;
                    font-size: 0.9em;
                    color: #95a5a6;
                }
                .footer a {
                    color: #3498db;
                    text-decoration: none;
                }
                .footer a:hover {
                    text-decoration: underline;
                }
            </style>
        </head>
        <body>
            <h1>Screenshot Report</h1>
    `;

    // Add entries for each screenshot
    screenshotEntries.forEach(entry => {
        htmlContent += `
            <div class="screenshot-entry">
                <div class="header">Screenshot for Action: <strong>${entry.actionName}</strong></div>
                <div class="timestamp">Created at: ${entry.createdAt}</div>
                <div><img class="screenshot" src="file://${entry.screenshotPath}" alt="${entry.actionName} screenshot"></div>
            </div>
        `;
    });

    // Add footer
    htmlContent += `
            <div class="footer">
                <p>Generated by <a href="https://playwright.dev/" target="_blank">Playwright</a></p>
            </div>
        </body>
        </html>
    `;

    // Save the HTML content to a file in the session folder
    const htmlFilePath = path.join(sessionDir, 'screenshot_report.html');
    fs.writeFileSync(htmlFilePath, htmlContent);

    console.log(`HTML report generated at: ${path.resolve(htmlFilePath)}`);
}

// To use this function, export it:
module.exports = { takeScreenshot };
