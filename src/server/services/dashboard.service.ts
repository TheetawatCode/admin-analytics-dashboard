import { getDashboardStatsFromDb } from "@/server/repositories/dashboard.repository"

export async function getDashboardStats() {
  const {
    revenueResult,
    totalOrders,
    totalCustomers,
    totalProducts,
    recentOrders,
  } = await getDashboardStatsFromDb()

  const totalRevenue = revenueResult._sum.totalAmount ?? 0
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

  return {
    stats: {
      totalRevenue,
      totalOrders,
      totalCustomers,
      totalProducts,
      averageOrderValue,
    },
    recentOrders: recentOrders.map((order) => ({
      id: order.id,
      customerName: order.customer.name,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    })),
  }
}