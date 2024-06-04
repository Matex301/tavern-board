"use client";

import { Address, Tavern } from "@/app/types/Tavern";
import { TavernSelect } from "@/app/types/TavernSelect";
import { PagedCollection } from "@/app/types/collection"
import { getJWT } from "./login-client";

export async function fetchTavern(signal: AbortSignal, id: string) {
    let url = new URL(`http://localhost:8000/api/taverns/${id}`);

    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return data as Tavern
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchTavern", error);
        return null;
    }
}

export async function fetchTavernsListMap(signal: AbortSignal, latitudeLte: number, longitudeLte: number, latitudeGte: number, longitudeGte: number) {
    let url = new URL('http://localhost:8000/api/list/taverns');

    url.searchParams.set('address.latitude[lte]', latitudeLte.toString());
    url.searchParams.set('address.longitude[lte]', longitudeLte.toString());

    url.searchParams.set('address.latitude[gte]', latitudeGte.toString());
    url.searchParams.set('address.longitude[gte]', longitudeGte.toString());

    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return data as PagedCollection<TavernSelect>;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchTavernsListMap", error);
        return null;
    }
}

export async function fetchTavernsList(signal: AbortSignal) {
    let url = new URL('http://localhost:8000/api/list/taverns');

    try {
        const response = await fetch(url, {signal});
        const data = await response.json();
        return data as PagedCollection<TavernSelect>;
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("fetchTavernsList", error);
        return null;
    }
}

export interface CreateTavern {
    name: string,
    website: string,
    phone?: string,
    address: Address
}

export async function createTavern(signal: AbortSignal, tavern: CreateTavern) {
    let jwt = getJWT();
    if(!jwt)
        return null;

    let url = new URL(`http://localhost:8000/api/taverns`);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/ld+json",
                "Authorization": `Bearer ${jwt}`
            },
            body: JSON.stringify(tavern),
            signal: signal
        });

        const data = await response.json();
        if(response.status != 201)
            return null;

        return new Tavern(data["@id"], data.id, data.name, data.website, data.phone, data.address);
    } catch(error) {
        if (signal.aborted)
            return null;
        
        console.error("createTavern", error);
        return null;
    }
}