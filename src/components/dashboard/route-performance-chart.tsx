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

interface RoutePerformanceChartProps {
  data: { name: string; revenue: number }[];
}

export function RoutePerformanceChart({ data }: RoutePerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Routes by Estimated Revenue</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend />
            <Bar dataKey="revenue" fill="#8b5cf6" name="Est. Daily Revenue" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
