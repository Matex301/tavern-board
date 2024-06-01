"use client";

import QuestCreate from "@/app/ui/main/quests/create/quest-create";
import { useState } from "react";

export default function Page() {

    return (
        <div className="container mx-auto p-2 h-fit w-full">
            <QuestCreate />
        </div>
    );
}