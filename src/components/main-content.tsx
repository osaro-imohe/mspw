"use client";

import { useSidenavCollapsed } from "~/components/sidenav";

export function MainContent({ children }: { children: React.ReactNode }) {
  const isCollapsed = useSidenavCollapsed();

  return (
    <div
      className={`transition-all duration-300 ${isCollapsed ? "lg:pl-16" : "lg:pl-64"}`}
    >
      {children}
    </div>
  );
}
