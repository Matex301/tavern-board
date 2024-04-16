

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen w-screen md:overflow-hidden">
        <div className="flex-grow p-6 md:p-12">{children}</div>
      </div>
    );
  }