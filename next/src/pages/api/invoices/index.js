// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { extendedPrisma } from "../../../../lib/prismaClient";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Methods", "GET");

  if (req.method !== "GET") {
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    return;
  }

  switch (req.method) {
    case "GET": {
      try {
        const invoices = await extendedPrisma.invoice.findMany({
          include: { client: true, orders: true },
        });

        res.status(200).json(invoices);
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
