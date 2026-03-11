import { getCustomersFromDb } from "@/server/repositories/customers.repository"

type GetCustomersParams = {
  page: number
  limit: number
  search?: string
}

export async function getCustomers({
  page,
  limit,
  search,
}: GetCustomersParams) {
  const result = await getCustomersFromDb({ page, limit, search })

  return {
    ...result,
    customers: result.customers.map((customer) => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      ordersCount: customer._count.orders,
      createdAt: customer.createdAt,
    })),
  }
}