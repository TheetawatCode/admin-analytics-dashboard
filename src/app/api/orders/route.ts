import { NextRequest, NextResponse } from "next/server"
import { getOrders } from "@/server/services/orders.service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const page = Number(searchParams.get("page") ?? "1")
    const limit = Number(searchParams.get("limit") ?? "10")

    const data = await getOrders({
      page,
      limit,
    })

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("GET /api/orders error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    )
  }
}