import { HTTP_STATUS } from '$lib/constants';
import { error, json } from '@sveltejs/kit';
import { STEAM_API_KEY } from '$env/static/private';
import type { TApp } from '$lib/types';

type TOwnedGamesAPIResponse = {
	response: { games: { appid: number; name: string; playtime_forever: number }[] };
};

export async function GET({ url }) {
	const steamId = url.searchParams.get('steamId');
	if (!steamId) error(HTTP_STATUS.BAD_REQUEST, 'No query parameter (\'steamId\') provided');

	// Fetch games from Steam API
	const response = await fetch(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=1`);
	const data: TOwnedGamesAPIResponse = await response.json();

	// Sort games by "playtime_forever" and get app IDs
	const apps: TApp[] = data.response.games
		.sort((a, b) => b.playtime_forever - a.playtime_forever)
		.map(app => ({ id: app.appid, name: app.name }));

	return json(apps);
}