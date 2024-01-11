/*
  Warnings:

  - You are about to drop the column `senderId` on the `clients` table. All the data in the column will be lost.
  - You are about to drop the column `clientEmail` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `paymentTerms` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `invoices` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `orders` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoice_id]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client_email` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `due_date` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_terms` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `client_email` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "clients" DROP CONSTRAINT "clients_senderId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_clientEmail_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_clientId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_invoiceId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_senderId_fkey";

-- DropIndex
DROP INDEX "orders_invoiceId_key";

-- AlterTable
ALTER TABLE "clients" DROP COLUMN "senderId",
ADD COLUMN     "sender_id" TEXT;

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "clientEmail",
DROP COLUMN "createdAt",
DROP COLUMN "dueDate",
DROP COLUMN "paymentTerms",
DROP COLUMN "updatedAt",
ADD COLUMN     "client_email" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "due_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payment_terms" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "clientId",
DROP COLUMN "invoiceId",
DROP COLUMN "senderId",
ADD COLUMN     "client_email" TEXT NOT NULL,
ADD COLUMN     "invoice_id" TEXT,
ADD COLUMN     "sender_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "orders_invoice_id_key" ON "orders"("invoice_id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_client_email_fkey" FOREIGN KEY ("client_email") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_email_fkey" FOREIGN KEY ("client_email") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
