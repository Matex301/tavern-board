import { useState } from 'react';
import {useRouter} from "next/navigation";
import Spinner from '@/app/ui/main/spinner';
import {
    PuzzlePieceIcon,
    ClockIcon,
    MapPinIcon,
    BuildingStorefrontIcon,
    UserGroupIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';
import Button from '../../icon-button';
import { Address } from '@/app/types/Tavern';
import { CreateTavern, createTavern } from '@/app/api-actions/taverns';


export default function QuestCreate() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState<string>('');
    const [website, setWebsite] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<Address>({country: '', city: '', street: '', latitude: 0, longitude: 0});
    const [description, setDescription] = useState<string>('');

    const router = useRouter();
    const controller = new AbortController();
    const signal = controller.signal;

    async function onClick() {
        
        if(!name)
            return;

        if(!website)
            return;

        if(!address.country)
            return;

        if(!address.city)
            return;

        if(!address.street)
            return;

        let create: CreateTavern = {
            name: name,
            website: website,
            address: address
        };

        if(phone)
            create.phone = phone;

        setLoading(true);
        const createdQuest = await createTavern(signal, create);
        console.log(createdQuest);
        setLoading(false);

        if(!createdQuest)
            return;

        const pathname = '/main';
        const update = new URLSearchParams();
        update.set('quest', createdQuest.id);
        router.replace(`${pathname}?${update}`);
    }

    return (
        <form className="flex flex-col w-full justify-center p-4 gap-4 bg-slate-50">

            <textarea
                className="md:w-1/2 text-2xl font-bold self-center text-center placeholder:text-gray-500"
                spellCheck={false}
                value={name}
                onChange={(obj: any) => {setName(obj.target.value)}}
                rows={1}
                placeholder='Name'
            />

            <div className="flex flex-col md:flex-row">
                <textarea 
                    className="md:w-3/4 text-ellipsis whitespace-pre-line p-4 text-neutral-800 placeholder:text-gray-500"
                    spellCheck={false}
                    value={description}
                    onChange={(obj: any) => {setDescription(obj.target.value)}}
                    rows={8}
                    placeholder='Description'
                />
                <div className="flex flex-col items-center justify-content gap-4 md:w-1/4 p-4">
                    <Button text='Save' onClick={onClick} disabled={loading} LinkIcon={PencilSquareIcon}/>
                    {loading && <Spinner />}
                </div>
            </div>
        </form>
    );
}