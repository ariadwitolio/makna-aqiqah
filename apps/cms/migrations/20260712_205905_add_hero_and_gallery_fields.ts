import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_home_page_gallery_images_size" AS ENUM('normal', 'wide', 'tall', 'large');
  CREATE TABLE "home_page_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar,
  	"size" "enum_home_page_gallery_images_size" DEFAULT 'normal' NOT NULL
  );
  
  ALTER TABLE "home_page" ADD COLUMN "hero_image_id" integer;
  ALTER TABLE "home_page" ADD COLUMN "gallery_eyebrow" varchar DEFAULT 'Galeri' NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "gallery_title" varchar DEFAULT 'Momen berkesan yang telah kami abadikan' NOT NULL;
  ALTER TABLE "home_page" ADD COLUMN "gallery_description" varchar DEFAULT 'Sekilas dokumentasi perayaan aqiqah bersama keluarga yang telah mempercayakan momen istimewanya kepada kami.' NOT NULL;
  ALTER TABLE "home_page_gallery_images" ADD CONSTRAINT "home_page_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "home_page_gallery_images" ADD CONSTRAINT "home_page_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."home_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "home_page_gallery_images_order_idx" ON "home_page_gallery_images" USING btree ("_order");
  CREATE INDEX "home_page_gallery_images_parent_id_idx" ON "home_page_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "home_page_gallery_images_image_idx" ON "home_page_gallery_images" USING btree ("image_id");
  ALTER TABLE "home_page" ADD CONSTRAINT "home_page_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "home_page_hero_image_idx" ON "home_page" USING btree ("hero_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "home_page_gallery_images" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "home_page_gallery_images" CASCADE;
  ALTER TABLE "home_page" DROP CONSTRAINT "home_page_hero_image_id_media_id_fk";
  
  DROP INDEX "home_page_hero_image_idx";
  ALTER TABLE "home_page" DROP COLUMN "hero_image_id";
  ALTER TABLE "home_page" DROP COLUMN "gallery_eyebrow";
  ALTER TABLE "home_page" DROP COLUMN "gallery_title";
  ALTER TABLE "home_page" DROP COLUMN "gallery_description";
  DROP TYPE "public"."enum_home_page_gallery_images_size";`)
}
