import Image from 'next/image';
import IconRow from '../icon-row';
import TavernCombobox from './edit/tavern-combobox';
import DateSelect from './edit/date-select';
import { Dispatch, MouseEventHandler } from 'react';
import { TavernSelect } from '@/app/types/TavernSelect';
import { useState } from 'react';
import { Quest } from "@/app/types/Quest";
import { deleteQuest, updateQuest, UpdateQuest } from '@/app/api-actions/quests';
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import {
    PuzzlePieceIcon,
    ClockIcon,
    MapPinIcon,
    BuildingStorefrontIcon,
    UserIcon,
    UserGroupIcon,
    TrashIcon,
    CheckIcon
} from '@heroicons/react/24/outline';
import Spinner from '../spinner';
import Button from '../icon-button';



export default function QuestInfoEdit({quests, setQuests, quest, setQuest}: {quests: Quest[] , setQuests: Dispatch<(Quest)[]>, quest: Quest, setQuest: Dispatch<Quest>}) {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState<string>(quest.title);
    const [description, setDescription] = useState<string>(quest.description);
    const [date, setDate] = useState<Date>(new Date(quest.startAt));
    const [tavern, setTavern] = useState<TavernSelect>(quest.tavern as TavernSelect);

    const controller = new AbortController();
    const signal = controller.signal;

    async function onClickSave() {
        let update: UpdateQuest = {};
        setLoading(true);
        if(title !== quest.title)
            update.title = title;

        if(description !== quest.description)
            update.description = description;

        if(date.toDateString() !== new Date(quest.startAt).toDateString())
            update.startAt = date.toISOString();

        if(tavern.id !== quest.tavern.id)
            update.tavern = tavern['@id'];

        if(!Object.keys(update).length) {
            setLoading(false);
            return;
        }
        
        const updatedQuest = await updateQuest(signal, quest.id, update);
        setLoading(false);
        if(!updatedQuest)
            return;

        setQuest(updatedQuest);
        setQuests(quests.map(old => old.id !== updatedQuest.id ? old : updatedQuest));
    }

    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    async function onClickDelete() {
        setLoading(true);
        const isDeleted = await deleteQuest(signal, quest.id);
        setLoading(false);
        if(!isDeleted)
            return;

        setQuests(quests.filter(old => old.id !== quest.id));
        const update = new URLSearchParams(params.toString());
        update.delete('quest');
        router.replace(`${pathname}?${update}`, {scroll: false});
    }

    return (
        <div className="flex flex-col z-40 bg-white w-5/6 md:w-2/3 max-h-[90%] overflow-y-auto">
            <div className="flex flex-col md:flex-row">
                <div className="h-64 w-full md:w-1/3 md:h-auto relative">
                    <Image
                        src={(quest.image || quest.game.image) || "/quest-listing-templet.jpg"}
                        alt="Picture of the game"
                        fill={true}
                        objectFit='cover'
                    />
                </div>
                <div className="flex flex-col w-full md:w-2/3 md:h-full justify-center p-4 gap-4">
                    <textarea 
                        className="text-2xl font-bold text-center placeholder:text-gray-500"
                        spellCheck={false}
                        value={title}
                        onChange={(obj: any) => {setTitle(obj.target.value)}}
                        rows={2}
                    >
                    </textarea>

                    <IconRow LinkIcon={PuzzlePieceIcon} content={quest.game.name} styleName="text-blue-800"/>

                    <div className="flex items-center justify-start gap-2 m-0 md:text-lg ">
                        <ClockIcon className="size-6 text-blue-600" />
                        <DateSelect date={date} setDate={setDate} />
                    </div>
                    <div className="flex items-center justify-start gap-2 m-0 md:text-lg text-blue-400">
                        <BuildingStorefrontIcon className="size-6" />
                        <TavernCombobox tavern={tavern} setTavern={setTavern}/>
                    </div>
                    
                    <IconRow LinkIcon={MapPinIcon} content={tavern.address.street + ', ' + tavern.address.city + ', ' + tavern.address.country} styleName="text-blue-400"/>
                    <IconRow LinkIcon={UserGroupIcon} content={playerSlicer(quest.currentPlayers, quest.maxPlayers)} styleName="text-neutral-800"/>
                    <IconRow LinkIcon={UserIcon} content={quest.creator.username} styleName="text-neutral-800"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <textarea 
                    className="md:w-3/4 text-ellipsis whitespace-pre-line p-4 text-neutral-800 placeholder:text-gray-500"
                    spellCheck={false}
                    value={description}
                    onChange={(obj: any) => {setDescription(obj.target.value)}}
                    rows={8}
                >
                </textarea>
                <div className="flex flex-col items-center justify-content gap-4 md:w-1/4 p-4">
                    <Button text='Save' onClick={onClickSave} disabled={loading} LinkIcon={CheckIcon}/>
                    <Button text='Delete' onClick={onClickDelete} disabled={loading} LinkIcon={TrashIcon}/>
                    {loading && <Spinner />}
                </div>
            </div>
        </div>
    );
}

function playerSlicer(current: any, max: any) {
    let ret = current;
    if(max)
        ret += '/' + max;
    return ret;
}