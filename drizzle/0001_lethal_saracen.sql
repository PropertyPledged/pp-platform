ALTER TABLE "pp_verification" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "pp_account" ADD COLUMN "password" text;--> statement-breakpoint
ALTER TABLE "pp_account" DROP COLUMN "provider_account_id";