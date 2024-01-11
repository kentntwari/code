/*
  Warnings:

  - You are about to drop the column `sentFromId` on the `invoices` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceId]` on the table `orders` will be added. If there are existing duplicate values, this will fail.
  - Made the column `clientId` on table `invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `clientId` on table `orders` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_clientId_fkey";

-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_sentFromId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_clientId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_invoiceId_fkey";

-- DropIndex
DROP INDEX "orders_item_name_item_quantity_item_price_currency_invoiceI_key";

-- AlterTable
ALTER TABLE "invoices" DROP COLUMN "sentFromId",
ALTER COLUMN "clientId" SET NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "senderId" TEXT,
ALTER COLUMN "invoiceId" DROP NOT NULL,
ALTER COLUMN "clientId" SET NOT NULL;

-- CreateTable
CREATE TABLE "_InvoiceToSender" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InvoiceToSender_AB_unique" ON "_InvoiceToSender"("A", "B");

-- CreateIndex
CREATE INDEX "_InvoiceToSender_B_index" ON "_InvoiceToSender"("B");

-- CreateIndex
CREATE UNIQUE INDEX "orders_invoiceId_key" ON "orders"("invoiceId");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToSender" ADD CONSTRAINT "_InvoiceToSender_A_fkey" FOREIGN KEY ("A") REFERENCES "invoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InvoiceToSender" ADD CONSTRAINT "_InvoiceToSender_B_fkey" FOREIGN KEY ("B") REFERENCES "senders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
