import { Dispatch, useEffect, useState, useRef, useImperativeHandle, forwardRef } from "react";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css";
import { CalendarIcon } from '@heroicons/react/24/outline';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useDebouncedCallback } from 'use-debounce';

export default function DateSelect({date, setDate}: {date?: Date, setDate: Dispatch<Date>}) {
    const inputRef = useRef<HTMLInputElement>(null);

    let inputProps = {
        placeholder: "Pick a Date and Time",
        className: 'bg-white text-lg text-start py-1 peer rounded-md text-blue-600 placeholder:text-gray-500',
        ref: inputRef
    };

    function onClick() {
        inputRef.current?.focus();
    }

    return (
        <div className="relative">
            <Datetime 
                inputProps={inputProps}
                initialValue={date && new Date(date)}
                dateFormat="YYYY-MM-DD"
                timeFormat="HH:mm"
                onChange={(value: any) => {setDate(value)}}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer" onClick={onClick}>
                    <ChevronUpDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                    />
            </div>
        </div>
    );
}