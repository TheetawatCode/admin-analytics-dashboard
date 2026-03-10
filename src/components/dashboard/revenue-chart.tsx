"use client"

import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

type RevenueChartProps = {
    data: {
        month: string
        revenue: number
    }[]
}

export function RevenueChart({ data }: RevenueChartProps) {
    return (
        <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        fontSize={12}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        formatter={(value: any) => [`$${value.toLocaleString()}`, "Revenue"]}
                        contentStyle={{
                            backgroundColor: "white",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            padding: "10px",
                        }}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="currentColor"
                        strokeWidth={2}
                        dot={false}
                    />$
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}