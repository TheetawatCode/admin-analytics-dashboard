import { NextRequest, NextResponse } from "next/server"
import { getCustomers } from "@/server/services/customers.service"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams

    const page = Math.max(1, Number(searchParams.get("page") ?? "1"))
    const limit = Math.max(1, Number(searchParams.get("limit") ?? "10"))
    const search = searchParams.get("search") ?? ""

    const data = await getCustomers({
      page,
      limit,
      search,
    })

    return NextResponse.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error("GET /api/customers error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch customers",
      },
      { status: 500 }
    )
  }
}