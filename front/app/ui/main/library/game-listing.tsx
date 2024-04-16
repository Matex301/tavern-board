import {
  ClockIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import clsx from 'clsx';


export default function GameListing() {
  return (
    <div className="flex w-full bg-slate-50 flex-col md:flex-row mb-4">
      <div className="flex flex-row md:pr-4 grow">
        <div className="m-3 w-48 h-48 relative">
          <Image
              src="/game-listing-templet.webp"
              alt="Picture of the author"
              fill={true}
              object-fit="cover"
            />
        </div>
        <div className="flex flex-col justify-center gap-5">
          <IconRow LinkIcon={ClockIcon} content={"60 – 120min"} styleName="text-blue-800"/>
          <IconRow LinkIcon={UserGroupIcon} content={"2 – 6"} styleName="text-blue-600"/>
        </div>
      </div>
      <div className="flex flex-col m-4 md:w-1/2">
        <div className="text-2xl font-bold text-center p-2">
          Dune: Imperium Uprising
        </div>
        <p className="pt-1 text-ellipsis overflow-hidden ">
          In Dune: Imperium Uprising, you want to continue to balance military  might with political intrigue, wielding new tools in pursuit of victory.
        </p>
      </div>
    </div>
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