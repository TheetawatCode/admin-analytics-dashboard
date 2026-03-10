import {
  DollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "$24,500",
    change: "+12.5% from last month",
    icon: DollarSign,
  },
  {
    title: "Total Orders",
    value: "1,248",
    change: "+8.2% from last month",
    icon: ShoppingCart,
  },
  {
    title: "Total Customers",
    value: "892",
    change: "+5.4% from last month",
    icon: Users,
  },
  {
    title: "Active Products",
    value: "128",
    change: "+3 new this week",
    icon: Package,
  },
]

const recentOrders = [
  { id: "#ORD-1001", customer: "John Carter", amount: "$240.00", status: "Paid" },
  { id: "#ORD-1002", customer: "Sarah Kim", amount: "$125.00", status: "Pending" },
  { id: "#ORD-1003", customer: "Michael Lee", amount: "$560.00", status: "Completed" },
  { id: "#ORD-1004", customer: "Emma Wilson", amount: "$89.00", status: "Paid" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-sm text-muted-foreground">
          Monitor business performance, orders, customers, and products.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
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
            <div className="flex h-[320px] items-center justify-center rounded-lg border border-dashed text-sm text-muted-foreground">
              Revenue chart will be added in the next step
            </div>
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
              <p className="mt-1 text-2xl font-bold">$96.40</p>
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
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b last:border-0">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">{order.customer}</td>
                      <td className="px-4 py-3">{order.amount}</td>
                      <td className="px-4 py-3">{order.status}</td>
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