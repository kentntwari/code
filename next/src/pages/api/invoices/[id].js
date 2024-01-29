import { prisma, extendedPrisma } from "../../../../lib/prismaClient";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "PATCH", "DELETE");

  if (!["GET", "POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

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
        console.log(req.body);

        await extendedPrisma.$transaction(async (tx) => {
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
              id: req.body.invoiceID.toUpperCase(),
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
              orders: {
                createMany: {
                  data: req.body.orders.map((order) => ({
                    ...order,
                    senderId: sender.id,
                  })),
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
      console.log(req.body);
      res.end();
      return;
    }

    case "PATCH": {
      const incomingHeaders = new Headers(req.headers);

      if (incomingHeaders.get("X-patch-request-action") !== "mark-as-paid") {
        res.status(400).json({ message: "Invalid request actiondcdscsdcdsc" });
        return;
      }

      try {
        await extendedPrisma.invoice.update({
          where: {
            id: invoice.id,
          },
          data: {
            status: "paid",
          },
        });

        res.status(200).end();
        extendedPrisma.$disconnect();
        return;
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        extendedPrisma.$disconnect();
        return;
      }
    }

    case "DELETE": {
      try {
        const orders = await extendedPrisma.order.findMany({
          where: {
            invoiceId: invoice.id,
          },
        });

        await extendedPrisma.$transaction(async (trx) => {
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
        extendedPrisma.$disconnect();
        return;
      } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        extendedPrisma.$disconnect();
        return;
      }
    }

    default:
      res.status(200).end();
      break;
  }
}
