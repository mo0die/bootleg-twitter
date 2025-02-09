import {z } from "zod";


import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";

import {  desc, eq,and } from "drizzle-orm";

import {tweets} from "@/server/db/schema";


export const tweetRouter = createTRPCRouter({
    create: protectedProcedure
        .input(z.object({
            content: z.string().min(1),
        }))
        .mutation(async ({ctx, input}) => {
            await ctx.db.insert(tweets).values({
                content: input.content,
                userId: ctx.session.user.id,
                username: ctx.session.user.name,
            })
        }),
    
        getAllTweets: publicProcedure.query(async ({ ctx }) => {
            try{
                return await ctx.db.select(
                  {
                        id: tweets.id,
                        text: tweets.text,
                        description: tweets.description,
                        content: tweets.content,
                        footer: tweets.footer,
                        createdAt: tweets.createdAt,
                        updatedAt: tweets.updatedAt,
                        userId: tweets.userId,
                        username: tweets.username
                    }).from(tweets).orderBy(desc(tweets.createdAt))
                
            } catch (error) {

                console.error(error);
            }
        }),

    getUserTweets: protectedProcedure.query(async ({ctx}) => {
        try{
            return await ctx.db.select(
              {
                    id: tweets.id,
                    text: tweets.text,
                    description: tweets.description,
                    content: tweets.content,
                    footer: tweets.footer,
                    createdAt: tweets.createdAt,
                    updatedAt: tweets.updatedAt,
                    userId: tweets.userId,
                    username: tweets.username
                }).from(tweets).where(eq(tweets.userId, ctx.session.user.id))
                .orderBy(desc(tweets.createdAt))
            
        } catch (error) {
            console.error(error);
        }
    }),
    delete: protectedProcedure
    .input(z.object({
        id: z.string(),
    }))
    .mutation(async ({ctx, input}) => {
        await ctx.db.delete(tweets).where(and(eq(tweets.id, input.id),eq(tweets.userId, ctx.session.user.id)))
    })
})