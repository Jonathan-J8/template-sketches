import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
	server: {
		port: 8080,
	},

	plugins: [glsl({ minify: true, exclude: [/node_modules/, /dist/, /tests/] }), tailwindcss()],

	test: {
		environment: 'jsdom',
	},
});
