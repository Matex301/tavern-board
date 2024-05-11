"use client";

import { Game } from "../types/Game";
import { PagedCollection } from "../types/collection"

export async function fetchGames(signal: AbortSignal, page: number) {
    let url = `http://localhost:8000/api/games?page=${page}`;

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