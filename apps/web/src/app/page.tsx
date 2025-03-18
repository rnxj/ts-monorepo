"use client";

import { LatestPost } from "@/app/_components/post";
import { api } from "@/trpc/react";
import { authClient } from "@repo/auth/client";
import { Button } from "@repo/ui/components/button";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const session = authClient.useSession();
  const {
    data: hello,
    isLoading,
    isError,
    error,
  } = api.post.hello.useQuery({
    text: session.data?.user.name ?? "Welcome",
  });

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : isError ? (
            <p className="text-card-foreground">Failed to fetch hello: {error.message}</p>
          ) : hello ? (
            <CardTitle>{hello.greeting}</CardTitle>
          ) : (
            <CardTitle>No data found</CardTitle>
          )}
          <CardAction>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="mr-2" />
              Logout
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="space-y-6">
          <LatestPost />
        </CardContent>
      </Card>
    </main>
  );
}
