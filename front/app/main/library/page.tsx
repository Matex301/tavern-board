"use client";

import SearchDate from "@/app/ui/main/finder/search-date";
import SearchGame from "@/app/ui/main/finder/search-game";
import { LoadGames } from "@/app/ui/main/library/load-games";
import { useState } from "react";

export default function Page() {
    const [date, setDate] = useState<Date>(new Date());
    return (
        <div className="container mx-auto p-2 min-h-screen">
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <SearchGame />
                <SearchDate setDate={setDate}/>
            </div>
                <LoadGames />
        </div>
    );
}