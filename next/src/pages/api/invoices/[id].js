import { prisma, extendedPrisma } from "../../../../lib/prismaClient";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");

  switch (req.method) {
    case "GET": {
      try {
        const condensed = await extendedPrisma.$transaction(async (tx) => {
          const invoice = await tx.invoice.findFirst({
            where: {
              id: {
                equals: req.query.invoiceId,
                mode: "insensitive",
              },
            },
            include: { client: true, orders: true },
          });

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
        res.status(500).json({ message: "Something went wrong", error: err.message });
        extendedPrisma.$disconnect();
        return;
      }
    }

    case "DELETE": {
      try {
        await extendedPrisma.$transaction(async (trx) => {
          const orders = await trx.order.findMany({
            where: {
              invoiceId: req.query.invoiceId.toUpperCase(),
            },
          });

          await trx.client.update({
            where: {
              id: req.query.clientId,
            },
            data: {
              invoices: {
                disconnect: [
                  {
                    id: req.query.invoiceId.toUpperCase(),
                  },
                ],
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
              invoiceId: req.query.invoiceId.toUpperCase(),
            },
          });

          await trx.invoice.delete({
            where: {
              id: req.query.invoiceId.toUpperCase(),
            },
          });
        });

        res.status(204).end();
        extendedPrisma.$disconnect();
        return;
      } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
        extendedPrisma.$disconnect();
        return;
      }
    }

    default:
      res.status(200).end();
      break;
  }
}
