"use client";

import Datetime from "react-datetime"

export default function SearchDate() {
    return (
        <div className="h-36 bg-blue-400 w-1/2 rounded-md">
            <Datetime
            inputProps={{ placeholder: "Datetime Picker Here" }}
            />
        </div>
    );
}