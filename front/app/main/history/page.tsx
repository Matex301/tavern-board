"use client";

import { Transition } from '@headlessui/react'
import { getUserId } from "@/app/api-actions/login-client";
import { Quest } from "@/app/types/Quest";
import SearchDate from "@/app/ui/main/finder/search-date";
import SearchGame from "@/app/ui/main/finder/search-game";
import { JoinedQuests } from "@/app/ui/main/quests/joined-quests";
import QuestInfo from "@/app/ui/main/quests/quest-info";
import { useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon, PencilSquareIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';
import { CreatedQuests } from '@/app/ui/main/quests/created-quests';
import SearchTavern from '@/app/ui/main/finder/search-tavern';

export default function Page() {
    const [quests, setQuests] = useState<Quest[]>([]);
    const [date, setDate] = useState<Date>();
    const [game, setGame] = useState<string>();
    const [tavern, setTavern] = useState<string>();
    const [tab, setTab] = useState<number>(1);

    let once = false;
    useEffect(() => {
        if(once)
            return;

        const id = getUserId();

        once = true;
    },[]);


    return (
        <>
        <Transition
            show={1 === tab}
            enter="transition ease-in-out duration-400"
            enterFrom="-translate-x-[150%] md:-translate-x-[220%]"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-400"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-[220%]"
            className="container mx-auto p-2 h-fit"
            afterLeave={() => {setTab(2);}}
        > 

            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <div className="flex justify-between items-center bg-blue-400 md:w-1/2 rounded-lg text-lg" onClick={() => {setTab(0)}}>
                    <ArrowLeftIcon className="h-6 w-6 m-2" aria-hidden="true" />
                    Created Quests
                    <PencilSquareIcon className="h-6 w-6 m-2" aria-hidden="true" />
                </div>
                <SearchGame setGame={setGame}/>
                <SearchDate setDate={setDate}/>
                <SearchTavern setTavern={setTavern}/>
            </div>
            {date && <JoinedQuests quests={quests} setQuests={setQuests} date={date} game={game} tavern={tavern} />}
            <QuestInfo quests={quests} setQuests={setQuests} />
        </Transition>

        <Transition
            show={2 === tab}
            enter="transition ease-in-out duration-400"
            enterFrom="translate-x-[150%] md:translate-x-[220%]"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-400"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[220%]"
            className="container mx-auto p-2 h-fit"
            afterLeave={() => {setTab(1);}}
        >
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <div className="flex justify-between items-center bg-blue-400 md:w-1/2 rounded-lg text-lg" onClick={() => {setTab(0)}}>
                    <ArrowRightEndOnRectangleIcon className="h-6 w-6 m-2" aria-hidden="true" />
                    Joined Quests
                    <ArrowRightIcon className="h-6 w-6 m-2" aria-hidden="true" />
                </div>
                <SearchGame setGame={setGame}/>
                <SearchDate setDate={setDate}/>
                <SearchTavern setTavern={setTavern}/>
            </div>
            {date && <CreatedQuests quests={quests} setQuests={setQuests} date={date} game={game} tavern={tavern} />}
            <QuestInfo quests={quests} setQuests={setQuests} />
        </Transition>
        </>
    );
}

/* 
        <div className="container mx-auto p-2 h-fit">
            <div className="flex flex-col md:flex-row w-full pb-2 gap-4">
                <SearchDate setDate={setDate}/>
                <SearchGame setGame={setGame}/>
            </div>
            {date && <JoinedQuests date={date} game={game}/>}
            <QuestInfo quests={quests} setQuests={setQuests} />
        </div>
*/