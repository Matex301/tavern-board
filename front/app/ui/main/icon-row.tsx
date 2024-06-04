import clsx from 'clsx';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function IconRow({ LinkIcon, content, styleName}: { LinkIcon: typeof MagnifyingGlassIcon, content: string | null | undefined, styleName: string}) {
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

export function IconRowSkeleton({ LinkIcon, styleName}: { LinkIcon: typeof MagnifyingGlassIcon, styleName: string}) {
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