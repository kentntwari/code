-- DropForeignKey
ALTER TABLE "invoices" DROP CONSTRAINT "invoices_client_email_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_client_email_fkey";

-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "client_email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "client_email" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_client_email_fkey" FOREIGN KEY ("client_email") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_email_fkey" FOREIGN KEY ("client_email") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
