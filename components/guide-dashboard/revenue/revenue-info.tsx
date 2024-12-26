"use client";

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
import { useLocale, useTranslations } from "next-intl";

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
  totalUnTransferredAmount: number;
  totalReservations: number;
  totalGuideTime: number;
  unTransferredRevenue: UnTransferredRevenue[];
  oneMonthRevenue: OneMonthRevenue[];
  totalThisMonthRevenue: number;
}

const chartConfig = {
  amount: {
    label: "Amount",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function RevenueInfo({
  totalAmount,
  totalUnTransferredAmount,
  totalReservations,
  totalGuideTime,
  unTransferredRevenue,
  oneMonthRevenue,
  totalThisMonthRevenue,
}: RevenueInfoProps) {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("revenue.totalAmount")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatToVND(totalAmount)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("revenue.totalUnTransferredAmount")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatToVND(totalUnTransferredAmount)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("revenue.totalReservations")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${totalReservations}`}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              {t("revenue.totalGuideTime")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{`${totalGuideTime}${t(
              "revenue.hour"
            )}`}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-10">
        <Card className="lg:col-span-6">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>{`${t(
                "revenue.thisMonthTotalRevenue"
              )} -  ${formatToVND(totalThisMonthRevenue)}`}</CardTitle>
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
                    return date.toLocaleDateString(
                      locale === "ko" ? "ko" : locale === "vn" ? "vi" : "en",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    );
                  }}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="w-[150px]"
                      labelFormatter={(value) => {
                        return new Date(value).toLocaleDateString(
                          locale === "ko"
                            ? "ko"
                            : locale === "vn"
                            ? "vi"
                            : "en",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        );
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
        <Card className="lg:col-span-4 h-full">
          <CardHeader>
            <CardTitle>{t("revenue.unTransferredRevenueList")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("revenue.reservationNumber")}</TableHead>
                  <TableHead>{t("revenue.paymentDate")}</TableHead>
                  <TableHead className="text-right">
                    {t("revenue.amount")}
                  </TableHead>
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
