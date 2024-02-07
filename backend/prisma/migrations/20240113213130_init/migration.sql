-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "description" TEXT NOT NULL,
    "payment_terms" INTEGER NOT NULL,
    "due_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "client_id" TEXT,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "senders" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL DEFAULT '19 Union Terrace',
    "city" TEXT NOT NULL DEFAULT 'London',
    "post_code" TEXT NOT NULL DEFAULT 'E1 3EZ',
    "country" TEXT NOT NULL DEFAULT 'United Kingdom',

    CONSTRAINT "senders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "post_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "item_quantity" INTEGER NOT NULL,
    "item_price" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GBP',
    "invoice_id" TEXT,
    "client_id" TEXT,
    "sender_id" TEXT,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "id_invoice_idx" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "senders_street_key" ON "senders"("street");

-- CreateIndex
CREATE INDEX "id_sender_idx" ON "senders"("post_code");

-- CreateIndex
CREATE INDEX "id_client_idx" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_name_email_street_city_post_code_country_key" ON "clients"("name", "email", "street", "city", "post_code", "country");

-- CreateIndex
CREATE INDEX "id_order_idx" ON "orders"("id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_item_name_item_quantity_item_price_invoice_id_key" ON "orders"("item_name", "item_quantity", "item_price", "invoice_id");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "senders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
