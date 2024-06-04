"use client";

import { Dispatch, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import { Inknut_Antiqua } from "next/font/google";
import { TavernSelect } from '@/app/types/TavernSelect';
import { Tavern } from '@/app/types/Tavern';
import IconRow from '../icon-row';
import {
    MagnifyingGlassIcon,
    GlobeAltIcon,
    PhoneIcon,
    ArrowRightIcon,
    MapPinIcon
} from '@heroicons/react/24/outline';
import { fetchTavern } from '@/app/api-actions/taverns';
import Spinner from '../spinner';
import Button from '../icon-button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const inknut_antiqua = Inknut_Antiqua({weight:"400", subsets: ['latin'] });

export default function Panel({tavernSelect, setTavernSelect}: {tavernSelect: TavernSelect | undefined, setTavernSelect: Dispatch<TavernSelect | undefined>}) {
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [tavern, setTavern] = useState<Tavern>();
    const router = useRouter();

    const controller = new AbortController();
    const signal = controller.signal;

    useEffect(() => {
        if(!tavernSelect)
            return;

        setOpen(true);

        setLoading(true);
        fetchTavern(signal, tavernSelect.id).then(response => {
            if(response){
                setTavern(response);
                setLoading(false);
            }
        });

        return () => {
            setOpen(false);
            setLoading(false);
            controller.abort();
        }
    }, [tavernSelect]);

    useEffect(() => {
        if(open != false)
            return;
        setTavern(undefined);
        setTavernSelect(undefined);
    }, [open])

    function onClick() {
        if(!tavern?.id)
            return;

        const pathname = '/main';
        const update = new URLSearchParams();
        update.set('tavern', tavern.id);
        router.replace(`${pathname}?${update}`);
    }

    return (
        <Transition
            show={open}
            enter="transition ease-in-out duration-400"
            enterFrom="translate-x-[150%] md:translate-x-[220%]"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-400"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[220%]"
            className="relative md:absolute flex flex-col md:inset-y-0 md:right-0 md:w-80 h-1/3 md:h-2/3 md:my-auto overflow-y-auto bg-blue-500 items-center text-white"
        >
            { (!loading && tavern) &&
                <>
                    <button 
                        className="absolute left-0 top-0 p-3 hover:text-slate-400 focus:outline-none"
                        onClick={() => setOpen(false)}
                    >
                        <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className={`${inknut_antiqua.className} text-3xl p-3 pt-8`}>{tavern?.name}</div>
                    <div className='flex flex-col justify-start w-full p-3'>

                        <IconRow LinkIcon={PhoneIcon} content={tavern.phone} styleName="text-xl p-3"/>

                        <Link href={'https://' + tavern.website} passHref={true}>
                            <IconRow LinkIcon={GlobeAltIcon} content={tavern.website} styleName="text-xl p-3"/>
                        </Link>
                       
                        <IconRow LinkIcon={MapPinIcon} content={tavern.address.street + ', ' + tavern.address.city} styleName="text-base p-3"/>

                        <div className='text-sm flex gap-3 w-full p-3'>
                            <p>Sklep z grami planszowymi, karcianymi i bitewnymi.</p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-content gap-4 md:w-1/4 p-4">
                        <Button text="Quests" onClick={onClick} disabled={false} LinkIcon={MagnifyingGlassIcon} />
                    </div>
                </>
            }
            { loading && <div className='flex w-full h-full items-center justify-center'><Spinner /></div> }
        </Transition>
    );
}