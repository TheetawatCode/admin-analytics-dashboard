import Link from "next/link"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type OrdersPageProps = {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

async function getOrders(page = 1, search = "") {
  const params = new URLSearchParams({
    page: String(page),
    limit: "2",
  })

  if (search) {
    params.set("search", search)
  }

  const res = await fetch(`http://localhost:3000/api/orders?${params.toString()}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch orders")
  }

  return res.json()
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams
  const currentPage = Math.max(1, Number(params.page ?? "1"))
  const search = params.search ?? ""

  const response = await getOrders(currentPage, search)
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
          <div>
            <CardTitle>Orders List</CardTitle>
          </div>

          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action="/orders" className="flex items-center gap-2">
            <Input
              name="search"
              placeholder="Search customer..."
              defaultValue={search}
              className="max-w-sm"
            />
            <Button type="submit" variant="outline">
              Search
            </Button>
          </form>

          <table className="w-full table-fixed text-sm">
            <colgroup>
              <col className="w-[22%]" />
              <col className="w-[28%]" />
              <col className="w-[20%]" />
              <col className="w-[20%]" />
            </colgroup>
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
            {hasPreviousPage ? (
              <Button asChild variant="outline">
                <Link
                  href={`/orders?page=${currentPage - 1}${search ? `&search=${encodeURIComponent(search)}` : ""
                    }`}
                >
                  Previous
                </Link>
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Previous
              </Button>
            )}

            {hasNextPage ? (
              <Button asChild variant="outline">
                <Link
                  href={`/orders?page=${currentPage + 1}${search ? `&search=${encodeURIComponent(search)}` : ""
                    }`}
                >
                  Next
                </Link>
              </Button>
            ) : (
              <Button variant="outline" disabled>
                Next
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}