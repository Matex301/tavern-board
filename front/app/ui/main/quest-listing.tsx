
import Image from 'next/image';
import clsx from 'clsx';
import {
  PuzzlePieceIcon,
  ClockIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

export default function QuestListing() {
    return (
      <div className="flex w-full bg-slate-50 flex-col md:flex-row mb-4">
        <div className="flex flex-row md:pr-4 grow">
          <div className="m-3 w-48 h-48 relative">
            <Image
                src="/quest-listing-templet.jpg"
                alt="Picture of the author"
                fill={true}
                object-fit="cover"
              />
          </div>
          <div className="flex flex-col justify-center gap-5">
            <IconRow LinkIcon={PuzzlePieceIcon} content={"Magic the Gathering"} styleName="text-blue-800"/>
            <IconRow LinkIcon={ClockIcon} content={"Tuesday 18:00-22:00"} styleName="text-blue-600"/>
            <IconRow LinkIcon={MapPinIcon} content={"Miodowa 28, Kraków, Poland"} styleName="text-blue-400"/>
          </div>
        </div>
        <div className="flex flex-col m-4 md:w-1/2 p-2">
          <div className="text-2xl font-bold text-center">
            Wtorkowy Modern
          </div>
          <p className="pt-1 text-ellipsis overflow-hidden ">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id dui enim. Curabitur consequat nulla ornare dolor imperdiet, at faucibus mauris blandit. Quisque et nunc nunc. Curabitur finibus molestie finibus. Nunc eget ultrices eros. Phasellus bibendum placerat ante, at vestibulum tortor. Nullam nec arcu nulla. Quisque convallis diam eget orci. 
          </p>
        </div>
      </div>
    );
  }

const IconRow = function({ LinkIcon, content, styleName}: { LinkIcon: typeof PuzzlePieceIcon, content: string, styleName: string}) {
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