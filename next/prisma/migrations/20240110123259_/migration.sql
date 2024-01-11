-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "description" TEXT,
    "paymentTerms" INTEGER NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" INTEGER,
    "sentFromId" INTEGER,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "senders" (
    "id" SERIAL NOT NULL,
    "street" TEXT NOT NULL DEFAULT '19 Union Terrace',
    "city" TEXT NOT NULL DEFAULT 'London',
    "postcode" TEXT NOT NULL DEFAULT 'E1 3EZ',
    "country" TEXT NOT NULL DEFAULT 'United Kingdom',

    CONSTRAINT "senders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "senderId" INTEGER,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_quantity" INTEGER NOT NULL,
    "item_price" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "invoiceId" TEXT NOT NULL,
    "clientId" INTEGER,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- CreateIndex
CREATE INDEX "id_invoice_idx" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "senders_street_key" ON "senders"("street");

-- CreateIndex
CREATE INDEX "id_sender_idx" ON "senders"("postcode");

-- CreateIndex
CREATE INDEX "id_client_idx" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_name_email_street_city_postcode_country_key" ON "clients"("name", "email", "street", "city", "postcode", "country");

-- CreateIndex
CREATE INDEX "id_order_idx" ON "orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_item_name_item_quantity_item_price_currency_invoiceI_key" ON "orders"("item_name", "item_quantity", "item_price", "currency", "invoiceId");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clients" ADD CONSTRAINT "clients_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
