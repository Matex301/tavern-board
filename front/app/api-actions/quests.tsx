"use client";

import { Quest } from "../types/Quest";
import { PagedCollection } from "../types/collection"

export async function fetchQuests(signal: AbortSignal, page: number, start: Date|null = null) {
    let url = new URL('http://localhost:8000/api/quests');
    url.searchParams.set('page', page.toString());

    if(start) {
        url.searchParams.set('startAt[after]', start.toISOString());
    }

    //console.log(nurl);

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

