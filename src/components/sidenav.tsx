"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserMenu } from "~/components/ui/user-menu";

export function Sidenav() {
  const { data: session, status } = useSession();

  // Don't render sidenav for unauthenticated users
  if (status === "loading") {
    return (
      <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
          <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
        </div>
      </aside>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-gray-200 bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-6">
        <Link href="/" className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
          >
            <path d="M4 4l7.07 17 2.51-7.39L21 11.07 4 4z" />
          </svg>
          <span className="font-semibold text-gray-900">MSPW</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
          Campaigns
        </Link>
      </nav>

      {/* User menu at bottom */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center gap-3">
          <UserMenu
            user={{
              firstName: session.user.firstName ?? session.user.email?.charAt(0) ?? "U",
              lastName: session.user.lastName ?? "",
              email: session.user.email ?? "",
            }}
          />
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-gray-900">
              {session.user.firstName} {session.user.lastName}
            </p>
            <p className="truncate text-xs text-gray-500">{session.user.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
