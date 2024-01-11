/*
  Warnings:

  - You are about to drop the column `clientId` on the `invoices` table. All the data in the column will be lost.
  - Added the required column `clientEmail` to the `invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_clientId_fkey";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "clientId",
ADD COLUMN     "clientEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_clientEmail_fkey" FOREIGN KEY ("clientEmail") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
