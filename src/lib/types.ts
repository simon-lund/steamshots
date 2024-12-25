export type TApp = {
    id: number,
    name: string,
}

export type TSearchResult = {
    item: { appid: number, name: string },
    score: number,
    matches: never[],
}

export type TAppState = {
    isNewApp: boolean,
    steamId?: string,
}