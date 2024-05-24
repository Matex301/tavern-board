"use client";

import { getUserId } from "@/app/api-actions/login-client";
import SearchDate from "@/app/ui/main/finder/search-date";
import SearchGame from "@/app/ui/main/finder/search-game";
import { useEffect, useState } from "react";


export default function Page() {
    const [date, setDate] = useState<Date>();
    const [game, setGame] = useState<string>();

    const id = getUserId();


    return (
        <div className="container mx-auto p-2 h-fit">
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <SearchDate setDate={setDate}/>
                <SearchGame setGame={setGame}/>
            </div>

        </div>
    );
}