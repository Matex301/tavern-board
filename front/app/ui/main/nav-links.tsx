'use client';

import {
  MagnifyingGlassIcon,
  MapIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { getUserId } from '@/app/api-actions/login-client';
import { usePathname } from 'next/navigation';
import Link from 'next/link'
import clsx from 'clsx';

const links = [
  { name: 'Find Quests', href: '/main', icon: MagnifyingGlassIcon, login: false },
  { name: 'Tavern Map', href: '/main/map', icon: MapIcon, login: false },
  { name: 'Accepted Quests', href: '/main/history', icon: ClipboardDocumentCheckIcon, login: true },
  { name: 'Game Library', href: '/main/games', icon: BookOpenIcon, login: false }
];

export default function NavLinks() {
  const pathname = usePathname();

  const [userId, setUserId] = useState<string|null>(null);

  useEffect(() => {
    setUserId(getUserId());
  },[]);

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-slate-200 p-3 text-sm font-medium hover:bg-slate-400 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'text-blue-500': pathname === link.href,
                'text-black': pathname !== link.href,
                'hidden': link.login && !userId
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
