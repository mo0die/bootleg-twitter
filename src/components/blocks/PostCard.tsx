import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { api } from "@/trpc/react";
interface PostcardProps {
  username: string;
  content: string;
  id: string;
  disableDelete?: boolean;
  createdAt: string;
}

export default function Postcard({
  username,
  content,
  disableDelete,
  id,
  createdAt,
}: PostcardProps) {
  const utils = api.useUtils();
  const deleteTweet = api.tweets.delete.useMutation({
    onSuccess: async () => {
      await utils.tweets.getAllTweets.invalidate().catch(console.error);
      await utils.tweets.getUserTweets.invalidate().catch(console.error);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleDeleteTweet = (id: string) => {
    deleteTweet.mutate({ id });
  };
  return (
    <Card className="w-full rounded-none border-2 border-black dark:bg-black dark:outline-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{username}</CardTitle>
        <p className="text-sm text-muted-foreground">{createdAt}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <p>{content}</p>
        {disableDelete == false && (
          <div className="mt-auto flex justify-end text-left">
            <Button
              className="dark:bg-black dark:text-left dark:text-white"
              onClick={() => handleDeleteTweet(id)}
            >
              Delete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
