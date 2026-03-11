import { getOrdersFromDb } from "@/server/repositories/orders.repository"

type GetOrdersParams = {
  page: number
  limit: number
  search?: string
}

export async function getOrders({ page, limit, search }: GetOrdersParams) {
  const result = await getOrdersFromDb({ page, limit, search })

  return {
    ...result,
    orders: result.orders.map((order) => ({
      id: order.id,
      customerName: order.customer.name,
      totalAmount: order.totalAmount,
      status: order.status,
      createdAt: order.createdAt,
    })),
  }
}