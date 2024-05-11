"use client";

import { LoadQuests } from "@/app/ui/main/load-quests";
import SearchDate from "@/app/ui/main/finder/search-date";
import SearchGame from "@/app/ui/main/finder/search-game";
import { useEffect, useState } from "react";
import OverLayer from '../ui/main/overlayer';
import QuestInfo from "../ui/main/quest-info";

export default function Page() {
    const [date, setDate] = useState<Date>();

    return (
        <div className="container mx-auto p-2 min-h-screen">
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <SearchGame />
                <SearchDate setDate={setDate}/>
            </div>
            {date && <LoadQuests date={date}/>}
            <QuestInfo />
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