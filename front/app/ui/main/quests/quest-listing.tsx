
import Image from 'next/image';
import clsx from 'clsx';
import {
  PuzzlePieceIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import { Quest } from '@/app/types/Quest';
import Link from "next/link";

export default function QuestListing({quests}: any) {

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  function onClick(id: string | undefined)
  {
    if(!id)
      return;

    const update = new URLSearchParams(params.toString());
    update.set('quest', id);
    router.replace(`${pathname}?${update}`);
  }

  return (
    <>
      {(quests?.length !== 0) ? (
        quests.map((quest: Quest) => (
          <div onClick={() => {onClick(quest.id)}} className="flex w-full min-h-52 bg-slate-50 flex-col md:flex-row mb-4 hover:bg-slate-300" key={quest['@id']}>
              <div className="flex flex-row gap-4 md:pr-4 grow">
              <div className="w-48 h-48 md:h-full relative">
                <Image
                  src={(quest.image || quest.game.image) || "/quest-listing-templet.jpg"}
                  alt="Picture of the game"
                  fill={true}
                  className="object-cover"
                />
              </div>
                <div className="flex flex-col justify-center gap-5">
                  <IconRow LinkIcon={PuzzlePieceIcon} content={quest.game.name} styleName="text-blue-800"/>
                  <IconRow LinkIcon={ClockIcon} content={dateSlicer(quest.startAt, quest.endAt)} styleName="text-blue-600"/>
                  <IconRow LinkIcon={MapPinIcon} content={quest.tavern.address.street + ', ' + quest.tavern.address.city} styleName="text-blue-400"/>
                </div>
              </div>
              <div className="flex flex-col m-4 md:w-1/2 p-2">
                <div className="text-2xl font-bold text-center">
                  {quest.title}
                </div>
                <p className="pt-1 text-ellipsis overflow-hidden line-clamp-5 text-neutral-800">
                  {quest.description}
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

export function QuestListingSkeleton() {
  let arr: Array<number> = [1,2,3];
  return (
    <>
      {(arr.map((nr) => (
        <div className="flex w-full h-52 bg-slate-50 flex-col md:flex-row mb-4" key={nr}>
          <div className="flex flex-row gap-4 md:pr-4 grow">
            <div className="w-48 h-48 md:h-full animate-pulse rounded-md bg-slate-200">
      
            </div>
            <div className="flex flex-col justify-center gap-5">
              <IconRowSkeleton LinkIcon={PuzzlePieceIcon} styleName="text-blue-800"/>
              <IconRowSkeleton LinkIcon={ClockIcon} styleName="text-blue-600"/>
              <IconRowSkeleton LinkIcon={MapPinIcon} styleName="text-blue-400"/>
            </div>
          </div>
          <div className="flex flex-col m-4 md:w-1/2 p-2 items-center">
            <div className="text-2xl font-bold text-center h-10 w-60 animate-pulse rounded-md bg-slate-200">
      
            </div>
            <p className="mt-2 text-ellipsis overflow-hidden h-32 w-10/12 animate-pulse rounded-md bg-slate-200">
      
            </p>
          </div>
        </div>
      )))}
    </>
  )
}

const IconRowSkeleton = function({ LinkIcon, styleName}: { LinkIcon: typeof PuzzlePieceIcon, styleName: string}) {
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