import { join } from 'path';
import { skeleton } from '@skeletonlabs/skeleton/plugin';

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		// Append the path for the Skeleton NPM package and files:
		join(require.resolve(
			'@skeletonlabs/skeleton-svelte'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
	},
	plugins: [
		skeleton({
			themes: { preset: [ "skeleton" ] }
		})
	]
}
