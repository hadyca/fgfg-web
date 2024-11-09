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
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

interface ChatRoomBillProps {
  chatRoomId: string;
}

export default function ChatRoomBill({ chatRoomId }: ChatRoomBillProps) {
  const bills = useChatRoomStore((state) => state.bills);
  const currentRoomBills = bills[chatRoomId] || [];

  if (currentRoomBills.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        예약 정보가 없습니다.
      </div>
    );
  }

  return (
    <div className="overflow-y-auto flex justify-center">
      <div className="min-w-[560px] flex flex-col gap-5 my-8 p-5">
        {currentRoomBills.map((bill, index) => (
          <Card key={index} className="mx-10 shadow-md p-6">
            <div className="flex flex-col gap-3">
              <div className="text-sm text-muted-foreground">
                <span>예약 번호: </span>
                <span>{bill.id} </span>
                {bill.guideConfirm ? (
                  <span>(예약 확정)</span>
                ) : (bill.guideConfirm === false &&
                    DateTime.now().toISO() > bill.startTime) ||
                  bill.userCancel ||
                  bill.guideCancel ? (
                  <span>(예약 취소)</span>
                ) : (
                  <span>(예약 미확정)</span>
                )}
              </div>
              <div className="text-xl font-semibold">
                <span>예약 정보</span>
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
              <div>
                <div>픽업 위치</div>
                <div className="flex flex-col">
                  <div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        bill.pickupPlaceMain
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary"
                    >
                      <span>{bill.pickupPlaceMain}</span>
                    </a>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {bill.pickupPlaceDetail}
                  </span>
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
