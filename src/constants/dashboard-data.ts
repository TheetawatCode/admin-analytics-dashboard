import {
    DollarSign,
    Package,
    ShoppingCart,
    Users,
  } from "lucide-react"
  
  export const stats = [
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
  
  export const recentOrders = [
    { id: "#ORD-1001", customer: "John Carter", amount: "$240.00", status: "Paid" },
    { id: "#ORD-1002", customer: "Sarah Kim", amount: "$125.00", status: "Pending" },
    { id: "#ORD-1003", customer: "Michael Lee", amount: "$560.00", status: "Completed" },
    { id: "#ORD-1004", customer: "Emma Wilson", amount: "$89.00", status: "Paid" },
  ]
  
  export const revenueData = [
    { month: "Jan", revenue: 3200 },
    { month: "Feb", revenue: 4100 },
    { month: "Mar", revenue: 3800 },
    { month: "Apr", revenue: 5200 },
    { month: "May", revenue: 6100 },
    { month: "Jun", revenue: 5800 },
    { month: "Jul", revenue: 7200 },
  ]