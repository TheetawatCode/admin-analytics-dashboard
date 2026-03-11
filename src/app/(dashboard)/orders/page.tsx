import Link from "next/link"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type OrdersPageProps = {
  searchParams: Promise<{
    page?: string
  }>
}

async function getOrders(page = 1) {
  const res = await fetch(
    `http://localhost:3000/api/orders?page=${page}&limit=2`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch orders")
  }

  return res.json()
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page ?? "1")

  const response = await getOrders(currentPage)
  const { orders, totalPages } = response.data

  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders</h1>
        <p className="text-sm text-muted-foreground">
          View and manage customer orders.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Orders List</CardTitle>

          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <table className="w-full text-sm">
            <thead className="border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order: any) => (
                <tr
                  key={order.id}
                  className="border-b transition-colors hover:bg-muted/40 last:border-0"
                >
                  <td className="px-4 py-3 font-medium">
                    #{order.id.slice(0, 6).toUpperCase()}
                  </td>

                  <td className="px-4 py-3">{order.customerName}</td>

                  <td className="px-4 py-3">
                    ${order.totalAmount.toFixed(2)}
                  </td>

                  <td className="px-4 py-3">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button asChild variant="outline" disabled={!hasPreviousPage}>
              <Link href={`/orders?page=${currentPage - 1}`}>Previous</Link>
            </Button>

            <Button asChild variant="outline" disabled={!hasNextPage}>
              <Link href={`/orders?page=${currentPage + 1}`}>Next</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}