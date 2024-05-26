"use client";

import { Quest } from "@/app/types/Quest";
import { PagedCollection } from "@/app/types/collection"
import { getJWT, getUserId } from "./login-client";

export async function fetchQuests(signal: AbortSignal, page: number, start: Date|undefined = undefined, game: string|undefined = undefined) {
    let url;
    url = new URL('http://localhost:8000/api/quests');
    /*
    if(game) {
        url = new URL(`http://localhost:8000/api/games/${game}/quests`);
    } else {
        url = new URL('http://localhost:8000/api/quests');
    }*/


    
    url.searchParams.set('page', page.toString());

    if(game) {
        url.searchParams.set('game', game);
    }

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
        
        console.error("fetchQuests", error);
        return null;
    }
}

export async function fetchQuest(signal: AbortSignal, id: string) {
    let url = new URL(`http://localhost:8000/api/quests/${id}`);

    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return data as Quest;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchQuest", error);
        return null;
    }
}

export async function fetchQuestJoined(signal: AbortSignal, page: number, start: Date|undefined = undefined, game: string|undefined = undefined) {
    let id = getUserId();
    let jwt = getJWT();
    if(!id || !jwt)
        return null;

    let url = new URL(`http://localhost:8000/api/users/${id}/joined`);
    url.searchParams.set('page', page.toString());

    if(game) {
        url.searchParams.set('game', game);
    }

    if(start) {
        url.searchParams.set('startAt[before]', start.toISOString());
    }

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
            signal: signal
        });
        const data = await response.json();
        return data as PagedCollection<Quest>;
    } catch (error) {
        if(signal.aborted)
            return null;

        console.error("fetchQuestJoined", error);
        return null;
    }
}