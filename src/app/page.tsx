import AllPosts from "@/components/AllPosts";
import { SidebarInset } from "@/components/ui/sidebar";
import { HydrateClient } from "@/trpc/server";

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
