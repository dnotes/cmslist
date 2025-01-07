import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite'
import { quickpickle } from 'quickpickle'

export default defineConfig({
	plugins: [sveltekit(),quickpickle({
		// General quickpickle configuration
		explodeTags: [
			['nojs','js'],
			['chromium','firefox','webkit'],
			['mobile','tablet','desktop','widescreen'],
		],

		// PlaywrightWorld configuration
		worldConfig: {
			port: 5173, // sets the port
			slowMo: 80, // turns on "slowMo" for 50ms
			screenshotDir: 'tests/screenshots',
		}
	})],
	test: {
		include: ['**/*.feature'],
		setupFiles: ['./tests/qp.steps.ts'],
		testTimeout: 15000,
	}
});
