//.use in the teriminal to run this script
//  
//GMAIL_APP_PASSWORD="subrmfikkdqpyhdh" npx playwright test tests/EssayEvent/EndUser/DS_LangVerify.spec.js --project=chromium --headed --workers=1

import { test, expect } from '@playwright/test';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';
import path from 'path';

const GMAIL_USER = process.env.GMAIL_USER || 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const ASSETS = '/Users/htcuser/Documents/HFN_Web_Automation/assets/EssayEvent';

const LANGUAGES = [
  'Assamese', 'Bengali', 'English', 'Gujarati', 'Hindi', 'Kannada',
  'Malayalam', 'Marathi', 'Odia', 'Punjabi', 'Tamil', 'Telugu',
];

// Code = first 3 letters of the language, uppercased — UNLESS overridden here.
const CODE_OVERRIDES = {
  Assamese: 'AS',
  Odia: 'ORI',
  // add more as the run reveals them, e.g. Odia: 'OD', Punjabi: 'PUN'
};

const expectedCode = (language) =>
  (CODE_OVERRIDES[language] || language.slice(0, 3)).toUpperCase();

test.describe('Direct essay submission - all languages', () => {
  for (const language of LANGUAGES) {
    test(`${language} (${expectedCode(language)})`, async ({ page }) => {
      test.setTimeout(150000);

      const randomName = (n = 8) =>
        Array.from({ length: n }, () =>
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 52)]
        ).join('');

      await page.goto('https://awsstaging.heartfulness.org/education/essay-event/');

      const page1Promise = page.waitForEvent('popup');
      await page.locator('#banner').getByRole('link', { name: 'Direct Submission' }).click();
      const page1 = await page1Promise;
      await waitForLoader(page1);

      const page2Promise = page1.waitForEvent('popup');
      await page1.getByRole('link', { name: 'Download' }).click();
      const page2 = await page2Promise;
      await page2.close().catch(() => {});

      const participantName = randomName(8);
      const parentName = randomName(8);
      console.log(`[${language}] Participant: ${participantName} | Parent: ${parentName}`);

      await page1.getByLabel('Participant Name*').fill(participantName);
      await page1.getByLabel('Name of Mother / Father /').fill(parentName);
      await page1.getByLabel('Address Line 1').fill('khana');
      await page1.locator('#line2').fill('shanthi');
      await page1.getByLabel('City/Village/Town of').fill('chennai');
      await page1.getByText('Chennai, Chennai, TAMIL NADU').click();
      await waitForLoader(page1);

      await page1.getByLabel('Participant Age*').fill('22');
      await page1.locator('#gender').selectOption('1');
      await page1.getByLabel('Name of your Institution').fill('Shanthivam');
      await page1.getByLabel('E mail id of your Institution').fill('santhi@gmail.com');
      await page1.getByLabel('Address of participants').fill('hyder');
      await page1.getByLabel('Institution Address line').fill('bad');
      await page1.getByLabel("City of participant's").fill('chennai');
      await page1.locator('#ui-id-6').click();
      await waitForLoader(page1);
      await page1.getByLabel('Contact details of').fill('8987858696');

      await page1.getByLabel('Language selected for writing').selectOption({ label: language });

      await page1.getByLabel('Enter the participant email').fill(GMAIL_USER);

      const baselineUid = await gmailNextUid();

      await page1.getByRole('button', { name: 'Send Verification Code' }).click();
      await waitForLoader(page1);

      await page1.getByLabel('Upload participants essay*').setInputFiles(path.join(ASSETS, 'dummy_essay.pdf'));
      await page1.getByLabel('Upload Age Proof*').setInputFiles(path.join(ASSETS, 'dummy_institution_id.pdf'));

      await page1.getByLabel('How did you know about event*').selectOption('Social Media');

      await page1.locator('#ageaccept').check({ force: true });
      await page1.locator('#condition1').check({ force: true });
      await page1.locator('#condition2').check({ force: true });
      await page1.locator('#userConsent').check({ force: true });
      await page1.locator('#agedeclare2').check({ force: true });
      await page1.locator('#correctentries').check({ force: true });

      const otp = await getOtpFromGmail({ afterUid: baselineUid });
      console.log(`[${language}] OTP retrieved: ${otp}`);

      await page1.getByLabel('Please enter the Verification').fill(otp);
      await page1.getByRole('button', { name: 'Verify' }).click();
      await waitForLoader(page1);

      await page1.getByRole('button', { name: 'Submit' }).click();
      await waitForLoader(page1);

      await page1.getByRole('button', { name: 'Confirm', exact: true }).click();
      await waitForLoader(page1);

      await expect(page1.getByText('Submission Successful')).toBeVisible({ timeout: 15000 });
      const enrollmentId = (await page1.getByText(/^[A-Z]{2}\/.*\/\d+$/).innerText()).trim();
      const actualCode = enrollmentId.split('/')[2];
      const wantCode = expectedCode(language);
      console.log(`[${language}] Enrollment ID: ${enrollmentId} | got: ${actualCode} | expected: ${wantCode}`);

      expect(actualCode, `Language code mismatch for ${language}`).toBe(wantCode);

      await page1.getByLabel('Close').click();
    });
  }
});

async function waitForLoader(page) {
  const loader = page.locator('#loader');
  await page.waitForTimeout(300);
  await loader.waitFor({ state: 'hidden' }).catch(() => {});
}

function makeImapClient() {
  if (!GMAIL_APP_PASSWORD) throw new Error('GMAIL_APP_PASSWORD env var is not set.');
  return new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    logger: false,
  });
}

async function gmailNextUid() {
  const client = makeImapClient();
  await client.connect();
  try {
    const status = await client.status('INBOX', { uidNext: true });
    return status.uidNext;
  } finally {
    await client.logout();
  }
}

async function getOtpFromGmail({ afterUid, timeoutMs = 60000 } = {}) {
  const client = makeImapClient();
  await client.connect();

  const patterns = [
    /Verification Code[:\s]*([0-9]{4,8})/i,
    /verification code[\s\S]*?\bis\s+([0-9]{4,8})/i,
  ];

  try {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
      const lock = await client.getMailboxLock('INBOX');
      try {
        const fresh = [];
        for await (const msg of client.fetch(
          `${afterUid}:*`,
          { uid: true, source: true, internalDate: true, envelope: true },
          { uid: true }
        )) {
          if (msg.uid >= afterUid) fresh.push(msg);
        }

        fresh.sort((a, b) => new Date(b.internalDate) - new Date(a.internalDate));

        for (const msg of fresh) {
          const parsed = await simpleParser(msg.source);
          const clean = `${parsed.text || ''}\n${parsed.html || ''}`
            .replace(/<[^>]+>/g, ' ')
            .replace(/&nbsp;/gi, ' ')
            .replace(/\s+/g, ' ');

          for (const re of patterns) {
            const m = clean.match(re);
            if (m) {
              console.log(
                `Using email received at ${new Date(msg.internalDate).toLocaleString()} | subject: "${msg.envelope?.subject || ''}"`
              );
              return m[1];
            }
          }
        }
      } finally {
        lock.release();
      }
      await new Promise((r) => setTimeout(r, 3000));
    }

    throw new Error('No fresh OTP email arrived within timeout.');
  } finally {
    await client.logout();
  }
}