import { prisma, extendedPrisma } from "../../../../lib/prismaClient";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.headers.origin !== process.env.REMOTE_ORIGIN) {
    res.status(403).json({ message: "Not allowed" });
    return;
  }
  res.setHeader("Access-Control-Allow-Origin", process.env.REMOTE_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE");

  switch (req.method) {
    case "GET": {
      try {
        const condensed = await extendedPrisma.$transaction(async (tx) => {
          const invoice = await tx.invoice.findFirst({
            where: {
              id: {
                equals: req.query.id,
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

    default:
      res.status(200).end();
      break;
  }
}
