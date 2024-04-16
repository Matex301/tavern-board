'use client';

import {
  MagnifyingGlassIcon,
  MapIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { name: 'Find Quests', href: '/main', icon: MagnifyingGlassIcon },
  { name: 'Tavern Map', href: '/main/map', icon: MapIcon},
  { name: 'Accepted Quests', href: '/main/history', icon: ClipboardDocumentCheckIcon },
  { name: 'Game Library', href: '/main/library', icon: BookOpenIcon }
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <a
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-200 p-3 text-sm font-medium hover:bg-slate-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-blue-500': pathname === link.href,
                'text-black': pathname !== link.href
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}
