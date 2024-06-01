import { MouseEventHandler } from "react";
import { CheckIcon } from '@heroicons/react/24/outline';

export default function Button({text, onClick, disabled, LinkIcon}: {text: string, onClick: MouseEventHandler<HTMLButtonElement>, disabled: boolean, LinkIcon: typeof CheckIcon}) {
    return(
        <button type="submit" onClick={onClick} disabled={disabled} className="flex self-center w-fit items-center justify-start gap-2 p-2 px-3 pr-8 min-w-36 text-xl rounded-md bg-slate-200 hover:bg-slate-300 disabled:bg-slate-300">
            <LinkIcon className="w-6" />
            {text}
        </button>
    );
}