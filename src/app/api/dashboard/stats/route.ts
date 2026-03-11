import { NextResponse } from "next/server"
import { getDashboardStats } from "@/server/services/dashboard.service"

export async function GET() {
  try {
    const data = await getDashboardStats()

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("GET /api/dashboard/stats error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch dashboard stats",
      },
      { status: 500 }
    )
  }
}