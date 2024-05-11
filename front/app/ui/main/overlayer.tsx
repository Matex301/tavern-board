"use client"

import clsx from "clsx";
import React, { useState } from "react";
import { Transition } from '@headlessui/react'

export default function OverLayer({ children, className }: {children: React.ReactNode, className: string}) {
    const [show, setShow] = useState(true);

    function handleClick() {
        setShow(false);
    }

    return (
        <div 
            className={clsx("fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-20 backdrop-blur overflow-auto flex justify-center items-center", !show && "hidden")}
        >
            <div className={"z-40 " + className}>
                {children}
            </div>
            <div
                className="fixed left-0 top-0 w-full h-full z-30"
                onClick={handleClick}
            ></div>
        </div>
    );
}