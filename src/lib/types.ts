export type TApp = {
	id: number;
	name: string;
};

export type TSearchResult = {
	item: { appid: number; name: string };
	score: number;
	matches: never[];
};

export type TSettings = {
	isNewApp: boolean;
	steamId?: string;
};

export type TDialogState = {
	showSettingsDialog: boolean;
};

export type TSearchState = {
	search: string;
}

export type TAppsFile = {
	appid: number;
	name: string;
}[];