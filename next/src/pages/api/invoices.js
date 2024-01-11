// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { prisma } from "../../../lib/prismaClient";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case "GET": {
      try {
        const invoices = await prisma.invoice.findMany();
        res.status(200).json(invoices);
        return;
      } catch (err) {
        res.status(500).json({ message: "Something went wrong", error: err.message });
        return;
      }
    }

    case "POST": {
      try {
        await prisma.invoice.create({
          data: {
            id: "RG0314",
            status: "paid",
            description: "Website Redesign",
            paymentTerms: 7,
            dueDate: new Date("2021-10-01"),
            createdAt: new Date("2021-09-24"),
            client: {
              connectOrCreate: {
                where: {
                  client_specs: {
                    name: "John Morrison",
                    email: "jm@myco.com",
                    street: "79 Dover Road",
                    city: "Westhall",
                    postCode: "IP19 3PF",
                    country: "United Kingdom",
                  },
                },
                create: {
                  name: "John Morrison",
                  email: "jm@myco.com",
                  street: "79 Dover Road",
                  city: "Westhall",
                  postCode: "IP19 3PF",
                  country: "United Kingdom",
                  orders: {
                    createMany: {
                      data: [
                        {
                          item: "Website Redesign",
                          quantity: 1,
                          price: 14002.33,
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        });

        res.status(201).json({ message: "Successfully created" });

        return;
      } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });

        return;
      }
    }

    default:
      break;
  }
}
