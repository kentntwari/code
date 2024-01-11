/*
  Warnings:

  - Made the column `client_email` on table `invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_client_email_fkey";

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "client_email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_client_email_fkey" FOREIGN KEY ("client_email") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
