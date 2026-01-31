import Link from "next/link";

interface AuthFormWrapperProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  linkText: string;
  linkHref: string;
}

export function AuthFormWrapper({
  children,
  title,
  subtitle,
  linkText,
  linkHref,
}: AuthFormWrapperProps) {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-white p-8 shadow-sm">
          <div className="flex flex-col items-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-8 w-8 text-indigo-600"
            >
              <path d="M4 4l7.07 17 2.51-7.39L21 11.07 4 4z" />
            </svg>
            <h1 className="mt-6 text-center text-2xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              {subtitle}{" "}
              <Link
                href={linkHref}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                {linkText}
              </Link>
            </p>
          </div>

          {children}
        </div>

        <p className="mt-8 text-center text-xs text-gray-500">
          <Link href="/terms" className="hover:text-gray-700">
            Terms of Use
          </Link>
          <span className="mx-2">·</span>
          <Link href="/privacy" className="hover:text-gray-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
