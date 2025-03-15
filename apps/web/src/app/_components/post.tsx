"use client";

import { api } from "@/trpc/react";
import { useState } from "react";

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
    <div className="w-full">
      {latestPost ? (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <p className="text-gray-700">Your most recent post: {latestPost.title}</p>
        </div>
      ) : (
        <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
          <p className="text-gray-700">You have no posts yet.</p>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ title, content });
        }}
        className="flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none transition-shadow"
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20 focus:outline-none transition-shadow"
          rows={4}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
          disabled={createPost.isPending}
        >
          {createPost.isPending ? (
            <span className="inline-flex items-center">
              <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24" aria-label="Loading">
                <title>Loading...</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing...
            </span>
          ) : (
            "Create Post"
          )}
        </button>
      </form>
    </div>
  );
}
