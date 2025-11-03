import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd());
const DURATION = 1000;

// copy video file to public folder after test
// eslint-disable-next-line
test.afterAll(async ({}, testInfo) => {
	const from = path.resolve(testInfo.outputDir, 'video.webm');
	const to = path.resolve(`./public/${env.VITE_TITLE}.webm`);

	try {
		fs.copyFileSync(from, to);
	} catch (e) {
		console.error('Error copying video file:', e);
	}
});

// this test is expected to fail to produce video and screenshot
test.fail('produce video and screenshot on test failed', async ({ page }) => {
	await page.setViewportSize({ width: 640, height: 320 });
	await page.goto(`${env.VITE_HOST}${env.VITE_BASE_URL}`);

	const ctrl = page.locator('div[role="button"]', { hasText: /Control/ });
	await ctrl.click(); // close gui controls
	await page.waitForTimeout(1000);

	await page.screenshot({ path: `./public/${env.VITE_TITLE}.png` });
	await page.waitForTimeout(DURATION);

	await expect(page).toHaveTitle('ljfslfjsdjfsljfljsdf'); // needed to fail test and generate video
});
