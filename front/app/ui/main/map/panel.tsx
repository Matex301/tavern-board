"use client";

import React from 'react';
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
    const [collapsed, setSidebarCollapsed] = React.useState(true);
    return (
        <Transition
            show={collapsed}
            enter="transform transition ease-in-out duration-500"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
        >
            <div className="absolute inset-y-0 right-0 w-80 h-2/3 my-auto bg-blue-500 flex flex-col items-center text-white">
                <button 
                    className="absolute left-0 top-0 p-3 hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
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
    );
}