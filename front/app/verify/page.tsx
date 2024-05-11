"use client"
import { Transition } from '@headlessui/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchVerify, verifyParams } from '../api-actions/verify';

export default function Page() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function sendVerify(signal: AbortSignal, params: verifyParams) {
        const status = await fetchVerify(signal, params);
        setLoading(false);
        
        if(status == 200)
            router.replace('/login');
    }
    
    const controller = new AbortController();
    const signal = controller.signal;

    let once = false;
    useEffect(() => {
        let params: verifyParams = {
            expires: searchParams.get('expires') ?? null,
            id: searchParams.get('id') ?? null,
            signature: searchParams.get('signature') ?? null,
            token: searchParams.get('token') ?? null
        };

        if(!params.expires || !params.id || !params.signature || !params.token) {
            router.replace('/main');
            return;
        }

        if(once)
            return;
        once = true;
        setLoading(true);
        sendVerify(signal, params);
    },[]);


    return (
        <div className='flex h-full w-full items-center justify-center flex-col'>
            <Transition
                show={true}
                appear={true}
                enter="transition-all ease-linear duration-200"
                enterFrom="opacity-0 scale-0"
                enterTo="opacity-100 scale-100"
                leave="transition-all ease-linear duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-0"
                className='flex flex-col items-center justify-center md:w-1/3 md:h-1/3 p-5 bg-slate-100 rounded-lg border border-gray-200 outline-5 gap-5'
            >
                <p className='text-2xl'>Please wait</p>
                {loading && <Spinner />}
                <p className='text-1xl'>Verifying...</p>
            </Transition>
        </div>
    );
}

function Spinner() {
    return (
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    );
}