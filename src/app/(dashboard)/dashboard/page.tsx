import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { StatCard } from "@/components/dashboard/stat-card"
import { OrderStatusBadge } from "@/components/dashboard/order-status-badge"
import { revenueData } from "@/constants/dashboard-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"

async function getDashboardData() {
  const res = await fetch("http://localhost:3000/api/dashboard/stats", {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data")
  }

  return res.json()
}

export default async function DashboardPage() {
  const response = await getDashboardData()
  const { stats, recentOrders } = response.data

  const cards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: "Live data from PostgreSQL",
      icon: DollarSign,
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: "Live data from PostgreSQL",
      icon: ShoppingCart,
    },
    {
      title: "Total Customers",
      value: stats.totalCustomers.toLocaleString(),
      change: "Live data from PostgreSQL",
      icon: Users,
    },
    {
      title: "Active Products",
      value: stats.totalProducts.toLocaleString(),
      change: "Live data from PostgreSQL",
      icon: Package,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Monitor business performance, orders, customers, and products.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <RevenueChart data={revenueData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Sales Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Today Sales</p>
              <p className="mt-1 text-2xl font-bold">$1,240</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="mt-1 text-2xl font-bold">4.8%</p>
            </div>

            <div className="rounded-lg border p-4">
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="mt-1 text-2xl font-bold">
                ${stats.averageOrderValue.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b text-left text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-medium">Order ID</th>
                    <th className="px-4 py-3 font-medium">Customer</th>
                    <th className="px-4 py-3 font-medium">Amount</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order: any) => (
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
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}