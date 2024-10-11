"use client";

import { Card } from "./ui/card";
import {
  calculateGapTimeISO,
  convertToVietnamISOToMonthDay,
  convertToVietnamTime,
  formatCurrency,
} from "@/lib/utils";
import { Separator } from "./ui/separator";
import { SERVICE_FEE } from "@/lib/constants";

interface Bills {
  id: number;
  startTime: string;
  endTime: string;
  guideConfirm: boolean;
}

interface ChatRoomBillProps {
  bills: Bills[];
}

export default function ChatRoomBill({ bills }: ChatRoomBillProps) {
  return (
    <div className="overflow-y-auto flex justify-center">
      <div className="min-w-[560px] flex flex-col gap-5 my-8">
        {bills.map((bill, index) => (
          <Card key={index} className="mx-10 shadow-md p-6">
            <div className="flex flex-col gap-3">
              <div className="text-sm text-muted-foreground">
                <span>예약 번호: </span>
                <span>{bill.id} </span>
                {bill.guideConfirm ? (
                  <span>(예약 확정)</span>
                ) : (
                  <span>(예약 미확정)</span>
                )}
              </div>
              <div className="text-xl font-semibold">
                <span>예약 정보 </span>
              </div>
              <div>
                <div>날짜</div>
                <div>
                  <span>{convertToVietnamISOToMonthDay(bill.startTime)}</span>
                </div>
              </div>
              <div>
                <div>시간</div>
                <div>
                  <span>{convertToVietnamTime(bill.startTime)}~</span>
                  <span>{convertToVietnamTime(bill.endTime)}</span>
                </div>
              </div>
            </div>
            <Separator className="my-6" />
            <div className="flex flex-col gap-3">
              <div className="text-xl font-semibold">요금 세부정보</div>
              <div>
                <div className="flex justify-between">
                  <span className="underline">
                    {`${formatCurrency(SERVICE_FEE)} x ${calculateGapTimeISO(
                      bill.startTime,
                      bill.endTime
                    )}시간`}
                  </span>
                  <span>
                    {formatCurrency(
                      SERVICE_FEE *
                        calculateGapTimeISO(bill.startTime, bill.endTime)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
