import { expect, test } from '@playwright/test';
import { exec } from 'node:child_process';
import path from 'node:path';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd());
const DURATION = 4000;

// copy video file to public folder after test
// eslint-disable-next-line
test.afterAll(async ({}, testInfo) => {
	const from = path.resolve(testInfo.outputDir, 'video.webm');
	const to = path.resolve(`./public/${env.VITE_TITLE}.mp4`);

	try {
		// fs.copyFileSync(from, to);
		await new Promise((resolve, reject) => {
			exec(
				`ffmpeg -y -i "${from}" -c:v libx264 -an -movflags +faststart "${to}"`,
				(error) => {
					if (error) reject(error);
					resolve(to);
				},
			);
		});
	} catch (e) {
		console.error('Error copying video file:', e);
	}
});

// this test is expected to fail to produce video and screenshot
test.fail('produce video and screenshot on test failed', async ({ page }) => {
	await page.setViewportSize({ width: 640, height: 320 }); // same as video size from config
	await page.goto(`${env.VITE_HOST}${env.VITE_BASE_URL}`);

	const ctrl = page.locator('div[role="button"]', { hasText: /Control/ });
	await ctrl.click(); // close gui controls
	await page.waitForTimeout(1000);

	await page.screenshot({ path: `./public/${env.VITE_TITLE}.png` });
	await page.waitForTimeout(DURATION);

	await expect(page).toHaveTitle('ljfslfjsdjfsljfljsdf'); // needed to fail test and generate video
});
