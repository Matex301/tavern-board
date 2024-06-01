"use client";

import { useState } from 'react';
import { Transition } from '@headlessui/react'
import {
    MagnifyingGlassIcon,
    GlobeAltIcon,
    PhoneIcon,
    ArrowRightIcon 
} from '@heroicons/react/24/outline';

import { Inknut_Antiqua } from "next/font/google";
const inknut_antiqua = Inknut_Antiqua({weight:"400", subsets: ['latin'] });

export default function Panel() {
    const [collapsed, setSidebarCollapsed] = useState<boolean>(true);
    return (
        <>
        <Transition
            show={collapsed}
            enter="transition ease-in-out duration-400"
            enterFrom="translate-x-[150%] md:translate-x-[220%]"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-400"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[220%]"
            className={"hidden md:block"}
        >
            <div className="absolute flex flex-col inset-y-0 right-0 w-80 h-2/3 my-auto overflow-y-auto bg-blue-500 items-center text-white">
                <button 
                    className="absolute left-0 top-0 p-3 hover:text-slate-400 focus:outline-none"
                    onClick={() => setSidebarCollapsed(false)}
                >
                    <ArrowRightIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className={`${inknut_antiqua.className} text-3xl p-3 pt-8`}>Shop Gracz</div>
                <div className='flex flex-col justify-start w-full p-3'>
                    <div className='text-xl flex gap-3 w-full p-3'>
                        <PhoneIcon className="w-6" />
                        <p>608195190</p>
                    </div>
                    <div className='text-xl flex gap-3 w-full p-3'>
                        <GlobeAltIcon className="w-6" />
                        <p>shopgracz.pl</p>
                    </div>
                    <div className='text-sm flex gap-3 w-full p-3'>
                        <p>Sklep z grami planszowymi, karcianymi i bitewnymi.</p>
                    </div>
                </div>
                <div className='flex items-center gap-2 rounded-md bg-slate-200 font-medium hover:bg-slate-400 flex-none justify-start p-2 px-3 text-black text-xl absolute bottom-0 m-4 cursor-pointer'>
                    <MagnifyingGlassIcon className="w-6" />
                    <p>Find Quests</p>
                </div>
            </div>

        </Transition>
        <div className='flex flex-col grow bg-blue-500 overflow-y-auto text-white md:hidden'>
            <div className={`${inknut_antiqua.className} text-3xl p-3`}>Shop Gracz</div>
            <div className='flex flex-col justify-start w-full p-3'>
                <div className='text-xl flex gap-3 w-full p-3'>
                    <PhoneIcon className="w-6" />
                    <p>608195190</p>
                </div>
                <div className='text-xl flex gap-3 w-full p-3'>
                    <GlobeAltIcon className="w-6" />
                    <p>shopgracz.pl</p>
                </div>
                <div className='text-sm flex gap-3 w-full p-3'>
                    <p>Sklep z grami planszowymi, karcianymi i bitewnymi.</p>
                </div>
            </div>
            <div className='flex self-center w-fit items-center gap-2 rounded-md bg-slate-200 hover:bg-slate-400 justify-start p-2 px-3 pr-8 text-black text-lg font-medium m-4 cursor-pointer'>
                <MagnifyingGlassIcon className="w-6" />
                <p>Find Quests</p>
            </div>
        </div>
        </>

    );
}