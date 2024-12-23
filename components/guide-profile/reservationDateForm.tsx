"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { useEffect, useState } from "react";
import { subDays, format } from "date-fns";
import {
  searchGuideSchema,
  SearchGuideType,
} from "@/app/[locale]/(main)/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enUS, ko, vi } from "date-fns/locale";
import {
  calculateGapTime,
  convertToUTC,
  convertToVietnamISO,
  convertToVietnamTime,
  formatCurrency,
} from "@/lib/utils";
import { useRouter } from "@/i18n/routing";
import { SERVICE_FEE } from "@/lib/constants";
import { useLocale, useTranslations } from "next-intl";

interface Reservation {
  id: number;
  startTime: string;
  endTime: string;
}

interface ReservationDateFormProps {
  guideId: number;
  searchParams?: {
    starttime: string;
    endtime: string;
  };
  reservations: Reservation[];
  isActive: boolean;
  isMe: boolean;
}

export default function ReservationDateForm(props: ReservationDateFormProps) {
  const locale = useLocale();
  const t = useTranslations();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
    watch,
  } = useForm<SearchGuideType>({
    resolver: zodResolver(searchGuideSchema(t)),
  });
  const watchDate = watch("date");

  useEffect(() => {
    if (props?.searchParams?.starttime && props?.searchParams?.endtime) {
      const date = convertToVietnamISO(props.searchParams.starttime);
      const dateOnly = date!.split("T")[0];
      setSelectedDate(new Date(dateOnly));

      const startTime = convertToVietnamTime(props.searchParams.starttime);
      const endTime = convertToVietnamTime(props.searchParams.endtime);

      setValue("date", dateOnly);

      setStartTime(startTime);
      setValue("startTime", startTime);

      if (endTime === "00:00") {
        setEndTime("24:00");
        setValue("endTime", "24:00");
      } else {
        setEndTime(endTime);
        setValue("endTime", endTime);
      }
    }
  }, [setValue, props]);

  const onValid = async (data: SearchGuideType) => {
    if (!props.isActive) {
      setError("startTime", {
        type: "custom",
        message: t("guideProfile.inactiveGuide"),
      });
      return;
    }

    if (props.isMe) {
      setError("startTime", {
        type: "custom",
        message: t("guideProfile.selfGuide"),
      });
      return;
    }
    // 폼 데이터를 FormData 객체로 변환
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    const inputStartTime = convertToUTC(`${data.date}T${data.startTime}`);
    const inputEndTime = convertToUTC(`${data.date}T${data.endTime}`);

    // 예약된 시간과 겹치는지 확인
    for (let reservation of props.reservations) {
      const reservedStartTime = reservation.startTime;
      const reservedEndTime = reservation.endTime;

      // 조건 1: 새로운 예약의 시작 시간이 기존 예약의 기간 내에 있는 경우
      const isStartTimeOverlap =
        inputStartTime! >= reservedStartTime &&
        inputStartTime! < reservedEndTime;

      // 조건 2: 새로운 예약의 종료 시간이 기존 예약의 기간 내에 있는 경우
      const isEndTimeOverlap =
        inputEndTime! > reservedStartTime && inputEndTime! <= reservedEndTime;

      // 조건 3: 새로운 예약이 기존 예약을 완전히 포함하는 경우
      const isFullyOverlap =
        inputStartTime! <= reservedStartTime &&
        inputEndTime! >= reservedEndTime;

      if (isStartTimeOverlap || isEndTimeOverlap || isFullyOverlap) {
        setError("startTime", {
          type: "custom",
          message: t("guideProfile.timeOverlap"),
        });
        return;
      }
    }
    router.push(
      `/reservation/${props.guideId}?starttime=${encodeURIComponent(
        inputStartTime!
      )}&endtime=${encodeURIComponent(inputEndTime!)}`
    );
  };

  const handleDateChange = (date: Date | undefined) => {
    handleSubmit(onValid);
    if (!date || date === selectedDate) {
      setIsPopoverOpen(false);
      return;
    }
    const convertedDate = format(date, "yyyy-MM-dd");

    if (startTime && endTime) {
      const inputStartTime = convertToUTC(`${convertedDate}T${startTime}`);
      const inputEndTime = convertToUTC(`${convertedDate}T${endTime}`);
      setIsPopoverOpen(false); // 날짜 선택 후 팝오버 닫기

      return router.push(
        `/guide-profile/${props.guideId}?starttime=${encodeURIComponent(
          inputStartTime!
        )}&endtime=${encodeURIComponent(inputEndTime!)}`,
        { scroll: false }
      );
    }
    setSelectedDate(date);
    setValue("date", date ? convertedDate : ""); // 날짜 포맷을 맞춰서 저장
    setIsPopoverOpen(false); // 날짜 선택 후 팝오버 닫기
  };

  const handleStartTimeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const startTime = e.target.value;

    if (selectedDate && endTime) {
      const convertedDate = format(selectedDate, "yyyy-MM-dd");
      const inputStartTime = convertToUTC(`${convertedDate}T${startTime}`);
      const inputEndTime = convertToUTC(`${convertedDate}T${endTime}`);
      return router.push(
        `/guide-profile/${props.guideId}?starttime=${encodeURIComponent(
          inputStartTime!
        )}&endtime=${encodeURIComponent(inputEndTime!)}`,
        { scroll: false }
      );
    }
    setValue("startTime", startTime);
    setStartTime(startTime);
  };

  const handleEndTimeChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const endTime = e.target.value;

    if (selectedDate && startTime) {
      const convertedDate = format(selectedDate, "yyyy-MM-dd");
      const inputStartTime = convertToUTC(`${convertedDate}T${startTime}`);
      const inputEndTime = convertToUTC(`${convertedDate}T${endTime}`);
      return router.push(
        `/guide-profile/${props.guideId}?starttime=${encodeURIComponent(
          inputStartTime!
        )}&endtime=${encodeURIComponent(inputEndTime!)}`,
        { scroll: false }
      );
    }
    setValue("endTime", endTime);
    setEndTime(endTime);
  };

  return (
    <Card className="shadow-lg p-6">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-center items-start gap-4">
            <div>
              <Label className="block mb-2">
                {t("guideProfile.dateSelection")}
              </Label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="hover:bg-white w-36 px-3"
                  >
                    {watchDate ? (
                      <span className="font-normal">{watchDate}</span>
                    ) : (
                      <span className="text-muted-foreground">
                        {t("guideProfile.addDate")}
                      </span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={locale === "ko" ? ko : locale === "vn" ? vi : enUS}
                    onSelect={handleDateChange}
                    selected={selectedDate}
                    disabled={(date) => {
                      const yesterday = subDays(new Date(), 1);
                      return date <= yesterday;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-row gap-2 justify-between w-full">
              <div>
                <Label className="block mb-2">
                  {t("guideProfile.pickupTime")}
                </Label>
                <select
                  className={`w-36 focus:outline-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm  ${
                    startTime ? "" : "text-muted-foreground"
                  }`}
                  value={startTime}
                  onChange={handleStartTimeChange}
                >
                  <option value="" disabled hidden>
                    {t("guideProfile.addTime")}
                  </option>
                  {Array.from({ length: 23 }, (_, i) => {
                    const time = `${String(i).padStart(2, "0")}:00`;
                    return (
                      <option key={time} value={time} className="text-black">
                        {time}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <Label className="block mb-2">
                  {t("guideProfile.endTime")}
                </Label>
                <select
                  className={`w-36 focus:outline-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm  ${
                    endTime ? "" : "text-muted-foreground"
                  }`}
                  value={endTime}
                  onChange={handleEndTimeChange}
                >
                  <option value="" disabled hidden>
                    {t("guideProfile.addTime")}
                  </option>
                  {Array.from({ length: 23 }, (_, i) => {
                    const time = `${String(i + 2).padStart(2, "0")}:00`;
                    return (
                      <option key={time} value={time} className="text-black">
                        {time}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          {errors?.startTime?.type === "custom" ? (
            <div className="text-center">
              <span className="text-destructive font-medium">
                {errors?.startTime?.message}
              </span>
            </div>
          ) : errors?.date || errors?.startTime || errors?.endTime ? (
            <div className="text-center">
              <span className="text-destructive font-medium">
                {t("guideProfile.checkDateAndTime")}
              </span>
            </div>
          ) : null}
          <Button>{t("guideProfile.reserve")}</Button>
          <div className="text-sm text-center">
            {t("guideProfile.reserveDescription")}
          </div>
          {calculateGapTime(startTime, endTime) > 1 ? (
            <div className="flex justify-between">
              <span className="underline">
                {`${formatCurrency(SERVICE_FEE)} x ${calculateGapTime(
                  startTime,
                  endTime
                )} ${t("guideProfile.hour")}`}
              </span>
              <span>
                {formatCurrency(
                  SERVICE_FEE * calculateGapTime(startTime, endTime)
                )}
              </span>
            </div>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
