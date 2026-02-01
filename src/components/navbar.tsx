"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "~/components/ui/button";
import { UserMenu } from "~/components/ui/user-menu";

export function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
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

          <div className="flex items-center gap-4">
            {status === "loading" ? (
              <div className="h-9 w-9 animate-pulse rounded-full bg-gray-200" />
            ) : session?.user ? (
              <UserMenu
                user={{
                  firstName: session.user.firstName ?? session.user.email?.charAt(0) ?? "U",
                  lastName: session.user.lastName ?? "",
                  email: session.user.email ?? "",
                }}
              />
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign in
                </Link>
                <Link href="/signup">
                  <Button className="w-auto">Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
