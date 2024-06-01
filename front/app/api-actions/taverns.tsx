"use client";

import { TavernSelect } from "../types/TavernSelect";
import { PagedCollection } from "@/app/types/collection"

export async function fetchTavernsList(signal: AbortSignal) {
    let url = new URL('http://localhost:8000/api/list/taverns');

    //console.log(url);

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