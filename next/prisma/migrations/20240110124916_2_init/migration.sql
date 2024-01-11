-- AlterTable
ALTER TABLE "invoices" ALTER COLUMN "sentFromId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_sentFromId_fkey" FOREIGN KEY ("sentFromId") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
