"use client";

import { Game } from "@/app/types/Game";
import SearchDate from "@/app/ui/main/finder/search-date";
import SearchGame from "@/app/ui/main/finder/search-game";
import GameInfo from "@/app/ui/main/games/game-info";
import { LoadGames } from "@/app/ui/main/games/load-games";
import { useState } from "react";

export default function Page() {
    const [games, setGames] = useState<Game[]>([]);

    return (
        <div className="container mx-auto p-2 h-fit">
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">

            </div>
            <LoadGames />
            <GameInfo games={games} setGames={setGames} />
        </div>
    );
}

//<SearchGame />
//<SearchDate setDate={setDate}/>