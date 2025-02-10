import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { AppSidebar } from "@/components/app-sidebar";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Artist bassem",
  description: "Created by Group54",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <main>
            <TRPCReactProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem={true}
              >
                <SidebarProvider className="bg-white dark:bg-black">
                  <AppSidebar />
                  <SidebarTrigger />
                  {children}
                </SidebarProvider>
              </ThemeProvider>
            </TRPCReactProvider>
          </main>
        </body>
      </html>
    </>
  );
}
