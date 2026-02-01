"use client";

import { useSidenavCollapsed } from "~/components/sidenav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isCollapsed = useSidenavCollapsed();

  return (
    <div className={isCollapsed ? "lg:-ml-16" : "lg:-ml-64"}>{children}</div>
  );
}
