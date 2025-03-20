"use client";

import { Card } from "./ui/card";
import {
  calculateGapTimeISO,
  convertToVietnamISOToMonthDay,
  convertToVietnamTime,
  formatCurrency,
} from "@/lib/utils";
import { Separator } from "./ui/separator";
import { HOUR_FEE } from "@/lib/constants";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { DateTime } from "luxon";
import { useLocale, useTranslations } from "next-intl";

interface ChatRoomBillProps {
  chatRoomId: string;
}

export default function ChatRoomBill({ chatRoomId }: ChatRoomBillProps) {
  const locale = useLocale();
  const t = useTranslations();
  const { bills } = useChatRoomStore();
  const currentRoomBills = bills[chatRoomId] || [];

  if (currentRoomBills.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        {t("chatRoom.noReservationInfo")}
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
                <span>{t("chatRoom.reservationNumber")}: </span>
                <span>{bill.id} </span>
                {bill.guideConfirm ? (
                  <span>({t("chatRoom.reservationConfirmed")})</span>
                ) : (bill.guideConfirm === false &&
                    DateTime.now().toISO() > bill.startTime) ||
                  bill.userCancel ||
                  bill.guideCancel ? (
                  <span>({t("chatRoom.reservationCanceled")})</span>
                ) : (
                  <span>({t("chatRoom.reservationNotConfirmed")})</span>
                )}
              </div>
              <div className="text-xl font-semibold">
                <span>{t("chatRoom.reservationInfo")}</span>
              </div>
              <div>
                <div>{t("chatRoom.date")}</div>
                <div>
                  <span>
                    {convertToVietnamISOToMonthDay(bill.startTime, locale)}
                  </span>
                </div>
              </div>
              <div>
                <div>{t("chatRoom.time")}</div>
                <div>
                  <span>{convertToVietnamTime(bill.startTime)}~</span>
                  <span>{convertToVietnamTime(bill.endTime)}</span>
                </div>
              </div>
              <div>
                <div>{t("chatRoom.pickupLocation")}</div>
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
              <div className="text-xl font-semibold">
                {t("chatRoom.feeDetail")}
              </div>
              <div>
                <div className="flex justify-between">
                  <span className="underline">
                    {`${formatCurrency(HOUR_FEE)} x ${calculateGapTimeISO(
                      bill.startTime,
                      bill.endTime
                    )}${t("chatRoom.hour")}`}
                  </span>
                  <span>
                    {formatCurrency(
                      HOUR_FEE *
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
