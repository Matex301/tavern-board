"use client"

import Map from "@/app/ui/main/map/map";
import Panel from "@/app/ui/main/map/panel";
import { TavernSelect } from "@/app/types/TavernSelect";
import { useState } from "react";

export default function Page() {
    const [tavern, setTavern] = useState<TavernSelect>();
    
    return (
        <div className="flex flex-col w-full h-full relative">
            <Map setTavernSelect={setTavern} />
            <Panel tavernSelect={tavern} setTavernSelect={setTavern} />
        </div>
    );
}