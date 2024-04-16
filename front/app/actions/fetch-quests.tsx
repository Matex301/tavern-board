"use server";

import { Quest } from '@/app/types/quest';

export async function fetchQuests(page: number) {
    const apiUrl = `http://localhost/api/quests?page${page}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        //TODO
        return data;
    } catch(error) {
        console.log("fetchQuests: ", error);
        return null;
    }
}