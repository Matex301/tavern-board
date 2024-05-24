"use client"

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { UserIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Spinner from './spinner';
import { useRouter } from 'next/navigation';
import { createUser } from '@/app/api-actions/registration';
import ErrorMessage from './error-message';

export default function Registration({setTab}: {setTab: Dispatch<SetStateAction<number>>}) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);
        let data;

        try {
            const fromData = new FormData(event.currentTarget);
            let username: string = fromData.get('username')?.toString() ?? "";
            let email: string = fromData.get('email')?.toString() ?? "";
            let password: string = fromData.get('password')?.toString() ?? "";
            let confirmPassword: string = fromData.get('confirmPassword')?.toString() ?? "";

            if(password != confirmPassword) {
                return;
            }

            data = await createUser(username, email, password);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        if(data?.status == 201) {
            setSuccess(true);
        } else {
            setError(data?.message);
        }
    }

    return (
        <form className="flex grow justify-between items-center flex-col gap-2 mt-4" onSubmit={onSubmit}>
            <UsernameInput />
            <EmailInput />
            <PasswordInput />

            <div className="h-auto w-full grow rounded-md bg-slate-50"></div>
            {error && <ErrorMessage error={error}/>}
            {success && <SuccessMessage />}
            {loading && <Spinner />}

            <div className="flex flex-col h-auto w-full justify-between items-center my-4 gap-1">
                <button type="submit" disabled={loading} className="w-1/2 md:w-1/3 bg-slate-200 hover:bg-slate-300 h-[48px] rounded-md font-medium">
                    Submit
                </button>
                <div className="cursor-pointer text-blue-400 text-sm" onClick={() => {setTab(0);}}>
                    Sign In
                </div>
            </div>
        </form>
    );
}

function UsernameInput() {
    return (
        <div className='relative flex flex-shrink-0 w-3/5'>
            <UserIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            <input
                type="text"
                name="username"
                placeholder="Username"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-md outline-2 placeholder:text-gray-500"
                min={6}
                required
            />
        </div>
    );
}

function EmailInput() {
    return (
        <div className='relative flex flex-shrink-0 w-3/5'>
            <LockClosedIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
            <input
                type="email"
                name="email"
                placeholder="Email"
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-md outline-2 placeholder:text-gray-500"
                required
            />
        </div>
    );
}

function PasswordInput() {
    return (
        <>
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
                    <div className='relative flex flex-shrink-0 w-3/5'>
                    <LockClosedIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900"/>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-md outline-2 placeholder:text-gray-500"
                        required
                    />
            </div>
        </>
    );
}

function SuccessMessage() {
    return (
        <p className='flex w-4/5 md:w-3/5 p-2 text-ellipsis overflow-hidden line-clamp-2 bg-green-300 rounded-lg outline outline-green-400 outline-2 text-sm text-gray-500 justify-center'>
            Account created, please check your email.
        </p>
    );
}