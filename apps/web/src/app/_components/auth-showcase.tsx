import { auth, getSession } from "@repo/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function AuthShowcase() {
  const session = await getSession();
  if (!session) {
    return (
      <form>
        <button
          className="px-4 py-2 text-lg font-medium"
          formAction={async () => {
            "use server";
            const res = await auth.api.signInSocial({
              body: {
                provider: "google",
                callbackURL: "/",
              },
            });
            if (res.url) {
              redirect(res.url);
            }
          }}
          type="submit"
        >
          Sign in with Discord
        </button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl">
        <span>Logged in as {session.user.name}</span>
      </p>

      <form>
        <button
          className="px-4 py-2 text-lg font-medium"
          formAction={async () => {
            "use server";
            await auth.api.signOut({
              headers: await headers(),
            });
            throw redirect("/");
          }}
          type="submit"
        >
          Sign out
        </button>
      </form>
    </div>
  );
}
