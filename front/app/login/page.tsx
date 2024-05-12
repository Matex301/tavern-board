"use client"
import { Transition } from '@headlessui/react'
import { useState } from 'react';
import { Inknut_Antiqua } from "next/font/google";
import Login from '@/app/ui/login/login-form';
import Registration from '../ui/login/registration-form';
const inknut_antiqua = Inknut_Antiqua({weight:"400", subsets: ['latin'] });

export default function Page() {
  const [tab, setTab] = useState<number>(1);

  return (
      <div className='flex h-full w-full items-center justify-center flex-col'>
      <Transition
        show={1 === tab}
        appear={true}
        enter="transition ease-in-out duration-400"
        enterFrom="-translate-x-[150%] md:-translate-x-[220%]"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-400"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-[220%]"
        className="flex flex-col w-full md:w-1/4 bg-slate-100 rounded-lg border border-gray-200 outline-5"
        afterLeave={() => {setTab(2);}}
      > 
        <h1 className={`${inknut_antiqua.className} antialiased mt-5 p-5 text-4xl text-center`}>Tavern Board</h1>
        <Login setTab={setTab}/>
      </Transition>

      <Transition
        show={2 === tab}
        enter="transition ease-in-out duration-400"
        enterFrom="translate-x-[150%] md:translate-x-[220%]"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-400"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-[220%]"
        className="flex flex-col w-full md:w-1/4 bg-slate-100 rounded-b-lg border border-t-0 border-gray-200 outline-5"
        afterLeave={() => {setTab(1);}}
      >
        <h1 className={`${inknut_antiqua.className} antialiased mt-5 p-5 text-4xl text-center`}>Tavern Board</h1>
        <Registration setTab={setTab} />
      </Transition>
      </div>
  );
}

/*
      <Transition
        show={true}
        appear={true}
        enter="transition ease-in-out duration-400"
        enterFrom="-translate-x-[150%] md:-translate-x-[220%]"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-400"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-[220%]"
        className='w-full md:w-1/4 p-5 bg-slate-100 text-4xl text-center rounded-t-lg border border-b-0 border-gray-200 outline-5'
      >
        <h1 className={`${inknut_antiqua.className} antialiased mt-5`}>Tavern Board</h1>
      </Transition>
*/