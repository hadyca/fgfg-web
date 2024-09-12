"use client";

import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { useEffect, useState } from "react";
import { subDays, format } from "date-fns";
import { searchGuideSchema, SearchGuideType } from "@/app/(main)/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ko } from "date-fns/locale";
import { calculateGapTime, formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ReservationDateFormProps {
  guideId: number;
  searchParams?: {
    starttime: string;
    endtime: string;
  };
}

export default function ReservationDateForm(props: ReservationDateFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const router = useRouter();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<SearchGuideType>({
    resolver: zodResolver(searchGuideSchema),
  });

  const watchDate = watch("date");

  useEffect(() => {
    if (props?.searchParams?.starttime && props?.searchParams?.endtime) {
      const date = props?.searchParams.starttime.split("T")[0];
      const startTime = props?.searchParams.starttime
        .split("T")[1]
        .substring(0, 5);
      const endTime = props?.searchParams.endtime.split("T")[1].substring(0, 5);

      setValue("date", date);
      setSelectedDate(new Date(date));

      setStartTime(startTime);
      setValue("startTime", startTime);

      setEndTime(endTime);
      setValue("endTime", endTime);
    }
  }, [setValue, props]);

  const onValid = async (data: SearchGuideType) => {
    // 폼 데이터를 FormData 객체로 변환
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);

    router.push(
      `/reservation/${props.guideId}?starttime=${encodeURIComponent(
        props?.searchParams?.starttime!
      )}&endtime=${encodeURIComponent(props?.searchParams?.endtime!)}`
    );
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date || date === selectedDate) {
      setIsPopoverOpen(false);
      return;
    }
    setSelectedDate(date);
    setValue("date", date ? format(date, "yyyy-MM-dd") : ""); // 날짜 포맷을 맞춰서 저장
    setIsPopoverOpen(false); // 날짜 선택 후 팝오버 닫기
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue("startTime", value);
    setStartTime(value);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setValue("endTime", value);
    setEndTime(value);
  };

  return (
    <Card className="shadow-lg p-6 inline-block">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col justify-center items-start gap-4">
            <div>
              <Label className="block mb-2">날짜 선택</Label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="hover:bg-white w-36 px-3"
                  >
                    {watchDate ? (
                      <span className="font-normal">{watchDate}</span>
                    ) : (
                      <span className="text-muted-foreground">날짜 추가</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ko}
                    selected={selectedDate}
                    onSelect={handleDateChange}
                    disabled={(date) => {
                      const yesterday = subDays(new Date(), 1);
                      return date <= yesterday;
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flwx-row gap-3">
              <div>
                <Label className="block mb-2">픽업 시각</Label>
                <select
                  className={`w-36 focus:outline-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm  ${
                    startTime ? "" : "text-muted-foreground"
                  }`}
                  value={startTime}
                  onChange={handleStartTimeChange}
                >
                  <option value="" disabled hidden>
                    시간 추가
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
                <Label className="block mb-2">종료 시각</Label>
                <select
                  className={`w-36 focus:outline-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm  ${
                    endTime ? "" : "text-muted-foreground"
                  }`}
                  value={endTime}
                  onChange={handleEndTimeChange}
                >
                  <option value="" disabled hidden>
                    시간 추가
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
                날짜와 시간을 다시 확인해주세요.
              </span>
            </div>
          ) : null}
          <Button>예약하기</Button>
          <div className="text-sm text-center">
            예약 확정 전에는 요금이 청구되지 않습니다.
          </div>
          {calculateGapTime(startTime, endTime) > 1 ? (
            <div className="flex justify-between">
              <span className="underline">
                {`₩20,000 x ${calculateGapTime(startTime, endTime)}시간`}
              </span>
              <span>
                {formatCurrency(20000 * calculateGapTime(startTime, endTime))}
              </span>
            </div>
          ) : null}
        </div>
      </form>
    </Card>
  );
}
