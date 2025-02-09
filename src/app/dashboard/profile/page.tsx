import { CreatePostForm } from "@/components/CreatePostForm";
import Postitems from "@/components/PostItems";
import { SidebarInset } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/server/auth";
export default async function Profile() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }
  return (
    <SidebarInset className="mr-5 p-6">
      <div className="max-w flex h-[calc(100vh-3rem)] flex-col">
        <div className="flex-none">
          <CreatePostForm />
        </div>
        <div className="mt-6 flex-1 overflow-y-auto">
          <Postitems />
        </div>
      </div>
    </SidebarInset>
  );
}
