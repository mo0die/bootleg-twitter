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
    <Sidebar className="outline">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl font-bold uppercase text-black">
            BASSEM THOUGHTS
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {menuItems.map((item) => (
                <SidebarMenuItem className="mt-2 outline" key={item.title}>
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
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem className="outline">
              <DropdownMenu>
                <DropdownMenuTrigger
                  asChild
                  className="font-bold uppercase text-black"
                >
                  <SidebarMenuButton>
                    <span>Account</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Button className="w-full">
                      <Link href="/api/auth/signout">Sign out</Link>
                    </Button>
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
