"use client";

import { LatestPost } from "@/app/_components/post";
import { api } from "@/trpc/react";
import { authClient } from "@repo/auth/client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const session = authClient.useSession();
  const { data: hello } = api.post.hello.useQuery({ text: session.data?.user.name ?? "Welcome" });

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center bg-gray-50 text-gray-900 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 flex w-full items-center justify-between border-b border-gray-200 pb-4">
          <h1 className="text-3xl font-semibold">Post Management</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-colors"
          >
            Logout
          </button>
        </div>

        <p className="mb-6 text-gray-600">{hello?.greeting ?? "Loading..."}</p>
        <LatestPost />
      </div>
    </main>
  );
}
