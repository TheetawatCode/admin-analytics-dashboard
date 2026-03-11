import { prisma } from "@/lib/prisma"

type GetOrdersParams = {
  page: number
  limit: number
  search?: string
}

export async function getOrdersFromDb({
  page,
  limit,
  search,
}: GetOrdersParams) {
  const skip = (page - 1) * limit

  const where = search
    ? {
        customer: {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        },
      }
    : {}

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: limit,
      where,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
      },
    }),
    prisma.order.count({
      where,
    }),
  ])

  return {
    orders,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}