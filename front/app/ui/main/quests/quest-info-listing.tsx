import Image from 'next/image';
import clsx from 'clsx';
import { Quest } from '@/app/types/Quest';
import {
    PuzzlePieceIcon,
    ClockIcon,
    MapPinIcon,
    BuildingStorefrontIcon,
    UserIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

export default function QuestInfoListing({quest}: any) {
    return (
        <div className="flex flex-col z-40 bg-white w-5/6 md:w-2/3 overflow-y-auto">
            <div className="flex flex-col md:flex-row">
                <div className="h-64 w-full md:w-1/3 md:h-auto relative">
                    <Image
                        src={(quest.image || quest.game.image) || "/quest-listing-templet.jpg"}
                        alt="Picture of the game"
                        fill={true}
                        objectFit='cover'
                        className=""
                    />
                </div>
                <div className="flex flex-col w-full md:w-2/3 md:h-full justify-center p-4 gap-4">
                    <div className="text-2xl font-bold text-center">{quest.title}</div>
                    <IconRow LinkIcon={PuzzlePieceIcon} content={quest.game.name} styleName="text-blue-800"/>
                    <IconRow LinkIcon={ClockIcon} content={dateSlicer(quest.startAt, quest.endAt)} styleName="text-blue-600"/>
                    <IconRow LinkIcon={BuildingStorefrontIcon} content={quest.tavern.name} styleName="text-blue-400"/>
                    <IconRow LinkIcon={MapPinIcon} content={quest.tavern.address.street + ', ' + quest.tavern.address.city + ', ' + quest.tavern.address.country} styleName="text-blue-400"/>
                    <IconRow LinkIcon={UserGroupIcon} content={playerSlicer(quest.currentPlayers, quest.maxPlayers)} styleName="text-neutral-800"/>
                    <IconRow LinkIcon={UserIcon} content={quest.creator.username} styleName="text-neutral-800"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4 text-ellipsis whitespace-pre-line overflow-y-auto p-4 text-neutral-800">
                    {quest.description}
                </div>
                <div className="flex flex-col justify-content gap-4 md:w-1/4 p-4">
                    <button type="submit" className="self-center w-1/2 md:w-3/4 mb-4 bg-slate-200 hover:bg-slate-300 h-16 md:h-12 rounded-md font-medium">
                        Join
                    </button>
                </div>
            </div>
        </div>
    );
}

const IconRow = function({ LinkIcon, content, styleName}: { LinkIcon: typeof PuzzlePieceIcon, content: string | null | undefined, styleName: string}) {
    return (
        <div className={clsx(
        "flex items-center justify-start gap-2 m-0 md:text-lg",
        styleName
        )}>
        <LinkIcon className="size-6" />
        <p className="flex items-center justify-start">{content}</p>
        </div>
    );
};

function dateSlicer(start: any, end: any) {
    let ret = start.toString().replace(/T/, ' ').replace(/\..+/, '').slice(0, 16);
    if(end)
        ret += '-' + end.toString().slice(11, 16);
    return ret;
}

function playerSlicer(current: any, max: any) {
    let ret = current;
    if(max)
        ret += '/' + max;
    return ret;
}

export function QuestInfoListingSkeleton() {
    return (
        <div className="flex flex-col z-40 bg-white w-5/6 md:w-2/3 overflow-y-auto">
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
                    <button type="submit" className="self-center w-3/4 bg-slate-200 hover:bg-slate-300 h-16 md:h-12 rounded-md font-medium">
                    </button>
                    <button type="submit" className="self-center w-3/4 bg-slate-200 hover:bg-slate-300 h-16 md:h-12 rounded-md font-medium">
                    </button>
                    <button type="submit" className="self-center w-3/4 bg-slate-200 hover:bg-slate-300 h-16 md:h-12 rounded-md font-medium">
                    </button>
                </div>
            </div>
        </div>
    );
}

const IconRowSkeleton = function({ LinkIcon, styleName}: { LinkIcon: typeof PuzzlePieceIcon, styleName: string}) {
    return (
      <div className={clsx(
        "flex items-center justify-start gap-2 m-0 md:text-lg pr-3 md:pr-0",
        styleName
      )}>
        <LinkIcon className="size-6" />
        <p className="flex items-center justify-start h-6 w-36 md:w-52 animate-pulse rounded-md bg-slate-200"></p>
      </div>
    );
  };