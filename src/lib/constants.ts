export const STEAM_SCREENSHOTS_PATH_TEMPLATE =
	'C:/Program Files (x86)/Steam/userdata/{steamID3}/760/remote/{appId}/screenshots/';
export const APP_PORTRAIT_URL_TEMPLATE =
	'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appId}/hero_capsule.jpg';
export const APP_HEADER_URL_TEMPLATE =
	'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/{appId}/header.jpg';

export enum HTTP_STATUS {
	OK = 200,
	BAD_REQUEST = 400,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500
}
