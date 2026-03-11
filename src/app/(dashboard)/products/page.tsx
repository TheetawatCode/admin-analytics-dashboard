import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, PlusCircle, BarChart3 } from "lucide-react"

const plannedFeatures = [
  {
    title: "Create new products",
    description: "Add new product records for catalog and inventory management.",
    icon: PlusCircle,
  },
  {
    title: "Manage pricing and stock",
    description: "Update product pricing, stock levels, and product availability.",
    icon: Package,
  },
  {
    title: "Monitor product performance",
    description: "Track product activity and business performance through analytics.",
    icon: BarChart3,
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-sm text-muted-foreground">
          This module will support product catalog and inventory management in future versions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-xl border border-dashed p-6">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-lg font-semibold">Product management module</h2>
              <p className="text-sm text-muted-foreground">
                This section is reserved for future product catalog and inventory
                management features in the admin dashboard.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {plannedFeatures.map((feature) => {
              const Icon = feature.icon

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border p-5 transition-colors hover:bg-muted/30"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="text-base font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}