import Image from 'next/image';
import clsx from 'clsx';
import { Game } from '@/app/types/Game';
import IconRow, { IconRowSkeleton } from '../icon-row';
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import {
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';



export default function GameListing({games}: {games: Game[]}) {

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function onClick(id: string)
  {
    if(!id)
      return;

    const update = new URLSearchParams(params.toString());
    update.set('game', id);
    router.replace(`${pathname}?${update}`, {scroll: false});
  }

  return (
    <>
      {(games?.length !== 0) ? (
        games.map((game: Game) => (
          <div onClick={() => {onClick(game.id)}} className="flex w-full min-h-52 bg-slate-50 flex-col md:flex-row mb-4 hover:bg-slate-300" key={game['@id']}>
            <div className="flex flex-row gap-4 md:pr-4 grow">
              <div className="w-48 h-48 md:h-full relative">
                <Image
                  src={game.image || "/game-listing-templet.webp"}
                  alt="Picture of the game"
                  fill={true}
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center gap-5">
                <IconRow LinkIcon={ClockIcon} content={"60 – 120min"} styleName="text-blue-800"/>
                <IconRow LinkIcon={UserGroupIcon} content={`${game.minPlayers} – ${game.maxPlayer}`} styleName="text-blue-600"/>
              </div>
            </div>
            <div className="flex flex-col m-4 md:w-1/2 p-2">
              <div className="text-2xl font-bold text-center">
                {game.name}
              </div>
              <p className="pt-1 text-ellipsis overflow-hidden line-clamp-5 text-neutral-800">
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

export function GameListingSkeleton() {
  let arr: Array<number> = [1,2,3];
  return (
    <>
      {(arr.map((nr) => (
        <div className="flex w-full h-52 bg-slate-50 flex-col md:flex-row mb-4" key={nr}>
            <div className="flex flex-row gap-4 md:pr-4 grow">
              <div className="w-48 h-48 md:h-full animate-pulse rounded-md bg-slate-200">

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