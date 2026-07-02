const { test, expect } = require('@playwright/test');
const { takeScreenshot } = require('../../utils/CommonClass');

// Utility function for sleep
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


test('Green Khana Run -> Race Info / FAQs screen', async ({ page }) => {
    try {
        await page.goto('https://staging.greenheartfulnessrun.com/');

        // Navigate to Race Info > FAQs
        await page.getByRole('link', { name: 'Race Info' }).click();
        await page.locator('#main-wrapper').getByRole('link', { name: 'FAQs' }).click();

        // Expand all FAQ accordions
        const faqButtons = [
            '1. When and where is the',
            '2. What are the race',
            'What is the race route? +',
            'How do I apply for the event? +',
            '5. How much is the',
            '6. What does the application',
            'Can I Apply Offline? +',
            '8. What is the last date to',
            '9. Can I cancel my',
            '10. Where do I collect my',
            '11. What do I need to bring',
            '12. Can someone else collect',
            '13. I am a visually impaired',
            '14. I have made a mistake in',
            '15. I have moved. How do I',
            '16. I am an overseas',
            'How do I train for the race? +',
            '18. How do I know what I have',
            '19. Will there be water/',
            '20. As a spectator, any',
            '21. I will be a spectator for',
            '22. Will there be TV coverage',
            'Where can I find the results? +',
            '24. Can I choose to raise',
            '25. Who are the other',
            '26. How can I become a',
        ];

        for (const buttonName of faqButtons) {
            await page.getByRole('button', { name: buttonName }).click();
        }

        // Navigate to Terms & Conditions
        await page.getByRole('link', { name: 'Race Info' }).click();
        await page.locator('#main-wrapper').getByRole('link', { name: 'Terms & Conditions' }).click();

        // Return to Race Info
        await page.getByRole('link', { name: 'Race Info' }).click();
    } catch (error) {
        console.error('Test failed:', error.message);
        await page.screenshot({ path: `error-faqs-${Date.now()}.png`, fullPage: true });
        throw error;
    }
});