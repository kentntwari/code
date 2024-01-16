import { extendedPrisma } from "../lib/prismaClient.js";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

async function main() {
  //Invoice 1
  const invoice1 = await extendedPrisma.$transaction(async (tx) => {
    const client = await tx.client.upsert({
      where: {
        client_specs: {
          name: "Alysa Werner",
          email: "alysa@email.co.uk",
          street: "63 Warwick Road",
          city: "Carlisle",
          postCode: "CA20 2TG",
          country: "United Kingdom",
        },
      },
      update: {},
      create: {
        name: "Alysa Werner",
        email: "alysa@email.co.uk",
        street: "63 Warwick Road",
        city: "Carlisle",
        postCode: "CA20 2TG",
        country: "United Kingdom",
      },
    });

    const availableSenders = await tx.sender.findFirst();

    const invoice = await tx.invoice.create({
      data: {
        id: "RT2080",
        status: "pending",
        description: "Logo Concept",
        paymentTerms: 1,
        dueDate: new Date("2021-10-12"),
        createdAt: new Date("2021-10-11"),
        client: {
          connect: {
            id: client.id,
          },
        },
        orders: {
          createMany: {
            data: [
              {
                item: "Logo Sketches",
                quantity: 1,
                price: 102.04,
                clientId: client.id,
                senderId: availableSenders.id,
              },
            ],
          },
        },
      },
    });

    const curateOrdersByInvoice = await tx.order.findMany({
      where: {
        invoiceId: invoice.id,
      },
    });

    return await tx.client.update({
      where: {
        id: client.id,
      },
      data: {
        orders: {
          connect: curateOrdersByInvoice.map((order) => ({
            id: order.id,
          })),
        },
      },
    });
  });

  //Invoice 2
  const invoice2 = await extendedPrisma.$transaction(async (tx) => {
    const client = await tx.client.upsert({
      where: {
        client_specs: {
          name: "Mellisa Clarke",
          email: "mellisa.clarke@example.com",
          street: "46 Abbey Row",
          city: "Cambridge",
          postCode: "CB5 6EG",
          country: "United Kingdom",
        },
      },
      update: {},
      create: {
        name: "Mellisa Clarke",
        email: "mellisa.clarke@example.com",
        street: "46 Abbey Row",
        city: "Cambridge",
        postCode: "CB5 6EG",
        country: "United Kingdom",
      },
    });

    const availableSenders = await tx.sender.findFirst();

    const invoice = await tx.invoice.create({
      data: {
        id: "AA1449",
        status: "paid",
        description: "Logo Concept",
        paymentTerms: 1,
        dueDate: new Date("2021-10-14"),
        createdAt: new Date("2021-10-7"),
        client: {
          connect: {
            id: client.id,
          },
        },
        orders: {
          createMany: {
            data: [
              {
                item: "New Logo",
                quantity: 1,
                price: 1532.33,
                clientId: client.id,
                senderId: availableSenders.id,
              },
              {
                item: "Brand Guidelines",
                quantity: 1,
                price: 2500.0,
                clientId: client.id,
                senderId: availableSenders.id,
              },
            ],
          },
        },
      },
    });

    const curateOrdersByInvoice = await tx.order.findMany({
      where: {
        invoiceId: invoice.id,
      },
    });

    return await tx.client.update({
      where: {
        id: client.id,
      },
      data: {
        orders: {
          connect: curateOrdersByInvoice.map((order) => ({
            id: order.id,
          })),
        },
      },
    });
  });

  console.log(invoice1, invoice2);
}

main()
  .then(async () => {
    await extendedPrisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await extendedPrisma.$disconnect();
    process.exit(1);
  });
