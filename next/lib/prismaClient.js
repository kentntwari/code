import { PrismaClient } from "@prisma/client";

export const prisma = global.prisma || new PrismaClient();

export const extendedPrisma = prisma.$extends({
  result: {
    order: {
      total: {
        needs: { quantity: true, price: true },
        compute(order) {
          return order.quantity * order.price;
        },
      },
    },
    invoice: {
      grandTotal: {
        needs: { orders: true },
        compute(invoice) {
          return invoice.orders.reduce(
            (accumulator, order) => accumulator + order.total,
            0
          );
        },
      },
    },
  },
});

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
