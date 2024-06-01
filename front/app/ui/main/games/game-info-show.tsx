import Image from 'next/image';
import clsx from 'clsx';
import { Quest } from '@/app/types/Quest';
import {
    ClockIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';
import { Game } from '@/app/types/Game';


export default function GameInfoShow({game}: {game: Game}) {

    const controller = new AbortController();
    const signal = controller.signal;

    return (
        <div className="flex flex-col z-40 bg-white w-5/6 md:w-2/3 max-h-[90%] overflow-y-auto">
            <div className="flex flex-col md:flex-row">
                <div className="h-64 w-full md:w-1/3 relative">
                    <Image
                        src={game.image || "/quest-listing-templet.jpg"}
                        alt="Picture of the game"
                        fill={true}
                        objectFit='cover'
                    />
                </div>
                <div className="flex flex-col w-full md:w-2/3 md:h-full justify-center p-4 gap-4">
                    <div className="text-2xl font-bold text-center">{game.name}</div>
                    <IconRow LinkIcon={ClockIcon} content={"60 – 120min"} styleName="text-blue-800"/>
                    <IconRow LinkIcon={UserGroupIcon} content={playersFormatted(game.minPlayers, game.maxPlayer)} styleName="text-blue-600"/>
                </div>
            </div>
            <div className="flex flex-col md:flex-row">
                <div className="md:w-3/4 text-ellipsis whitespace-pre-line p-4 text-neutral-800">
                    {game.description}
                </div>
                <div className="flex flex-col justify-content gap-4 md:w-1/4 p-4">
                    <button type="submit" className="self-center w-1/2 md:w-3/4 bg-slate-200 hover:bg-slate-300 h-16 md:h-12 rounded-md font-medium">
                        Find
                    </button>
                </div>
            </div>
        </div>
    );
}

function playersFormatted(minPlayers?: number, maxPlayer? : number) {
    if(minPlayers && maxPlayer)
        return `${minPlayers} – ${maxPlayer}`;
    if(minPlayers)
        return `${minPlayers}`;
    if(maxPlayer)
        return `${maxPlayer}`;
    return `No Recommendation`;
}

function IconRow({ LinkIcon, content, styleName}: { LinkIcon: typeof ClockIcon, content: string | null | undefined, styleName: string}) {
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

export function GameInfoShowSkeleton() {
    return (
        <div className="flex flex-col z-40 bg-white w-5/6 md:w-2/3 overflow-y-auto">
            <div className="flex flex-col md:flex-row">
                <div className="h-64 w-full md:w-1/3 md:h-auto animate-pulse bg-slate-200">

                </div>
                <div className="flex flex-col w-full md:w-2/3 md:h-full p-4 gap-4">
                    <div className="h-9 w-60 self-center animate-pulse rounded-md bg-slate-200"></div>
                    <IconRowSkeleton LinkIcon={ClockIcon} styleName="text-blue-800"/>
                    <IconRowSkeleton LinkIcon={UserGroupIcon} styleName="text-blue-600"/>
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

const IconRowSkeleton = function({ LinkIcon, styleName}: { LinkIcon: typeof ClockIcon, styleName: string}) {
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