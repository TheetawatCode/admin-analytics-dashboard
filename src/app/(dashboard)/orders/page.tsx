import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

async function getOrders(page = 1) {
  const res = await fetch(
    `http://localhost:3000/api/orders?page=${page}&limit=5`,
    { cache: "no-store" }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch orders")
  }

  return res.json()
}

export default async function OrdersPage() {
  const response = await getOrders()
  const { orders } = response.data

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      <Card>
        <CardHeader>
          <CardTitle>Orders List</CardTitle>
        </CardHeader>

        <CardContent>
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
                  className="border-b hover:bg-muted/40 transition-colors"
                >
                  <td className="px-4 py-3 font-medium">
                    #{order.id.slice(0, 6).toUpperCase()}
                  </td>

                  <td className="px-4 py-3">
                    {order.customerName}
                  </td>

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
        </CardContent>
      </Card>
    </div>
  )
}