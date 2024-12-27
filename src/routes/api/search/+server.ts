import Fuse from 'fuse.js';
import { error, json } from '@sveltejs/kit';
import { HTTP_STATUS } from '$lib/constants';
import fuseOptions from '$lib/assets/fuse-options.json';
import appsIndex from '$lib/assets/apps-index.json'; // Run scripts/build-index.js (pnpm build:apps-index) to generate the index file
import appsFile from '$lib/assets/apps.json';
import type { TAppsFile } from '$lib/types'; // and this file

const fuse = new Fuse(appsFile as TAppsFile, fuseOptions, Fuse.parseIndex(appsIndex));

export function GET({ url }) {
	const query = url.searchParams.get('q');
	if (!query) error(HTTP_STATUS.BAD_REQUEST, "No query parameter ('q') provided");

	const results = fuse.search(query, { limit: 10 });

	return json(results);
}
