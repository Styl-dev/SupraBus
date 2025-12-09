"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface DriverAvailabilityChartProps {
  data: { status: string; count: number }[];
}

const STATUS_LABELS: Record<string, string> = {
  available: "Available",
  on_duty: "On Duty",
  off_duty: "Off Duty",
  on_leave: "On Leave",
};

const COLORS: Record<string, string> = {
  available: "#10b981",
  on_duty: "#eab308",
  off_duty: "#9ca3af",
  on_leave: "#9ca3af",
};

export function DriverAvailabilityChart({
  data,
}: DriverAvailabilityChartProps) {
  const chartData = data.map((item) => ({
    name: STATUS_LABELS[item.status] || item.status,
    count: item.count,
    status: item.status,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Driver Availability</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
