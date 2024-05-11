"use client"

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Spinner from './spinner';
import { fetchJWT } from '@/app/api-actions/login-client';
import { useRouter } from 'next/navigation';

export default function Login({setTab}: {setTab: Dispatch<SetStateAction<number>>}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        let token;

        try {
            const fromData = new FormData(event.currentTarget);
            let username: string = fromData.get('username')?.toString() ?? "";
            let password: string = fromData.get('password')?.toString() ?? "";

            token = await fetchJWT(username, password);
            console.log(token);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        if(token) {
            router.push('/main');
        }
    }

    return (
        <form className="flex grow justify-between items-center flex-col gap-2 mt-4" onSubmit={onSubmit}>
            <LoginInput />
            <PasswordInput />

            <div className="h-auto w-full grow rounded-md bg-slate-50"></div>

            {loading && <Spinner />}

            <div className="flex flex-col h-auto w-full justify-between items-center my-4 gap-1">
                <button type="submit" disabled={loading} className="w-1/2 md:w-1/3 bg-slate-200 hover:bg-slate-300 h-[48px] rounded-md font-medium">
                    Login
                </button>
                <div className="cursor-pointer text-blue-400 text-sm" onClick={() => {setTab(0);}}>
                    Sign Up 
                </div>
            </div>
        </form>
    );
}

function LoginInput() {
    return (
        <div className='relative flex flex-shrink-0 w-3/5'>
            <UserIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            <input
                type="text" 
                name="username"
                placeholder="Username"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-md outline-2 placeholder:text-gray-500"
                required
            />
        </div>
    );
}

function PasswordInput() {
    return (
        <div className='relative flex flex-shrink-0 w-3/5'>
            <LockClosedIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-md outline-2 placeholder:text-gray-500"
                required
            />
        </div>
    );
}