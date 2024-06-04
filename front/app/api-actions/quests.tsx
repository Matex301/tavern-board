"use client";

import { Quest } from "@/app/types/Quest";
import { PagedCollection } from "@/app/types/collection"
import { getJWT, getUserId } from "./login-client";

export async function fetchQuests(signal: AbortSignal, page: number, start: Date|undefined = undefined, game: string|undefined = undefined, tavern: string|undefined = undefined) {
    let url;
    url = new URL('http://localhost:8000/api/quests');

    url.searchParams.set('page', page.toString());

    if(game) {
        url.searchParams.set('game', game);
    }

    if(tavern) {
        url.searchParams.set('tavern', tavern);
    }

    if(start) {
        url.searchParams.set('startAt[after]', start.toISOString());
    }

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
        return new Quest(data["@id"], data.id, data.title, data.description, data.startAt, data.game, data.tavern, data.creator, data.currentPlayers, data.players, data.image, data.maxPlayers, data.endAt);
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchQuest", error);
        return null;
    }
}

export async function fetchQuestJoined(signal: AbortSignal, page: number, start: Date|undefined = undefined, game: string|undefined = undefined, tavern: string|undefined = undefined) {
    let id = getUserId();
    let jwt = getJWT();
    if(!id || !jwt)
        return null;

    let url = new URL(`http://localhost:8000/api/users/${id}/joined`);
    url.searchParams.set('page', page.toString());

    if(game) {
        url.searchParams.set('game', game);
    }

    if(tavern) {
        url.searchParams.set('tavern', tavern);
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

export async function fetchQuestCreated(signal: AbortSignal, page: number, start: Date|undefined = undefined, game: string|undefined = undefined, tavern: string|undefined = undefined) {
    let id = getUserId();
    let jwt = getJWT();
    if(!id || !jwt)
        return null;

    let url = new URL(`http://localhost:8000/api/users/${id}/created`);
    url.searchParams.set('page', page.toString());

    if(game) {
        url.searchParams.set('game', game);
    }

    if(tavern) {
        url.searchParams.set('tavern', tavern);
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

        console.error("fetchQuestCreated", error);
        return null;
    }
}

export interface CreateQuest {
    title: string,
    description: string,
    maxPlayers?: number,
    startAt: string,
    endAt?: string,
    game: string,
    tavern: string
}

export async function createQuest(signal: AbortSignal, quest: CreateQuest) {
    let jwt = getJWT();
    if(!jwt)
        return null;

    let url = new URL(`http://localhost:8000/api/quests`);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/ld+json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(quest),
            signal: signal
        });

        const data = await response.json();
        if(response.status != 201)
            return null;

        return new Quest(data["@id"], data.id, data.title, data.description, data.startAt, data.game, data.tavern, data.creator, data.currentPlayers, data.players, data.image, data.maxPlayers, data.endAt);
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("createQuest", error);
        return null;
    }
}

export interface UpdateQuest {
    title?: string,
    description?: string,
    maxPlayers?: number,
    startAt?: string,
    endAt?: string,
    tavern?: string
}

export async function updateQuest(signal: AbortSignal, id:string, update: UpdateQuest) {
    let jwt = getJWT();
    if(!jwt)
        return null;

    let url = new URL(`http://localhost:8000/api/quests/${id}`);

    try {
        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/merge-patch+json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(update),
            signal: signal
        });

        const data = await response.json();
        if(response.status != 200)
            return null;

        return new Quest(data["@id"], data.id, data.title, data.description, data.startAt, data.game, data.tavern, data.creator, data.currentPlayers, data.players, data.image, data.maxPlayers, data.endAt);
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("updateQuest", error);
        return null;
    }
}

export async function joinQuest(signal: AbortSignal, id:string) {
    let jwt = getJWT();
    if(!jwt)
        return false;

    let url = new URL(`http://localhost:8000/api/quests/${id}/join`);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
            signal: signal
        });

        const data = await response.json();
        if(response.status != 200)
            return null;

        return new Quest(data["@id"], data.id, data.title, data.description, data.startAt, data.game, data.tavern, data.creator, data.currentPlayers, data.players, data.image, data.maxPlayers, data.endAt);
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("joinQuest", error);
        return false;
    }
}

export async function leaveQuest(signal: AbortSignal, id:string) {
    let jwt = getJWT();
    if(!jwt)
        return false;

    let url = new URL(`http://localhost:8000/api/quests/${id}/join`);

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
            signal: signal
        });

        const data = await response.json();
        if(response.status != 200)
            return null;

        return new Quest(data["@id"], data.id, data.title, data.description, data.startAt, data.game, data.tavern, data.creator, data.currentPlayers, data.players, data.image, data.maxPlayers, data.endAt);
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("leaveQuest", error);
        return false;
    }
}

export async function deleteQuest(signal: AbortSignal, id:string) {
    let jwt = getJWT();
    if(!jwt)
        return false;

    let url = new URL(`http://localhost:8000/api/quests/${id}`);

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${jwt}`
            },
            signal: signal
        });

        if(response.status != 204)
            return false;

        return true;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("leaveQuest", error);
        return false;
    }
}