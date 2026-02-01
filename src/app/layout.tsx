import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { Providers } from "~/components/providers";
import { Sidenav } from "~/components/sidenav";
import { MainContent } from "~/components/main-content";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Make Something People Want",
  description: "Built with the T3 Stack",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <Providers>
          <Sidenav />
          <MainContent>{children}</MainContent>
        </Providers>
      </body>
    </html>
  );
}
