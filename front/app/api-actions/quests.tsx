"use client";

import { Quest } from "../types/Quest";
import { PagedCollection } from "../types/collection"

export async function fetchQuests(signal: AbortSignal, page: number, start: Date|null = null) {
    let url = `http://localhost:8000/api/quests?page=${page}`;

    if(start) {
        url += `&startAt%5Bafter%5D=${encodeURIComponent(start.toISOString())}`;
    }

    //console.log(url);

    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return data as PagedCollection<Quest>;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchGames", error);
        return null;
    }
}

