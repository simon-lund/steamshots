import Fuse from 'fuse.js';
import fuseOptions from '../src/lib/assets/fuse-options.json' with { type: 'json' };
import fs from 'fs';

// Download the file from steam
const response = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v2/');
const data = await response.json();

// Remove app with identical id
const appsIds = new Set();
const apps = data.applist.apps.filter((app) => {
	if (appsIds.has(app.appid)) {
		return false;
	}
	appsIds.add(app.appid);
	return true;
});

// Write the file to the disk
fs.writeFileSync('../src/lib/assets/apps.json', JSON.stringify(apps));

// Create the Fuse index
const fuseIndex = Fuse.createIndex(fuseOptions.keys, apps);
fs.writeFileSync('../src/lib/assets/apps-index.json', JSON.stringify(fuseIndex.toJSON()));
