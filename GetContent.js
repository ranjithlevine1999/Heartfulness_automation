import fetch from 'node-fetch';
import fs from 'fs/promises';

async function getEmailTemplates() {
    const apiUrl = "https://profile.srcm.net/uep/events/25527f63-bd0e-4a47-923c-de0790945241/email-templates/?page=1&page_size=10&uep_session=bcd37a8f-f243-49da-a244-d59b8c4df3fe";

    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "x-client-id": "a3kR6ZGYQRrGJ5cCp4v2HgVeMK8sKcr6850LURoL",
                "Authorization": `Bearer ${process.env.API_TOKEN}`
            }
        });

        const data = await response.json();

        // Save full JSON for inspection
        await fs.writeFile('emailTemplate.json', JSON.stringify(data, null, 2));
        console.log("Full JSON saved as emailTemplate.json");

        if (data.results && data.results.length > 0) {
            for (let i = 0; i < data.results.length; i++) {
                const template = data.results[i];
                const subject = template.subject || `No subject`;
                const htmlContent = template.content || template.html_body;

                // Print subject and HTML content in console
                console.log(`\n--- Template ${i + 1} ---`);
                console.log("Subject:", subject);
                if (htmlContent) {
                    console.log("HTML Content:", htmlContent);

                    // Save HTML file
                    await fs.writeFile(`email_${i+1}.html`, htmlContent);
                    console.log(`HTML content saved as email_${i+1}.html`);
                } else {
                    console.log("No HTML content found for this template.");
                }
            }
        } else {
            console.log("No templates found in API response.");
        }

        return data;
    } catch (error) {
        console.error("Error fetching email templates:", error.message);
    }
}

// Run the function
getEmailTemplates();
