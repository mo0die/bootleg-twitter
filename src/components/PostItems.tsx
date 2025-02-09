"use client";
import Postcard from "@/components/blocks/PostCard";
import { api } from "@/trpc/react";

export default function Postitems() {
  const [userTweet] = api.tweets.getUserTweets.useSuspenseQuery() ?? [];
  return (
    <div className="grid grid-cols-1 gap-4">
      {userTweet?.map((post) => (
        <Postcard
          key={post?.id}
          username={post?.username ?? ""}
          content={post?.content}
          disableDelete={false}
          id={post?.id}
          createdAt={post?.createdAt.toLocaleDateString()}
        />
      ))}
    </div>
  );
}
