import { test, expect } from '@playwright/test';
import { ImapFlow } from 'imapflow';
import { simpleParser } from 'mailparser';

const GMAIL_USER = process.env.GMAIL_USER || 'ranjithkumar.krishnamoorthy@volunteer.heartfulness.org';
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

test('Institution registration with OTP', async ({ page }) => {
  test.setTimeout(120000);

  await page.goto('https://awsstaging.heartfulness.org/education/essay-event/');

  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Institution Registration &' }).click();
  const page1 = await page1Promise;

  await page1.getByLabel('Enter the Institution Name (').fill('Peace');
  await page1.getByRole('button', { name: 'Search' }).click();
  await waitForLoader(page1);

  await page1.getByRole('button', { name: 'Register New Institution' }).click();
  await waitForLoader(page1);

  // Random, letters-only institution name to avoid duplicates
  const institutionName = randomName(10);
  console.log('Institution name:', institutionName);

  await page1.getByLabel('Name of your Institution*').fill(institutionName);
  await page1.getByLabel('Address of Institution line 1*').fill('KHANa');
  await page1.getByLabel('Institute Phone No*').fill('8754121265');
  await page1.getByLabel('City/Village/Town of').fill('CHENa');
  await page1.getByText('Chenari, Rohtas, BIHAR').click();
  await waitForLoader(page1);

  await page1.getByLabel('Coordinator Name', { exact: true }).click();
  await page1.getByLabel('Coordinator Name', { exact: true }).fill('JEAn');
  await page1.getByLabel('Coordinator Email ID').click();
  await page1.getByLabel('Coordinator Email ID').fill('jean@gmail.com');
  await page1.getByLabel('Coordinator Contact Details').click();
  await page1.getByLabel('Coordinator Contact Details').fill('8745124540');
  await page1.getByLabel('Coordinator Type*').selectOption('Administrator');

  await page1.getByLabel('Enter the Institution email').fill(GMAIL_USER);
  await page1.getByLabel('How did you know about event*').selectOption('Common Wealth');

  const sentAt = new Date(Date.now() - 60 * 1000); // buffer for clock skew

  await page1.locator('#sendotpi').selectOption('Yes');
  await waitForLoader(page1);
  await page1.waitForTimeout(5000);

  // Read the OTP from Gmail and enter it
  const otp = await getOtpFromGmail({ since: sentAt });
  console.log('OTP retrieved:', otp);

  await page1.getByLabel('Enter the Verification code').fill(otp);
  await page1.getByRole('button', { name: 'Verify' }).click();
  await waitForLoader(page1);

  // Fail the test if the OTP was NOT accepted
  await expect(page1.getByText('Email ID Verified Successfully')).toBeVisible({ timeout: 15000 });

  await page1.waitForTimeout(2000);
  await page1.getByRole('button', { name: 'Register Institution for' }).click();
  await waitForLoader(page1);

  // A confirmation modal appears when a similar institute exists -> Confirm it
  const confirmBtn = page1.getByRole('button', { name: 'Confirm', exact: true });
  await confirmBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
  if (await confirmBtn.isVisible().catch(() => false)) {
    await confirmBtn.click();
    await waitForLoader(page1);
  }

  await page1.waitForTimeout(3000);
});

/**
 * Generates a random name using only letters (A-Z, a-z).
 */
function randomName(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let name = '';
  for (let i = 0; i < length; i++) {
    name += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return name;
}

/**
 * Waits for the #loader overlay to disappear.
 */
async function waitForLoader(page) {
  const loader = page.locator('#loader');
  await page.waitForTimeout(300);
  await loader.waitFor({ state: 'hidden' }).catch(() => {});
}

/**
 * Connects to Gmail over IMAP, polls for the OTP email since `since`, and
 * extracts the verification code. Only accepts an email that contains a
 * "Verification Code" — never a stray number.
 */
async function getOtpFromGmail({ since, timeoutMs = 60000 } = {}) {
  if (!GMAIL_APP_PASSWORD) {
    throw new Error('GMAIL_APP_PASSWORD env var is not set.');
  }

  const client = new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    logger: false,
  });

  await client.connect();
  try {
    const deadline = Date.now() + timeoutMs;
    const searchSince = since || new Date(Date.now() - 5 * 60 * 1000);

    while (Date.now() < deadline) {
      const lock = await client.getMailboxLock('INBOX');
      try {
        const uids = await client.search({ since: searchSince }, { uid: true });

        for (const uid of (uids || []).reverse()) {
          const msg = await client.fetchOne(uid, { source: true }, { uid: true });
          const parsed = await simpleParser(msg.source);

          const raw = `${parsed.text || ''}\n${parsed.html || ''}`;
          const clean = raw.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ');

          const match = clean.match(/Verification Code[:\s]*([0-9]{4,8})/i);
          if (match) return match[1];
        }
      } finally {
        lock.release();
      }
      await new Promise((r) => setTimeout(r, 3000));
    }

    throw new Error('No OTP email (with "Verification Code") found within timeout.');
  } finally {
    await client.logout();
  }
}