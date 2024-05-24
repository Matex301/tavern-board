import SideNav from '@/app/ui/main/sidenav';
import UpperNav from '@/app/ui/main/uppernav';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <div className="flex w-sceen h-screen flex-col">
          <div className="flex-none bg-slate-100">
            <UpperNav />
          </div>
          <div className="flex-grow h-screen w-screen flex flex-col md:flex-row md:overflow-hidden bg-slate-200">
            <div className="w-full flex-none md:w-64 bg-slate-100">
              <SideNav />
            </div>
            <div className="flex-grow p-4 overflow-y-auto md:p-10 bg-slate-200 no-scrollbar">{children}</div>
          </div>
        </div>
  );
}