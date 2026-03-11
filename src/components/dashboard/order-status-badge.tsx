import { Badge } from "@/components/ui/badge"

type Props = {
  status: string
}

export function OrderStatusBadge({ status }: Props) {
  const statusStyles: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800 border-yellow-200",
    PAID: "bg-green-100 text-green-800 border-green-200",
    SHIPPED: "bg-blue-100 text-blue-800 border-blue-200",
    COMPLETED: "bg-purple-100 text-purple-800 border-purple-200",
  }

  return (
    <Badge
      variant="outline"
      className={statusStyles[status] ?? "bg-gray-100 text-gray-700"}
    >
      {status}
    </Badge>
  )
}