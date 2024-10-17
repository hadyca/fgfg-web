"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatToVietnameseDate, formatToVND } from "@/lib/utils";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface Reservation {
  id: number;
}

interface UnTransferredRevenue {
  amount: number;
  createdAt: string;
  reservation: Reservation;
}

interface OneMonthRevenue {
  date: string;
  amount: number;
}

interface RevenueInfoProps {
  totalAmount: number;
  totalunTransferredAmount: number;
  totalReservations: number;
  totalGuideTime: number;
  unTransferredRevenue: UnTransferredRevenue[];
  oneMonthRevenue: OneMonthRevenue[];
  totalThisMonthRevenue: number;
}
const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function RevenueInfo({
  totalAmount,
  totalunTransferredAmount,
  totalReservations,
  totalGuideTime,
  unTransferredRevenue,
  oneMonthRevenue,
  totalThisMonthRevenue,
}: RevenueInfoProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 수익</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatToVND(totalAmount)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              미정산 총 금액
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatToVND(totalunTransferredAmount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">총 예약 건수</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${totalReservations}건`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              총 가이드 시간
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${totalGuideTime}시간`}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-10">
        <Card className="lg:col-span-6">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>{`이번 달 총 수익 -  ${formatToVND(
                totalThisMonthRevenue
              )}`}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart accessibilityLayer data={oneMonthRevenue}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return date.toLocaleDateString("vi-VN", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString("vi-VN", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        });
                      }}
                      formatter={(value, name, props) => {
                        return formatToVND(props.payload.amount);
                      }}
                    />
                  }
                />
                <Bar dataKey="amount" fill="var(--color-amount)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>미정산 금액 리스트</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>예약 번호</TableHead>
                  <TableHead>결제 날짜</TableHead>
                  <TableHead className="text-right">금액</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {unTransferredRevenue.map((revenue, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {revenue.reservation.id}
                    </TableCell>
                    <TableCell>
                      {formatToVietnameseDate(revenue.createdAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatToVND(revenue.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
