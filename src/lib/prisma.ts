import { PrismaClient } from "@/generated/prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL as string,
  } as any)

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma