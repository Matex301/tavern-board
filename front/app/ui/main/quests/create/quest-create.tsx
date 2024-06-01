import { MouseEventHandler, useState } from 'react';
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import DateSelect from '../edit/date-select';
import TavernCombobox from '../edit/tavern-combobox';
import GameCombobox from '../edit/game-combobox';
import { TavernSelect } from '@/app/types/TavernSelect';
import { GameSelect } from '@/app/types/GameSelect';
import Spinner from '@/app/ui/main/spinner';
import {
    PuzzlePieceIcon,
    ClockIcon,
    MapPinIcon,
    BuildingStorefrontIcon,
    UserGroupIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';
import { CreateQuest, createQuest } from '@/app/api-actions/quests';
import Button from '../../icon-button';


export default function QuestCreate() {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [startAt, setStartAt] = useState<Date>(new Date());
    const [endAt, setEndAt] = useState<Date>();
    const [tavern, setTavern] = useState<TavernSelect>(new TavernSelect('', '', '', {street: 'Street', city: 'City', country: 'Country'}));
    const [game, setGame] = useState<GameSelect>(new GameSelect('', '', ''));
    const [maxPlayers, setMaxPlayers] = useState<number>();
    const [description, setDescription] = useState<string>('');

    const router = useRouter();
    const controller = new AbortController();
    const signal = controller.signal;

    async function onClick() {
        
        if(!title)
            return;

        if(!description)
            return;

        if(!startAt)
            return;

        if(!game)
            return;

        if(!tavern)
            return;

        let create: CreateQuest = {
            title: title,
            description: description,
            startAt: startAt.toISOString(),
            game: game['@id'],
            tavern: tavern['@id']
        };

        if(endAt)
            create.endAt = endAt.toISOString();

        if(maxPlayers && maxPlayers != 0)
            create.maxPlayers = Number(maxPlayers);

        setLoading(true);
        const createdQuest = await createQuest(signal, create);
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
                className="md:w-1/2 text-2xl font-bold text-center placeholder:text-gray-500"
                spellCheck={false}
                value={title}
                onChange={(obj: any) => {setTitle(obj.target.value)}}
                rows={1}
                placeholder='Title'
            />

            <div className="flex items-center justify-start gap-2 m-0 md:text-lg text-blue-800">
                <PuzzlePieceIcon className="size-6" />
                <GameCombobox game={game} setGame={setGame}/>
            </div>

            <div className="flex items-center justify-start gap-2 m-0 md:text-lg ">
                <ClockIcon className="size-6 text-blue-600" />
                <DateSelect date={startAt} setDate={setStartAt} />
            </div>

            <div className="flex items-center justify-start gap-2 m-0 md:text-lg ">
                <ClockIcon className="size-6 text-blue-600" />
                <DateSelect date={endAt} setDate={setEndAt} />
            </div>

            <div className="flex items-center justify-start gap-2 m-0 md:text-lg text-blue-400">
                <BuildingStorefrontIcon className="size-6" />
                <TavernCombobox tavern={tavern} setTavern={setTavern}/>
            </div>
                    
            <div className="flex items-center justify-start gap-2 m-0 md:text-lg text-blue-400">
                <MapPinIcon className="size-6" />
                <p className="flex items-center justify-start">{tavern.address.street + ', ' + tavern.address.city + ', ' + tavern.address.country}</p>
            </div>

            <div className="flex items-center justify-start gap-2 m-0 md:text-lg text-neutral-800">
                <UserGroupIcon className="size-6" />
                <input type="number" min="0" max="100"
                    className='py-1 rounded-md placeholder:text-gray-500'
                    value={maxPlayers || ''}
                    onChange={(obj: any) => {setMaxPlayers(obj.target.value ?? undefined)}}
                    placeholder='Max Number of Players'
                />
            </div>

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