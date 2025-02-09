import { auth } from "@/server/auth";
import { api, HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import AllPosts from "@/components/AllPosts";
import { SidebarInset } from "@/components/ui/sidebar";
import { CreatePostForm } from "@/components/CreatePostForm";

export default async function Dashboard() {
  return (
    <HydrateClient>
      <SidebarInset className="mr-5 p-6">
        <div className="max-w flex h-[calc(100vh-3rem)] flex-col">
          <div className="mt-6 flex-1 overflow-y-auto">
            <AllPosts />
          </div>
        </div>
      </SidebarInset>
    </HydrateClient>
  );
}
