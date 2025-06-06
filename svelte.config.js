import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // may differ from host to host
			precompress: false,
			strict: true
		}),
		kit: {
			alias: {
				"@/*": "./src/lib/*",
			},
		}
	}
};

export default config;
