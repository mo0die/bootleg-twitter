ALTER TABLE "bootleg-twitter_tweet" ADD COLUMN "username" varchar;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bootleg-twitter_tweet" ADD CONSTRAINT "bootleg-twitter_tweet_username_bootleg-twitter_user_name_fk" FOREIGN KEY ("username") REFERENCES "public"."bootleg-twitter_user"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
