"use client";
import Postcard from "@/components/blocks/PostCard";
import { api } from "@/trpc/react";

export default function AllPosts() {
  const [allTweets] = api.tweets.getAllTweets.useSuspenseQuery();

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {allTweets?.map((post) => (
          <Postcard
            key={post?.id}
            username={post?.username ?? ""}
            content={post?.content}
            disableDelete={true}
            id={post?.id}
            createdAt={post?.createdAt.toLocaleDateString()}
          />
        ))}
      </div>
    </div>
  );
}
