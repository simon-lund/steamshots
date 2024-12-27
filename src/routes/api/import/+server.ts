import { HTTP_STATUS } from '$lib/constants';
import { error, json } from '@sveltejs/kit';
import { STEAM_API_KEY } from '$env/static/private';
import appsFile from '$lib/assets/apps.json';
import type { TApp } from '$lib/types';

// Map of app IDs to app names
// appsFile has type { appid: number, name: string }[]
const appsMap = appsFile.reduce((acc, app) => {
	acc[app.appid] = { id: app.appid, name: app.name };
	return acc;
}, {} as Record<number, TApp>);

export async function GET({ url }) {
	const steamId = url.searchParams.get('steamId');
	if (!steamId) error(HTTP_STATUS.BAD_REQUEST, 'No query parameter (\'steamId\') provided');

	// Fetch games from Steam API
	const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json`);
	const data: { response: { games: { appid: number }[] } } = await response.json();
	const appIds: number[] = data.response.games.map(app => app.appid);

	// Get names of games
	// TODO: why are not all games found????
	const apps = appIds.map(appId => appsMap[appId]).filter(Boolean);

	return json(apps);
}