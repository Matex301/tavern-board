import {
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import clsx from 'clsx';
import { Game } from '@/app/types/Game';


export default function GameListing({games}: any) {
  return (
    <>
      {(games?.length !== 0) ? (
        games.map((game: Game) => (
          <div className="flex w-full bg-slate-50 flex-col md:flex-row mb-4" key={game['@id']}>
            <div className="flex flex-row md:pr-4 grow">
              <div className="m-3 w-48 h-48 relative">
                <Image
                  src={game.image || "/game-listing-templet.webp"}
                  alt="Picture of the author"
                  fill={true}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-5">
                <IconRow LinkIcon={ClockIcon} content={"60 – 120min"} styleName="text-blue-800"/>
                <IconRow LinkIcon={UserGroupIcon} content={`${game.minPlayers} – ${game.maxPlayer}`} styleName="text-blue-600"/>
              </div>
            </div>
            <div className="flex flex-col m-4 md:w-1/2">
              <div className="text-2xl font-bold text-center p-2">
                {game.name}
              </div>
              <p className="pt-1 text-ellipsis overflow-hidden line-clamp-5">
                {game.description}
              </p>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
    </>
  );
}

const IconRow = function({ LinkIcon, content, styleName}: { LinkIcon: typeof ClockIcon, content: string, styleName: string}) {
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

const IconRowSkeleton = function({ LinkIcon, styleName}: { LinkIcon: typeof ClockIcon, styleName: string}) {
  return (
    <div className={clsx(
      "flex items-center justify-start gap-2 m-0 md:text-lg pr-3 md:pr-0",
      styleName
    )}>
      <LinkIcon className="size-6" />
      <p className="flex items-center justify-start h-6 w-32 md:w-48 animate-pulse rounded-md bg-slate-200"></p>
    </div>
  );
};

export function GameListingSkeleton() {
  let arr: Array<number> = [1,2,3];
  return (
    <>
      {(arr.map((nr) => (
        <div className="flex w-full bg-slate-50 flex-col md:flex-row mb-4" key={nr}>
            <div className="flex flex-row md:pr-4 grow">
              <div className="m-3 w-48 h-48 animate-pulse rounded-md bg-slate-200">

              </div>
              <div className="flex flex-col justify-center gap-5">
                <IconRowSkeleton LinkIcon={ClockIcon} styleName="text-blue-800"/>
                <IconRowSkeleton LinkIcon={UserGroupIcon} styleName="text-blue-600"/>
              </div>
            </div>
            <div className="flex flex-col m-4 md:w-1/2">
              <div className="text-2xl font-bold text-center p-2 h-10 w-60 animate-pulse rounded-md bg-slate-200">

              </div>
              <p className="pt-1 text-ellipsis overflow-hidden animate-pulse rounded-md bg-slate-200">

              </p>
            </div>
          </div>
      )))}
    </>
  )
}