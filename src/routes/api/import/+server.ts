import { HTTP_STATUS } from '$lib/constants';
import { error, json } from '@sveltejs/kit';
import { STEAM_API_KEY } from '$env/static/private';
import appsFile from '$lib/assets/apps.json';
import type { TApp, TAppsFile } from '$lib/types';

// Map of app IDs to app names
// appsFile has type { appid: number, name: string }[]
const appsMap = (appsFile as TAppsFile).reduce((acc, app) => {
	acc[app.appid] = { id: app.appid, name: app.name };
	return acc;
}, {} as Record<number, TApp>);

export async function GET({ url }) {
	const steamId = url.searchParams.get('steamId');
	if (!steamId) error(HTTP_STATUS.BAD_REQUEST, 'No query parameter (\'steamId\') provided');

	// Fetch games from Steam API
	const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json`);
	const data: { response: { games: { appid: number, playtime_forever:number }[] } } = await response.json();

	// Sort games by "playtime_forever" and get app IDs
	const appIds: number[] = data.response.games
		.sort((a, b) => b.playtime_forever - a.playtime_forever)
		.map(app => app.appid);

	// Get names of games
	// TODO: why are not all games found????
	const apps = appIds.map(appId => appsMap[appId]).filter(Boolean);

	return json(apps);
}