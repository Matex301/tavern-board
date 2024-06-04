"use client";

import { MainQuests } from "@/app/ui/main/quests/main-quests";
import SearchDate from "@/app/ui/main/finder/search-date";
import SearchGame from "@/app/ui/main/finder/search-game";
import { useState } from "react";
import OverLayer from "@/app/ui/main/overlayer";
import QuestInfo from "@/app/ui/main/quests/quest-info";
import { Quest } from "@/app/types/Quest";
import SearchTavern from "../ui/main/finder/search-tavern";

export default function Page() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [date, setDate] = useState<Date>();
    const [game, setGame] = useState<string>();
    const [tavern, setTavern] = useState<string>();

    return (
        <div className="container mx-auto p-2 h-fit">
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <SearchGame setGame={setGame}/>
                <SearchDate setDate={setDate}/>
                <SearchTavern setTavern={setTavern}/>
            </div>
            {date && <MainQuests quests={quests} setQuests={setQuests} date={date} game={game} tavern={tavern}/>}
            <QuestInfo quests={quests} setQuests={setQuests} />
        </div>
    );
}

/*
            <OverLayer className="bg-white w-2/3 h-4/5">
                <div>
                    hallo
                </div>
            </OverLayer>
*/