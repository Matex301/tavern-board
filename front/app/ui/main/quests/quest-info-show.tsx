import Image from 'next/image';
import clsx from 'clsx';
import IconRow, { IconRowSkeleton } from '../icon-row';
import { Quest } from '@/app/types/Quest';
import { useRouter } from 'next/navigation';
import { Dispatch, MouseEventHandler, useState } from 'react';
import { joinQuest, leaveQuest } from '@/app/api-actions/quests';
import {
    PuzzlePieceIcon,
    ClockIcon,
    MapPinIcon,
    BuildingStorefrontIcon,
    UserIcon,
    UserGroupIcon,
    ArrowRightEndOnRectangleIcon,
    ArrowRightStartOnRectangleIcon
} from '@heroicons/react/24/outline';
import dateFormatted from './date-formatted';
import Spinner from '../spinner';
import Button from '../icon-button';
import { getUserId } from '@/app/api-actions/login-client';


export default function QuestInfo({quest, setQuest}: {quest: Quest, setQuest: Dispatch<Quest>}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const controller = new AbortController();
    const signal = controller.signal;

    async function onClickJoin() {
        if(!getUserId()) {
            router.push('/login');
        }

        setLoading(true);
        const updatedQuest = await joinQuest(signal, quest.id);
        if(updatedQuest) {
            setQuest(updatedQuest);
        }
        setLoading(false);
    }

    async function onClickLeave() {
        setLoading(true);
        const updatedQuest = await leaveQuest(signal, quest.id);
        if(updatedQuest) {
            setQuest(updatedQuest);
        }
        setLoading(false);
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
                    <div className="text-2xl font-bold text-center">{quest.title}</div>
                    <IconRow LinkIcon={PuzzlePieceIcon} content={quest.game.name} styleName="text-blue-800"/>
                    <IconRow LinkIcon={ClockIcon} content={dateFormatted(quest.startAt, quest.endAt)} styleName="text-blue-600"/>
                    <IconRow LinkIcon={BuildingStorefrontIcon} content={quest.tavern.name} styleName="text-blue-400"/>
                    <IconRow LinkIcon={MapPinIcon} content={quest.tavern.address.street + ', ' + quest.tavern.address.city + ', ' + quest.tavern.address.country} styleName="text-blue-400"/>
                    <IconRow LinkIcon={UserGroupIcon} content={playerSlicer(quest.currentPlayers, quest.maxPlayers)} styleName="text-neutral-800"/>
                    <IconRow LinkIcon={UserIcon} content={quest.creator.username} styleName="text-neutral-800"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4 text-ellipsis whitespace-pre-line p-4 text-neutral-800">
                    {quest.description}
                </div>
                <div className="flex flex-col items-center justify-content gap-4 md:w-1/4 p-4">
                    {quest && (
                        quest.isPlayer() ?
                            <Button text='Leave' onClick={onClickLeave} disabled={loading} LinkIcon={ArrowRightStartOnRectangleIcon}/> :
                            <Button text='Join' onClick={onClickJoin} disabled={loading} LinkIcon={ArrowRightEndOnRectangleIcon}/>
                    )}
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

export function QuestInfoShowSkeleton() {
    return (
        <div className="flex flex-col z-40 bg-white w-5/6 md:w-2/3 max-h-[90%] overflow-y-auto">
            <div className="flex flex-col md:flex-row">
                <div className="h-64 w-full md:w-1/3 md:h-auto animate-pulse bg-slate-200">

                </div>
                <div className="flex flex-col w-full md:w-2/3 md:h-full p-4 gap-4">
                    <div className="h-9 w-60 self-center animate-pulse rounded-md bg-slate-200"></div>
                    <IconRowSkeleton LinkIcon={PuzzlePieceIcon} styleName="text-blue-800"/>
                    <IconRowSkeleton LinkIcon={ClockIcon} styleName="text-blue-600"/>
                    <IconRowSkeleton LinkIcon={BuildingStorefrontIcon} styleName="text-blue-400"/>
                    <IconRowSkeleton LinkIcon={MapPinIcon} styleName="text-blue-400"/>
                    <IconRowSkeleton LinkIcon={UserGroupIcon} styleName="text-neutral-800"/>
                    <IconRowSkeleton LinkIcon={UserIcon} styleName="text-neutral-800"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4 m-4 animate-pulse rounded-md bg-slate-200">

                </div>
                <div className="flex flex-col justify-content gap-4 md:w-1/4 p-4">
                    <button type="submit" className="self-center w-3/4 bg-slate-200 h-16 md:h-12 rounded-md font-medium">
                    </button>
                    <button type="submit" className="self-center w-3/4 bg-slate-200 h-16 md:h-12 rounded-md font-medium">
                    </button>
                    <button type="submit" className="self-center w-3/4 bg-slate-200 h-16 md:h-12 rounded-md font-medium">
                    </button>
                </div>
            </div>
        </div>
    );
}