"use client";

import { useState } from "react";

import { api } from "@/trpc/react";

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const utils = api.useUtils();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
      setTitle("");
      setContent("");
    },
  });

  return (
    <div className="w-full max-w-md">
      {latestPost ? (
        <p>Your most recent post: {latestPost.title}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ title, content });
        }}
        className="mt-4 flex flex-col gap-3"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2"
          rows={4}
        />
        <button
          type="submit"
          className="border bg-gray-100 p-2 hover:bg-gray-200"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
