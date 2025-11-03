import { expect, test } from '@playwright/test';

import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd());

test('has public environment variables reflected in HTML', async ({ page }) => {
	await page.goto(`${env.VITE_HOST}${env.VITE_BASE_URL}`);

	await expect(page).toHaveTitle(env.VITE_TITLE);
	const favicon = page.locator('head link[rel="icon"]');
	await expect(favicon).toHaveAttribute('href');
	const description = page.locator('head meta[name="description"]');
	await expect(description).toHaveAttribute('content', env.VITE_DESCRIPTION);

	const ogTitle = page.locator('head meta[property="og:title"]');
	await expect(ogTitle).toHaveAttribute('content', env.VITE_OG_TITLE);
	const ogDescription = page.locator('head meta[property="og:description"]');
	await expect(ogDescription).toHaveAttribute('content', env.VITE_DESCRIPTION);

	const regx = new RegExp(`${env.VITE_HOST}${env.VITE_BASE_URL}`);
	const ogImage = page.locator('head meta[property="og:image"]');
	await expect(ogImage).toHaveAttribute('content', regx);
	const ogVideo = page.locator('head meta[property="og:video"]');
	await expect(ogVideo).toHaveAttribute('content', regx);
	const ogUrl = page.locator('head meta[property="og:url"]');
	await expect(ogUrl).toHaveAttribute('content', regx);
});
