"use client";

import { Dispatch, useEffect } from "react";
import Datetime from "react-datetime"
import "react-datetime/css/react-datetime.css";
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function SearchDate({setDate}: {setDate: Dispatch<Date>}) {

    let once = false;
    useEffect(() => {
        if(once)
            return;
        setDate(new Date(Date.now()));
        once = true;
    },[]);

    return (
        <div className="bg-blue-400 md:w-1/2 rounded-md flex justify-center">
            <div className="flex flex-row justify-center items-center gap-1  p-1">
                <CalendarIcon className="size-8" />
                <Datetime 
                    inputProps={{ placeholder: "Datetime Picker Here" }}
                    initialValue={new Date(Date.now())}
                    dateFormat="YYYY-MM-DD"
                    timeFormat="HH:mm"
                    onChange={(value: any) => setDate(value)}
                />
            </div>
        </div>
    );
}