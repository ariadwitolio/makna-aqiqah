import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_highlights_icon" AS ENUM('sparkles', 'shield', 'heart', 'calendar', 'check', 'file', 'zap', 'headset');
  CREATE TYPE "public"."enum_home_page_order_flow_steps_icon" AS ENUM('sparkles', 'shield', 'heart', 'calendar', 'check', 'file', 'zap', 'headset');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"photo_id" integer NOT NULL,
  	"quote" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"testimonials_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"site_name" varchar DEFAULT 'Makna Aqiqah' NOT NULL,
  	"tagline" varchar DEFAULT 'Rayakan dengan Bermakna' NOT NULL,
  	"nav_cta_label" varchar DEFAULT 'Hubungi' NOT NULL,
  	"nav_cta_href" varchar DEFAULT '#contact' NOT NULL,
  	"company_name" varchar DEFAULT 'Makna Aqiqah' NOT NULL,
  	"whatsapp" varchar,
  	"instagram" varchar,
  	"facebook" varchar,
  	"tiktok" varchar,
  	"address" varchar,
  	"operational_hours" varchar DEFAULT 'Setiap hari, 08.00 - 20.00',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "home_page_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"icon" "enum_home_page_highlights_icon" DEFAULT 'sparkles' NOT NULL
  );
  
  CREATE TABLE "home_page_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_packages" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_page_order_flow_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_home_page_order_flow_steps_icon" DEFAULT 'sparkles' NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL
  );
  
  CREATE TABLE "home_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"badge_label" varchar DEFAULT 'Pengalaman aqiqah yang bermakna sejak 2019' NOT NULL,
  	"hero_title" varchar DEFAULT 'Aqiqah yang hangat, bermakna, dan penuh berkah untuk keluarga Anda.' NOT NULL,
  	"hero_subtitle" varchar DEFAULT 'Makna Aqiqah menghadirkan menu premium, presentasi elegan, dan layanan terpercaya untuk merayakan momen istimewa dengan sempurna.' NOT NULL,
  	"hero_cta_label" varchar DEFAULT 'Konsultasi Gratis' NOT NULL,
  	"hero_secondary_cta_label" varchar DEFAULT 'Lihat Paket' NOT NULL,
  	"highlight_title" varchar DEFAULT 'Mengapa Memilih Kami' NOT NULL,
  	"highlight_description" varchar DEFAULT 'Komitmen kami untuk keluarga Anda' NOT NULL,
  	"services_eyebrow" varchar DEFAULT 'Layanan Kami' NOT NULL,
  	"services_title" varchar DEFAULT 'Pengalaman lengkap dari perencanaan hingga penyajian.' NOT NULL,
  	"services_description" varchar DEFAULT 'Setiap detail dirancang dengan hati untuk memberikan kemudahan, kehangatan, dan kualitas premium.' NOT NULL,
  	"services_secondary_description" varchar DEFAULT 'Setiap detail dirancang dengan cermat untuk memberikan pengalaman terbaik bagi keluarga Anda.' NOT NULL,
  	"packages_eyebrow" varchar DEFAULT 'Paket Aqiqah' NOT NULL,
  	"packages_title" varchar DEFAULT 'Pilihan paket fleksibel untuk setiap momen keluarga.' NOT NULL,
  	"packages_description" varchar DEFAULT 'Pilih paket yang sesuai dengan gaya perayaan dan kenyamanan Anda, atau customisasi sesuai kebutuhan.' NOT NULL,
  	"packages_contact_text" varchar DEFAULT 'Tidak menemukan paket yang cocok?' NOT NULL,
  	"packages_contact_cta_label" varchar DEFAULT 'Hubungi kami untuk konsultasi gratis' NOT NULL,
  	"packages_contact_cta_href" varchar DEFAULT '#contact' NOT NULL,
  	"order_flow_eyebrow" varchar DEFAULT 'Cara Kerja' NOT NULL,
  	"order_flow_title" varchar DEFAULT 'Proses mudah dalam 4 langkah' NOT NULL,
  	"order_flow_description" varchar DEFAULT 'Dari konsultasi hingga hari perayaan, kami dampingi setiap langkahnya.' NOT NULL,
  	"info_eyebrow" varchar DEFAULT 'Tentang Kami' NOT NULL,
  	"info_title" varchar DEFAULT 'Melayani dengan hati sejak 2019' NOT NULL,
  	"info_description" varchar DEFAULT 'Makna Aqiqah hadir untuk membantu keluarga merayakan momen aqiqah dengan penuh kehangatan, kemudahan, dan kualitas premium di setiap detail.' NOT NULL,
  	"testimonials_eyebrow" varchar DEFAULT 'Testimoni' NOT NULL,
  	"testimonials_title" varchar DEFAULT 'Apa kata keluarga yang telah merayakan bersama kami' NOT NULL,
  	"testimonials_description" varchar DEFAULT 'Kepercayaan dari ratusan keluarga adalah kebahagiaan terbesar kami.' NOT NULL,
  	"cta_title" varchar DEFAULT 'Siap rayakan momen istimewa?' NOT NULL,
  	"cta_description" varchar DEFAULT 'Hubungi kami hari ini untuk konsultasi gratis dan dapatkan penawaran eksklusif.' NOT NULL,
  	"cta_button_label" varchar DEFAULT 'Konsultasi Gratis Sekarang' NOT NULL,
  	"cta_button_href" varchar DEFAULT '#contact' NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "testimonials" ADD CONSTRAINT "testimonials_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_nav_items" ADD CONSTRAINT "site_settings_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_highlights" ADD CONSTRAINT "home_page_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_services" ADD CONSTRAINT "home_page_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_packages" ADD CONSTRAINT "home_page_packages_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "home_page_order_flow_steps" ADD CONSTRAINT "home_page_order_flow_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "testimonials_photo_idx" ON "testimonials" USING btree ("photo_id");
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_nav_items_order_idx" ON "site_settings_nav_items" USING btree ("_order");
  CREATE INDEX "site_settings_nav_items_parent_id_idx" ON "site_settings_nav_items" USING btree ("_parent_id");
  CREATE INDEX "site_settings_logo_idx" ON "site_settings" USING btree ("logo_id");
  CREATE INDEX "home_page_highlights_order_idx" ON "home_page_highlights" USING btree ("_order");
  CREATE INDEX "home_page_highlights_parent_id_idx" ON "home_page_highlights" USING btree ("_parent_id");
  CREATE INDEX "home_page_services_order_idx" ON "home_page_services" USING btree ("_order");
  CREATE INDEX "home_page_services_parent_id_idx" ON "home_page_services" USING btree ("_parent_id");
  CREATE INDEX "home_page_packages_order_idx" ON "home_page_packages" USING btree ("_order");
  CREATE INDEX "home_page_packages_parent_id_idx" ON "home_page_packages" USING btree ("_parent_id");
  CREATE INDEX "home_page_order_flow_steps_order_idx" ON "home_page_order_flow_steps" USING btree ("_order");
  CREATE INDEX "home_page_order_flow_steps_parent_id_idx" ON "home_page_order_flow_steps" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "testimonials" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_nav_items" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TABLE "home_page_highlights" CASCADE;
  DROP TABLE "home_page_services" CASCADE;
  DROP TABLE "home_page_packages" CASCADE;
  DROP TABLE "home_page_order_flow_steps" CASCADE;
  DROP TABLE "home_page" CASCADE;
  DROP TYPE "public"."enum_home_page_highlights_icon";
  DROP TYPE "public"."enum_home_page_order_flow_steps_icon";`)
}
