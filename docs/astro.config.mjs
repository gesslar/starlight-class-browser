// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://starlight-class-browser.gesslar.dev',
	integrations: [
		starlight({
			title: 'Starlight Class Browser',
			logo: {
				src: './src/assets/gscb.svg',
			},
			favicon: '/favicon.png',
			customCss: ['./src/styles/custom.css'],
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/gesslar/starlight-class-browser' },
				{ icon: 'npm', label: 'npm', href: 'https://www.npmjs.com/package/@gesslar/starlight-class-browser' },
			],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Installation', slug: 'guides/installation' },
						{ label: 'Usage', slug: 'guides/usage' },
					],
				},
				{
					label: 'Components',
					autogenerate: { directory: 'components' },
				},
				{
					label: 'Examples',
					autogenerate: { directory: 'examples' },
				},
			],
		}),
	],
});
