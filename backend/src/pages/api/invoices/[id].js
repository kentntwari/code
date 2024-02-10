import { withCors } from "../../../../lib/withCors";
import { prisma, extendedPrisma } from "../../../../lib/prismaClient";

async function handler(req, res) {
  const invoice = await extendedPrisma.invoice.findFirst({
    where: {
      id: {
        equals: req.query.id,
        mode: "insensitive",
      },
    },
    include: { client: true, orders: true },
  });

  switch (req.method) {
    case "GET": {
      try {
        const condensed = await extendedPrisma.$transaction(async (tx) => {
          const arrayOfSenderId = invoice.orders.map((order) => order.senderId);

          const senders = await tx.sender.findMany({
            where: {
              id: {
                in: arrayOfSenderId,
              },
            },
          });

          return {
            ...invoice,
            senders,
          };
        });

        res.status(200).json(condensed);
        extendedPrisma.$disconnect();
        return;
      } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        extendedPrisma.$disconnect();
        return;
      }
    }

    case "POST": {
      try {
        await prisma.$transaction(async (tx) => {
          const client = await tx.client.upsert({
            where: {
              client_specs: {
                name: req.body.client.name,
                email: req.body.client.email,
                street: req.body.client.street,
                city: req.body.client.city,
                postCode: req.body.client.postCode,
                country: req.body.client.country,
              },
            },
            update: {},
            create: {
              name: req.body.client.name,
              email: req.body.client.email,
              street: req.body.client.street,
              city: req.body.client.city,
              postCode: req.body.client.postCode,
              country: req.body.client.country,
            },
          });

          const sender = await tx.sender.upsert({
            where: {
              street: req.body.sender.street,
              city: req.body.sender.city,
              postCode: req.body.sender.postCode,
              country: req.body.sender.country,
            },
            update: {},
            create: {
              street: req.body.sender.street,
              city: req.body.sender.city,
              postCode: req.body.sender.postCode,
              country: req.body.sender.country,
            },
          });

          const invoice = await tx.invoice.create({
            data: {
              id: req.body.invoice.id.toUpperCase(),
              status: "pending",
              description: req.body.invoice.description,
              paymentTerms: !req.body.invoice.paymentTerms
                ? 1
                : req.body.invoice.paymentTerms,
              dueDate: new Date(req.body.invoice.dueDate),
              client: {
                connect: {
                  id: client.id,
                },
              },
            },
          });

          return await Promise.all(
            req.body.orders.map(async (order) => {
              await tx.order.create({
                data: {
                  item: order.item,
                  quantity: order.quantity,
                  price: order.price,
                  invoiceId: invoice.id,
                  clientId: client.id,
                  senderId: sender.id,
                },
              });
            })
          );
        });

        res.status(201).json({ message: "Invoice created" });
        extendedPrisma.$disconnect();
        return;
      } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
        extendedPrisma.$disconnect();
        return;
      }
    }

    case "PUT": {
      try {
        await prisma.$transaction(async (tx) => {
          const client = await tx.client.update({
            where: {
              id: invoice.clientId,
            },
            data: {
              name: req.body.client.name,
              email: req.body.client.email,
              street: req.body.client.street,
              city: req.body.client.city,
              postCode: req.body.client.postCode,
              country: req.body.client.country,
            },
          });

          const sender = await tx.sender.upsert({
            where: {
              street: req.body.sender.street,
              city: req.body.sender.city,
              postCode: req.body.sender.postCode,
              country: req.body.sender.country,
            },
            update: {},
            create: {
              street: req.body.sender.street,
              city: req.body.sender.city,
              postCode: req.body.sender.postCode,
              country: req.body.sender.country,
            },
          });

          const existingOrders = await tx.order.findMany({
            where: {
              invoiceId: invoice.id,
            },
          });

          const requestBodyOrdersMap = new Map(
            req.body.orders.map((order) => [order.id, order])
          );

          const deletedOrders = existingOrders.filter(
            (order) => !requestBodyOrdersMap.has(order.id)
          );

          return await tx.invoice.update({
            where: {
              id: invoice.id,
            },
            data: {
              status: req.body.invoice.status,
              description: req.body.invoice.description,
              paymentTerms: req.body.invoice.paymentTerms,
              orders: {
                upsert: req.body.orders.map((order) => ({
                  where: {
                    id: order.id,
                  },
                  update: {
                    item: order.item,
                    quantity: order.quantity,
                    price: order.price,
                    senderId: sender.id,
                  },
                  create: {
                    item: order.item,
                    quantity: order.quantity,
                    price: order.price,
                    clientId: client.id,
                    senderId: sender.id,
                  },
                })),
                deleteMany: deletedOrders.map((order) => ({
                  id: order.id,
                })),
              },
            },
          });
        });

        res.status(204).end();
        prisma.$disconnect();
        return;
      } catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
        prisma.$disconnect();
        return;
      }
    }

    case "PATCH": {
      const incomingHeaders = new Headers(req.headers);

      if (incomingHeaders.get("X-patch-request-action") !== "mark-as-paid") {
        res.status(400).json({ message: "Invalid request actiondcdscsdcdsc" });
        return;
      }

      try {
        await prisma.invoice.update({
          where: {
            id: invoice.id,
          },
          data: {
            status: "paid",
          },
        });

        res.status(200).end();
        prisma.$disconnect();
        return;
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        prisma.$disconnect();
        return;
      }
    }

    case "DELETE": {
      try {
        const orders = await prisma.order.findMany({
          where: {
            invoiceId: invoice.id,
          },
        });

        await prisma.$transaction(async (trx) => {
          await trx.client.update({
            where: {
              id: invoice.clientId,
            },
            data: {
              invoices: {
                disconnect: [{ id: invoice.id }],
              },
              orders: {
                disconnect: orders.map((order) => ({
                  id: order.id,
                })),
              },
            },
          });

          await trx.order.deleteMany({
            where: {
              invoiceId: invoice.id,
            },
          });

          await trx.invoice.delete({
            where: {
              id: invoice.id,
            },
          });
        });

        res.status(204).end();
        prisma.$disconnect();
        return;
      } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        prisma.$disconnect();
        return;
      }
    }

    default:
      res.status(200).end();
      break;
  }
}

export default withCors(handler);
