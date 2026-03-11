import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type CustomersPageProps = {
  searchParams: Promise<{
    page?: string
    search?: string
  }>
}

async function getCustomers(page = 1, search = "") {
  const params = new URLSearchParams({
    page: String(page),
    limit: "2",
  })

  if (search) {
    params.set("search", search)
  }

  const res = await fetch(
    `http://localhost:3000/api/customers?${params.toString()}`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch customers")
  }

  return res.json()
}

export default async function CustomersPage({
  searchParams,
}: CustomersPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page ?? "1")
  const search = params.search ?? ""

  const response = await getCustomers(currentPage, search)
  const { customers, totalPages } = response.data

  const hasPreviousPage = currentPage > 1
  const hasNextPage = currentPage < totalPages

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-sm text-muted-foreground">
          View and manage customer records.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Customers List</CardTitle>
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <form action="/customers" className="flex items-center gap-2">
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

          <table className="w-full text-sm">
            <thead className="border-b text-left text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Orders</th>
                <th className="px-4 py-3">Created At</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer: any) => (
                <tr
                  key={customer.id}
                  className="border-b transition-colors hover:bg-muted/40 last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{customer.name}</td>
                  <td className="px-4 py-3">{customer.email}</td>
                  <td className="px-4 py-3">{customer.ordersCount}</td>
                  <td className="px-4 py-3">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button asChild variant="outline" disabled={!hasPreviousPage}>
              <Link
                href={`/customers?page=${currentPage - 1}${
                  search ? `&search=${encodeURIComponent(search)}` : ""
                }`}
              >
                Previous
              </Link>
            </Button>

            <Button asChild variant="outline" disabled={!hasNextPage}>
              <Link
                href={`/customers?page=${currentPage + 1}${
                  search ? `&search=${encodeURIComponent(search)}` : ""
                }`}
              >
                Next
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}