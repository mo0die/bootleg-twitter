import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { api } from "@/trpc/server";
import { auth } from "@/server/auth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-white p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="rounded-none border border-black bg-white text-center">
          <CardHeader className="font-black text-black">LOGIN</CardHeader>
          <CardContent className="justify-center">
            <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
              <button className="w-full rounded-none border border-black bg-black p-2 text-white transition duration-200 hover:bg-white hover:text-black hover:outline">
                {session ? "Sign out" : "Sign in with Discord"}
              </button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
