"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { UserMenu } from "~/components/ui/user-menu";

const SIDENAV_COLLAPSED_KEY = "sidenav-collapsed";

export function Sidenav() {
  const { data: session, status } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SIDENAV_COLLAPSED_KEY);
    if (stored !== null) {
      setIsCollapsed(stored === "true");
    }
    setIsHydrated(true);
  }, []);

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem(SIDENAV_COLLAPSED_KEY, String(newValue));
    // Dispatch custom event for other components to listen to
    window.dispatchEvent(
      new CustomEvent("sidenav-toggle", { detail: { isCollapsed: newValue } })
    );
  };

  // Don't render sidenav for unauthenticated users
  if (status === "loading" || !isHydrated) {
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
    <aside
      className={`fixed left-0 top-0 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Logo and collapse button (when expanded) */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
        <Link
          href="/"
          className={`flex items-center gap-2 ${isCollapsed ? "justify-center w-full" : ""}`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6 shrink-0"
          >
            <path d="M4 4l7.07 17 2.51-7.39L21 11.07 4 4z" />
          </svg>
          {!isCollapsed && (
            <span className="font-semibold text-gray-900">MSPW</span>
          )}
        </Link>
        {!isCollapsed && (
          <button
            onClick={toggleCollapsed}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Collapse sidebar"
            data-testid="sidenav-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <defs>
                <clipPath id="sidebar-clip-1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </clipPath>
              </defs>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <rect x="3" y="3" width="6" height="18" fill="currentColor" stroke="none" clipPath="url(#sidebar-clip-1)" />
            </svg>
          </button>
        )}
      </div>

      {/* Toggle button when collapsed - below header */}
      {isCollapsed && (
        <div className="flex justify-center px-2 py-2">
          <button
            onClick={toggleCollapsed}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100"
            aria-label="Expand sidebar"
            data-testid="sidenav-toggle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <defs>
                <clipPath id="sidebar-clip-2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </clipPath>
              </defs>
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M9 3v18" />
              <rect x="3" y="3" width="6" height="18" fill="currentColor" stroke="none" clipPath="url(#sidebar-clip-2)" />
            </svg>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <Link
          href="/"
          className={`flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 ${
            isCollapsed ? "justify-center" : "gap-3"
          }`}
          title={isCollapsed ? "Campaigns" : undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-5 w-5 shrink-0"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
              clipRule="evenodd"
            />
          </svg>
          {!isCollapsed && "Campaigns"}
        </Link>
      </nav>

      {/* User menu at bottom */}
      <div className="border-t border-gray-200 p-2">
        <div
          className={`flex items-center ${isCollapsed ? "justify-center" : "gap-3 px-2"}`}
        >
          <UserMenu
            user={{
              firstName:
                session.user.firstName ?? session.user.email?.charAt(0) ?? "U",
              lastName: session.user.lastName ?? "",
              email: session.user.email ?? "",
            }}
          />
          {!isCollapsed && (
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-gray-900">
                {session.user.firstName} {session.user.lastName}
              </p>
              <p className="truncate text-xs text-gray-500">
                {session.user.email}
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// Export a hook for other components to get the collapsed state
export function useSidenavCollapsed() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(SIDENAV_COLLAPSED_KEY);
    if (stored !== null) {
      setIsCollapsed(stored === "true");
    }

    const handleToggle = (e: CustomEvent<{ isCollapsed: boolean }>) => {
      setIsCollapsed(e.detail.isCollapsed);
    };

    window.addEventListener(
      "sidenav-toggle",
      handleToggle as EventListener
    );
    return () => {
      window.removeEventListener(
        "sidenav-toggle",
        handleToggle as EventListener
      );
    };
  }, []);

  return isCollapsed;
}
