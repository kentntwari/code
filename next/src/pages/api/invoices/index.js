// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { extendedPrisma } from "../../../../lib/prismaClient";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.headers.origin !== process.env.REMOTE_ORIGIN) {
    res.status(403).json({ message: "Not allowed" });
    return;
  }
  res.setHeader("Access-Control-Allow-Origin", process.env.REMOTE_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "GET");

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
