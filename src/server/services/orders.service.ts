import { getOrdersFromDb } from "@/server/repositories/orders.repository"

type GetOrdersParams = {
  page: number
  limit: number
}

export async function getOrders({ page, limit }: GetOrdersParams) {
  const result = await getOrdersFromDb({ page, limit })

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