"use client"

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Spinner from './spinner';
import { fetchJWT } from '@/app/api-actions/login-client';
import { useRouter } from 'next/navigation';
import ErrorMessage from './error-message';

export default function Login({setTab}: {setTab: Dispatch<SetStateAction<number>>}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setError(null);
        let data;

        try {
            const fromData = new FormData(event.currentTarget);
            let username: string = fromData.get('username')?.toString() ?? "";
            let password: string = fromData.get('password')?.toString() ?? "";

            data = await fetchJWT(username, password);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        if(data?.status == 200) {
            router.push('/main');
        } else {
            setError(data?.message);
        }
    }

    return (
        <form className="flex grow justify-between items-center flex-col gap-2 mt-4" onSubmit={onSubmit}>
            <UsernameInput />
            <PasswordInput />

            <div className="h-auto w-full grow rounded-md bg-slate-50"></div>
            {error && <ErrorMessage error={error}/>}
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

function UsernameInput() {
    return (
        <div className='relative flex flex-shrink-0 w-4/5 md:w-3/5'>
            <UserIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            <input
                type="text" 
                name="username"
                placeholder="Username"
                className="peer block w-full rounded-md outline outline-gray-200 outline-2 py-[9px] pl-10 text-md placeholder:text-gray-500"
                required
            />
        </div>
    );
}

function PasswordInput() {
    return (
        <div className='relative flex flex-shrink-0 w-4/5 md:w-3/5'>
            <LockClosedIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            <input
                type="password"
                name="password"
                placeholder="Password"
                className="peer block w-full rounded-md outline outline-gray-200 outline-2 py-[9px] pl-10 text-md placeholder:text-gray-500"
                required
            />
        </div>
    );
}