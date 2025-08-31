// ts-ignore 7017 is used to ignore the error that the global object is not
// defined in the global scope. This is because the global object is only
// defined in the global scope in Node.js and not in the browser.

import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Conditional Prisma initialization to handle build-time issues
let prisma: PrismaClient;

try {
  prisma = globalForPrisma.prisma || new PrismaClient();
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
} catch (error) {
  // Fallback for build-time when Prisma engines aren't available
  console.warn("Prisma client initialization failed during build:", error);
  prisma = {} as PrismaClient;
}

export { prisma };
export default prisma;
