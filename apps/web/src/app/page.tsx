import { LatestPost } from "@/app/_components/post";
import { HydrateClient, api } from "@/trpc/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "Welcome" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white text-black">
        <div className="container flex flex-col items-center justify-center gap-6 px-4 py-8">
          <h1 className="text-3xl font-bold">Post Management</h1>

          <p>{hello ? hello.greeting : "Loading..."}</p>

          <LatestPost />
        </div>
      </main>
    </HydrateClient>
  );
}
