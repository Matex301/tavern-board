"use client"

import {useSearchParams, useRouter, usePathname} from "next/navigation";
import { Transition } from '@headlessui/react'
import { useEffect, useState, Dispatch } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Game } from "@/app/types/Game";
import { fetchGame } from "@/app/api-actions/games";
import GameInfoShow, { GameInfoShowSkeleton } from "@/app/ui/main/games/game-info-show";

export default function GameInfo({games, setGames}: {games: Game[], setGames: Dispatch<Game[]>}) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const [show, setShow] = useState(false);
    const [game, setGame] = useState<Game>();
    const [loading, setLoading] = useState(false);

    function close() {
        const update = new URLSearchParams(params.toString());
        update.delete('game');
        router.replace(`${pathname}?${update}`, {scroll: false});
    }

    const load = async (signal: AbortSignal, id: string) => {
        const loaded = await fetchGame(signal, id);

        setLoading(false);
        if(loaded)
            setGame(loaded);
    }

    const controller = new AbortController();
    const signal = controller.signal;

    function cleanup() {
        setShow(false);
        setGame(undefined);
        controller.abort();
        console.log('Game Info Cleanup');
    }

    useEffect(() => {
        const id = params.get("game");

        if(!id)
            return;
            

        setShow(true);
        setLoading(true);

        load(signal, id);

        return () => {
            cleanup();
        };
    }, [params]);

    return (
        <Transition
            show={show}
            appear={true}
            enter="transition-opacity duration-75"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div 
                className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-20 backdrop-blur flex justify-center items-center"
            >
                <ExitButton />
                {game && (
                    <GameInfoShow game={game} />
                )}
                {loading && <GameInfoShowSkeleton />}
                <div
                    className="fixed left-0 top-0 w-full h-full z-30"
                    onClick={close}
                ></div>
            </div>
        </Transition>
    );
}

/*
                    game.isEditable() ?
                        <QuestInfoEdit quests={quests} setQuests={setQuests} quest={quest} setQuest={setQuest} /> :
                        <QuestInfoShow quest={quest} />
*/

function ExitButton() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    
    function close() {
        const update = new URLSearchParams(params.toString());
        update.delete('quest');
        router.replace(`${pathname}?${update}`, {scroll: false});
    }

    return (
        <div 
            className='absolute top-0 right-0 md:top-4 md:right-4 z-30 p-1 md:p-2 text-black hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-black'
            onClick={close}
        >
        <XMarkIcon className="h-9 w-9" aria-hidden="true" />
        </div>
    );
}