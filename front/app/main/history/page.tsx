"use client";

import { getUserId } from "@/app/api-actions/login-client";
import SearchDate from "@/app/ui/main/finder/search-date";
import SearchGame from "@/app/ui/main/finder/search-game";
import { JoinedQuests } from "@/app/ui/main/quests/joined-quests";
import QuestInfo from "@/app/ui/main/quests/quest-info";
import { useEffect, useState } from "react";


export default function Page() {
    const [date, setDate] = useState<Date>();
    const [game, setGame] = useState<string>();

    let once = false;
    useEffect(() => {
        if(once)
            return;

        const id = getUserId();

        once = true;
    },[]);


    return (
        <div className="container mx-auto p-2 h-fit">
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <SearchDate setDate={setDate}/>
                <SearchGame setGame={setGame}/>
            </div>
            {date && <JoinedQuests date={date} game={game}/>}
            <QuestInfo />
        </div>
    );
}