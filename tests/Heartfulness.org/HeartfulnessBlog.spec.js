const { test, expect } = require('@playwright/test');

test('Heartfuness Blog', async ({ page }, testInfo) => {
    
    // Increase the test timeout to avoid premature termination
    
    test.setTimeout(120000); // 2 minutes

    // Navigate to the  website
    const url = 'https://heartfulness.org/global/heartfulness-blogs';
    await page.goto(url);

    // Selectors
    const parentSelector = "//div[@class='p-dataview-content']";
    const childSelector = "//div[@class='HoH-wrapper-content--container']";

    let allTitles = []; //store all titles

    // Loop through all pagination pages
    while (true) {
        // Wait for the parent element
        await page.locator(parentSelector).waitFor({ timeout: 10000 });

        // Extract titles from child elements
        const childElements = page.locator(childSelector);
        const childCount = await childElements.count();
        for (let i = 0; i < childCount; i++) {
            const title = await childElements.nth(i).locator('//h5[@class="HoHCards-body--title"]').textContent(); 
            allTitles.push(title.trim());
        }

        // Check for the "Next Page" button
        const nextButton = page.getByRole('button', { name: 'Next Page' });

        // Check if the button is clickable
        if (await nextButton.isVisible() && (await nextButton.isEnabled())) {
            // Click the "Next" button 
            await nextButton.click();
            await page.waitForTimeout(3000); // Adjust timeout 
        } else {
            // Break 
            break;
        }
    }

    // Generate the HTML table
    let htmlTable = `<table border="1" style="border-collapse: collapse; width: 100%;">`;
    htmlTable += `<thead>
        <tr>
            <th style="padding: 8px; text-align: left;">Index</th>
            <th style="padding: 8px; text-align: left;">Title</th>
        </tr>
    </thead>`;
    htmlTable += `<tbody>`;
    allTitles.forEach((title, index) => {
        htmlTable += `<tr>
            <td style="padding: 8px; text-align: left;">${index + 1}</td>
            <td style="padding: 8px; text-align: left;">${title}</td>
        </tr>`;
    });
    htmlTable += `</tbody></table>`;

    // Attach the HTML table to the Playwright test report
    await testInfo.attach('Card Titles Table', {
        body: htmlTable,
        contentType: 'text/html',
    });

    // Validation : Ensure at least one card is found
   // expect(allTitles.length).toBeGreaterThan(0);
});
