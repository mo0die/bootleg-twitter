"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "@/trpc/react";

const formSchema = z.object({
  content: z.string().min(1, "Content is required"),
});

type FormData = z.infer<typeof formSchema>;

export function CreatePostForm() {
  const utils = api.useUtils();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const createTweet = api.tweets.create.useMutation({
    onSuccess: () => {
      form.reset();
      utils.tweets.getUserTweets.invalidate().catch(console.error);
      utils.tweets.getAllTweets.invalidate().catch(console.error);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  function onSubmit(values: FormData) {
    console.log(values);
    createTweet.mutate({
      content: values.content,
    });
  }

  return (
    <Card className="w-full rounded-none border-2 border-black">
      <CardHeader>
        <CardTitle>Create New Post</CardTitle>
        <CardDescription>Fill in the details for your new post</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CardContent>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your post content here"
                      {...field}
                      className="rounded-none border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" className="rounded-none border border-black">
              Create Post
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
