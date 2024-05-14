"use client"

import {useSearchParams, useRouter, usePathname} from "next/navigation";
import { Transition } from '@headlessui/react'
import { useEffect, useState } from "react";

export default function QuestInfo() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [show, setShow] = useState(false);
    //const pathname = usePathname();

    function close() {
        //const params = new URLSearchParams(searchParams.toString());
        //params.delete('quest');
        //router.replace(pathname + '?' + params.toString(), {scroll: false, })
        router.back();
    }

    useEffect(() => {
        const quest = searchParams.get("quest");

        if(!quest)
            return;

        setShow(true);
        
        return () => {
            setShow(false);
        }
    }, [searchParams]);

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
                className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-20 backdrop-blur overflow-auto flex justify-center items-center"
            >
                <div className="z-40 bg-white w-4/5 h-5/6 md:w-2/3 md:h-4/5">
                    {}
                </div>
                <div
                    className="fixed left-0 top-0 w-full h-full z-30"
                    onClick={close}
                ></div>
            </div>
        </Transition>
    );
}