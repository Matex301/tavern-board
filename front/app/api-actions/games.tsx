"use client";

import { Game } from "@/app/types/Game";
import { GameSelect } from "../types/GameSelect";
import { PagedCollection } from "@/app/types/collection"

export async function fetchGames(signal: AbortSignal, page: number) {
    let url = new URL('http://localhost:8000/api/games');
    url.searchParams.set('page', page.toString());
    
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

export async function fetchGamesList(signal: AbortSignal) {
    let url = new URL('http://localhost:8000/api/list/games');

    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return data as PagedCollection<GameSelect>;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchGamesList", error);
        return null;
    }
}

export async function fetchGame(signal: AbortSignal, id: string) {
    let url = new URL(`http://localhost:8000/api/games/${id}`);

    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return new Game(data["@id"], data.id, data.name, data.description, data.image, data.minPlayers, data.maxPlayers);
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchQuest", error);
        return null;
    }
}