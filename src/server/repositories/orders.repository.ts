import { prisma } from "@/lib/prisma"

type GetOrdersParams = {
  page: number
  limit: number
}

export async function getOrdersFromDb({ page, limit }: GetOrdersParams) {
  const skip = (page - 1) * limit

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        customer: true,
      },
    }),
    prisma.order.count(),
  ])

  return {
    orders,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  }
}