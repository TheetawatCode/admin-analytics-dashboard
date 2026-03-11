import { prisma } from "@/lib/prisma"

type GetCustomersParams = {
  page: number
  limit: number
  search?: string
}

export async function getCustomersFromDb({
  page,
  limit,
  search,
}: GetCustomersParams) {
  const skip = (page - 1) * limit

  const where = search
    ? {
        name: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {}

  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      skip,
      take: limit,
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            orders: true,
          },
        },
      },
    }),
    prisma.customer.count({
      where,
    }),
  ])

  return {
    customers,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}