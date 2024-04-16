import Link from 'next/link';
import NavLinks from '@/app/ui/main/nav-links';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-3 pt-0 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-slate-50 md:block"></div>
        <div>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-slate-200 p-3 text-sm font-medium hover:bg-slate-400 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </div>
      </div>
    </div>
  );
}