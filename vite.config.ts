import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv } from 'vite';
import glsl from 'vite-plugin-glsl';

const env = { ...process.env, ...loadEnv(process.env.NODE_ENV || 'development', process.cwd()) };

export default defineConfig({
	plugins: [glsl({ minify: true, exclude: ['node_modules/', 'dist/', 'tests/'] }), tailwindcss()],
	server: { port: +(env.VITE_PORT || 8080) },
	base: env.VITE_BASE_URL,
});
