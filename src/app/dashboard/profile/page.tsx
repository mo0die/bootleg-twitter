import { CreatePostForm } from "@/components/CreatePostForm";
import Postitems from "@/components/PostItems";
import { SidebarInset } from "@/components/ui/sidebar";
export default function Profile() {
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
