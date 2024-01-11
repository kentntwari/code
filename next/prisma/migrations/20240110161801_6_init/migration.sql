/*
  Warnings:

  - You are about to drop the column `postcode` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `postcode` on the `senders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,email,street,city,post_code,country]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `post_code` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "clients_name_email_street_city_postcode_country_key";

-- DropIndex
DROP INDEX "id_sender_idx";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "postcode",
ADD COLUMN     "post_code" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "senders" DROP COLUMN "postcode",
ADD COLUMN     "post_code" TEXT NOT NULL DEFAULT 'E1 3EZ';

-- CreateIndex
CREATE UNIQUE INDEX "clients_name_email_street_city_post_code_country_key" ON "clients"("name", "email", "street", "city", "post_code", "country");

-- CreateIndex
CREATE INDEX "id_sender_idx" ON "senders"("post_code");
