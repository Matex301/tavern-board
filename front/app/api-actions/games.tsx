"use client";

import { Game } from "@/app/types/Game";
import { GameName } from "../types/GameName";
import { PagedCollection } from "@/app/types/collection"

export async function fetchGames(signal: AbortSignal, page: number) {
    let url = new URL('http://localhost:8000/api/games');
    url.searchParams.set('page', page.toString());

    //console.log(url);
    
    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return data as PagedCollection<Game>;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchQuests", error);
        return null;
    }
}

export async function fetchGamesName(signal: AbortSignal) {
    let url = new URL('http://localhost:8000/api/quests/name');

    //console.log(url);

    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return data as PagedCollection<GameName>;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchQuests", error);
        return null;
    }
}