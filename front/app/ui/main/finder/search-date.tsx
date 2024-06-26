"use client";

import { Dispatch, useEffect, useRef } from "react";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css";
import { CalendarIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useDebouncedCallback } from 'use-debounce';

export default function SearchDate({setDate}: {setDate: Dispatch<Date>}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    let once = false;
    useEffect(() => {
        if(once)
            return;

        let dateString = params.get('date');
        if(dateString) {
            setDate(new Date(dateString));
        } else {
            setDate(new Date(Date.now()));
        }
        
        once = true;
    },[]);

    let inputProps = {
        placeholder: "Picker Datetime",
        className: 'bg-white text-lg text-center p-1 peer rounded-md',
        ref: inputRef
    };

    const debounced = useDebouncedCallback(
        (value: any) => {
            let dateString = value.toISOString();

            if(dateString == params.get('date'))
                return;
    
            const update = new URLSearchParams(params.toString());
            update.set('date', dateString);
            router.replace(`${pathname}?${update}`, {scroll: false});
            setDate(value);
        },
        500
    )

    function onClick() {
        inputRef.current?.focus();
    }

    return (
        <div className="flex justify-center bg-blue-600 md:w-1/2 rounded-lg">
            <div className="flex flex-row justify-center items-center gap-1 p-1 relative">
                <Datetime 
                    inputProps={inputProps}
                    initialValue={new Date(Date.now())}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                    onChange={debounced}
                />
                <CalendarIcon className="absolute left-3 size-8 text-black peer-focus:text-gray-900"/>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={onClick}>
                        <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                        />
                </div>
            </div>
        </div>
    );
}