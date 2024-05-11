"use client"
import Search from '@/app/ui/main/search';
import { Inknut_Antiqua } from "next/font/google";
import { Avatar } from '@/app/ui/main/avatar';
import { useEffect, useState } from 'react';
import { fetchUser } from '@/app/api-actions/login-client';
const inknut_antiqua = Inknut_Antiqua({weight:"400", subsets: ['latin'] });

export default function UpperNav() {
    const [username, setUsername] = useState<string|undefined>();

    useEffect(() => {
        fetchUser().then((user) => {
            setUsername(user?.username);
        });
    },[]);

    return (
        <div className="mt-1 p-1 flex items-center justify-between gap-2">
            <div className='text-4xl hidden md:block p-1'>
                <h1 className={`${inknut_antiqua.className} antialiased`}>Tavern Board</h1>
            </div>
            <div className="w-screen md:w-2/5">
                <Search placeholder="Search..." />
            </div>
            <div className='flex flex-row p-1 items-center gap-2'>
                <p className='text-xl hidden md:block'>{username}</p>
                <Avatar />
            </div>
        </div>
    );
}