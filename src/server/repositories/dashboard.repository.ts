import { prisma } from "@/lib/prisma"

export async function getDashboardStatsFromDb() {
  const [revenueResult, totalOrders, totalCustomers, totalProducts, recentOrders] =
    await Promise.all([
      prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
      }),
      prisma.order.count(),
      prisma.customer.count(),
      prisma.product.count(),
      prisma.order.findMany({
        take: 5,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          customer: true,
        },
      }),
    ])

  return {
    revenueResult,
    totalOrders,
    totalCustomers,
    totalProducts,
    recentOrders,
  }
}