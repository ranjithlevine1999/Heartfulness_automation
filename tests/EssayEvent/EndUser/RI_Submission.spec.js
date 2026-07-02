// use this in cmd
//GMAIL_APP_PASSWORD="subrmfikkdqpyhdh" npx playwright test tests/EssayEvent/EndUser/Ri_Submission.spec.js --project=chromium --headed --workers=1


import { test, expect } from '@playwright/test';
import path from 'path';

const ASSETS = '/Users/htcuser/Documents/HFN_Web_Automation/assets/EssayEvent';
const REGISTER_URL =
  'https://awsstaging.heartfulness.org/education/essay-event/app/participant/register/6a279289cf30b';

const LANGUAGES = [
  'Assamese', 'Bengali', 'English', 'Gujarati', 'Hindi', 'Kannada',
  'Malayalam', 'Marathi', 'Odia', 'Punjabi', 'Tamil', 'Telugu',
];

const CODE_OVERRIDES = {
  Assamese: 'AS',
  Odia: 'ORI',
};

const expectedCode = (language) =>
  (CODE_OVERRIDES[language] || language.slice(0, 3)).toUpperCase();

test.describe('Participant register (token link) - all languages', () => {
  for (const language of LANGUAGES) {
    test(`${language} (${expectedCode(language)})`, async ({ page }) => {
      test.setTimeout(120000);

      const randomName = (n = 8) =>
        Array.from({ length: n }, () =>
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 52)]
        ).join('');

      await page.goto(REGISTER_URL);
      await waitForLoader(page);

      const participantName = randomName(8);
      const parentName = randomName(8);
      console.log(`[${language}] Participant: ${participantName} | Parent: ${parentName}`);

      await page.getByLabel('Participant Name*').fill(participantName);
      await page.getByLabel('Name of Mother / Father /').fill(parentName);
      await page.getByLabel('Participant Age*').fill('21');

      // NOTE: on this form the "Gender" label is wired to the Class/Course/Grade
      // text input — so this fills the COURSE field (which is required).
      await page.getByLabel('Gender').fill('BCA');

      // The real gender dropdown is #gender (1 = Male, 2 = Female)
      await page.locator('#gender').selectOption('1');

      await page.getByLabel('Language selected for writing').selectOption({ label: language });

      await page.getByLabel('Upload participants essay*').setInputFiles(path.join(ASSETS, 'dummy_essay.pdf'));
      await page.getByLabel('School/College/Institution ID').setInputFiles(path.join(ASSETS, 'dummy_institution_id.pdf'));

      await page.locator('#ageaccept').check({ force: true });
      await page.locator('#condition1').check({ force: true });
      await page.locator('#condition2').check({ force: true });
      await page.locator('#userConsent').check({ force: true });
      await page.locator('#agedeclare2').check({ force: true });
      await page.locator('#correctentries').check({ force: true });

      await page.getByRole('button', { name: 'Submit' }).click();
      await waitForLoader(page);

      const confirmBtn = page.getByRole('button', { name: 'Confirm' });
      await confirmBtn.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
      if (await confirmBtn.isVisible().catch(() => false)) {
        await confirmBtn.click();
        await waitForLoader(page);
      }

      await expect(page.getByText('Submission Successful')).toBeVisible({ timeout: 20000 });
      const enrollmentId = (await page.getByText(/^[A-Z]{2}\/.*\/\d+$/).innerText()).trim();
      const actualCode = enrollmentId.split('/')[2];
      const wantCode = expectedCode(language);
      console.log(`[${language}] Enrollment ID: ${enrollmentId} | got: ${actualCode} | expected: ${wantCode}`);

      expect(actualCode, `Language code mismatch for ${language}`).toBe(wantCode);

      await page.waitForTimeout(3000);
    });
  }
});

async function waitForLoader(page) {
  const loader = page.locator('#loader');
  await page.waitForTimeout(300);
  await loader.waitFor({ state: 'hidden' }).catch(() => {});
}