import type { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#e8f0ff]">
      <Header />
      <main className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-10">
        <div className="rounded-3xl bg-white/70 px-4 py-6 sm:px-8 sm:py-10 shadow-sm">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
