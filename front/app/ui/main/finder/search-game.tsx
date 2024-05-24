"use client";

import { Dispatch, Fragment, useEffect, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { PuzzlePieceIcon } from '@heroicons/react/24/outline';
import { fetchGamesName } from '@/app/api-actions/games';
import { GameName } from '@/app/types/GameName';
import { useDebouncedCallback } from 'use-debounce';

export default function SearchGame({setGame}: {setGame: Dispatch<string|undefined>}) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const [selected, setSelected] = useState<GameName|null>(null);
    const [games, setGames] = useState<GameName[]>([]);
    const [query, setQuery] = useState('');

    const load = async (signal: AbortSignal) => {
        const hydra = await fetchGamesName(signal);
        if(!hydra)
            return;

        const member = hydra?.["hydra:member"] ?? [];
        if(!member)
          return;

        setGames(member);

        const id = params.get("game");
        if(!id)
            return;

        let found = member.find(obj => {return obj.id === id})
        console.log(found);
        if(found) {
            setSelected(found);
            //setGame(found.id);
        }

    };

    const controller = new AbortController();
    const signal = controller.signal;

    let once = false;
    useEffect(() => {
        if(once)
            return;

        load(signal);

        const id = params.get("game");
        if(id)
            setGame(id);
        
        once = true;
    }, []);

    function onChange(value: GameName) {

        if(value?.id == params.get('game'))
            return;

        console.log(value);

        const update = new URLSearchParams(params.toString());
        if(value?.id) {
            update.set('game', value?.id);
        } else {
            update.delete('game');
        }
        router.replace(`${pathname}?${update}`);
        setSelected(value);
        setGame(value?.id);
    }

    const debounced = useDebouncedCallback(
        (value: GameName) => {
            if(value?.id == params.get('game'))
                return;
    
            console.log(value);
    
            const update = new URLSearchParams(params.toString());
            if(value?.id) {
                update.set('game', value?.id);
            } else {
                update.delete('game');
            }
            router.replace(`${pathname}?${update}`);
            setSelected(value);
            setGame(value?.id);
        },
        300
    )

    const filteredGame =
        query === ''
        ? games
        : games.filter((games) => {
            return games.name.toLowerCase().includes(query.toLowerCase())
        })

    return (
        <div className="flex justify-center bg-blue-600 md:w-1/2 rounded-lg relative">
            <div className="flex justify-center items-center md:w-1/2">
                <Combobox value={selected} onChange={debounced} nullable>
                <div className="relative w-full h-full">
                    <div className="flex flex-row justify-center items-center gap-1 p-1 relative w-full h-full cursor-default overflow-hidden rounded-md bg-blue-600 text-lg text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full h-full border-none py-1 text-lg text-center focus:ring-0 rounded-md placeholder:text-gray-500"
                        displayValue={(game: GameName) => game?.name}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder='Search Game'
                    />
                    <PuzzlePieceIcon className="absolute left-3 size-8 text-black peer-focus:text-gray-900" />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                        />
                    </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {filteredGame.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                            Nothing found.
                        </div>
                        ) : (
                        filteredGame.map((game) => (
                            <Combobox.Option
                            key={game.id}
                            className={({ active }) =>
                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? 'bg-blue-600 text-white' : 'text-gray-900'
                                }`
                            }
                            value={game}
                            >
                            {({ selected, active }) => (
                                <>
                                <span
                                    className={`block truncate ${
                                    selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                    {game.name}
                                </span>
                                {selected ? (
                                    <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                        active ? 'text-white' : 'text-blue-600'
                                    }`}
                                    >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                ) : null}
                                </>
                            )}
                            </Combobox.Option>
                        ))
                        )}
                    </Combobox.Options>
                    </Transition>
                </div>
                </Combobox>
            </div>
        </div>
        );
}