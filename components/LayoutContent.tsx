"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import Sidebar from "./sidebar";
import { ReactNode } from "react";

export default function LayoutContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Hide sidebar and header on auth pages
  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname]);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto w-full flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMobileMenuToggle={() => setIsMobileSidebarOpen((open) => !open)}
        />

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
