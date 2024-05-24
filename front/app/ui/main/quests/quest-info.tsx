"use client"

import {useSearchParams, useRouter, usePathname} from "next/navigation";
import { Transition } from '@headlessui/react'
import { useEffect, useState } from "react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Quest } from "@/app/types/Quest";
import { fetchQuest } from "@/app/api-actions/quests";
import QuestInfoListing, { QuestInfoListingSkeleton } from "@/app/ui/main/quests/quest-info-listing";

export default function QuestInfo() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    const [show, setShow] = useState(false);
    const [quest, setQuest] = useState<Quest>();
    const [loading, setLoading] = useState(false);
    //const pathname = usePathname();

    function close() {
        const update = new URLSearchParams(params.toString());
        update.delete('quest');
        router.replace(`${pathname}?${update}`);
        //router.back();
    }

    const load = async (signal: AbortSignal, id: string) => {
        const loaded = await fetchQuest(signal, id);

        setLoading(false);
        if(loaded)
            setQuest(loaded);
    }

    const controller = new AbortController();
    const signal = controller.signal;

    function cleanup() {
        setShow(false);
        setQuest(undefined);
        controller.abort();
        console.log('trigger');
    }

    useEffect(() => {
        const id = params.get("quest");
        /*console.log(id);
        console.log(quest);
        console.log(loading);*/
        if(!id) {
            return;
        }
            

        setShow(true);
        setLoading(true);

        load(signal, id);
        /*
        return () => {
            setShow(false);
            setQuest(undefined);
            controller.abort();
        }
        
        */
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
                {quest && <QuestInfoListing quest={quest} />}
                {loading && <QuestInfoListingSkeleton />}
                <div
                    className="fixed left-0 top-0 w-full h-full z-30"
                    onClick={close}
                ></div>
            </div>
        </Transition>
    );
}

function ExitButton() {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();
    
    function close() {
        const update = new URLSearchParams(params.toString());
        update.delete('quest');
        router.replace(`${pathname}?${update}`);
        //router.replace('/main');
    }

    return (
        <div 
            className='absolute top-0 right-0 md:top-4 md:right-4 z-30 p-2 text-black hover:text-slate-300 focus:outline-none focus:ring-2 focus:ring-black'
            onClick={close}
        >
        <XMarkIcon className="h-9 w-9" aria-hidden="true" />
        </div>
    );
}