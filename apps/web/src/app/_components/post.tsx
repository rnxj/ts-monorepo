"use client";

import { api } from "@/trpc/react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { Loader2 } from "lucide-react";
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
    <div className="w-full space-y-4">
      {latestPost ? (
        <Card>
          <CardContent>
            <p className="text-card-foreground">
              Your most recent post: <span className="font-bold">{latestPost.title}</span>
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <p className="text-card-foreground">You have no posts yet.</p>
          </CardContent>
        </Card>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost.mutate({ title, content });
        }}
        className="flex flex-col gap-4"
      >
        <Input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
        />
        <Button type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Processing...
            </>
          ) : (
            "Create Post"
          )}
        </Button>
      </form>
    </div>
  );
}
