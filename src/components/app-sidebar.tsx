import { Home, Settings } from "lucide-react";
import { auth } from "@/server/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { api } from "@/trpc/server";
import { Button } from "./ui/button";
import ModeToggle from "./MoodPicker";
const LoggedInItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: Settings,
  },
];

const LoggedOutItems = [
  {
    title: "Thoughts",
    url: "/",
    icon: Home,
  },
];

export async function AppSidebar() {
  const session = await auth();

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  // Determine which menu items to use based on session status
  const menuItems = session?.user ? LoggedInItems : LoggedOutItems;

  return (
    <Sidebar className="outline dark:outline-none">
      <SidebarContent className="dark:bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold uppercase text-black dark:text-white">
            BASSEM THOUGHTS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {menuItems.map((item) => (
                <SidebarMenuItem
                  className="mt-2 outline dark:outline-none"
                  key={item.title}
                >
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {session?.user && (
        <SidebarFooter className="dark:bg-black">
          <SidebarMenu>
            <SidebarMenuItem className="outline dark:outline-none">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="font-bold uppercase text-black"
                >
                  <SidebarMenuButton>
                    <span className="dark:text-white dark:outline-none">
                      Account
                    </span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Button className="w-full dark:bg-black dark:text-white">
                      <Link href="/api/auth/signout">Sign out</Link>
                    </Button>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <ModeToggle />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
