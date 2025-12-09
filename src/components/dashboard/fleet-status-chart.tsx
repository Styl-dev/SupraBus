"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface FleetStatusChartProps {
  data: { status: string; count: number }[];
}

const COLORS: Record<string, string> = {
  active: "#10b981",
  maintenance: "#eab308",
  retired: "#ef4444",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  maintenance: "Maintenance",
  retired: "Retired",
};

export function FleetStatusChart({ data }: FleetStatusChartProps) {
  const chartData = data.map((item) => ({
    name: STATUS_LABELS[item.status] || item.status,
    value: item.count,
    status: item.status,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fleet Status</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[entry.status] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
