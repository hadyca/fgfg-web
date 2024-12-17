"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import {
  searchGuideSchema,
  SearchGuideType,
} from "@/app/[locale]/(main)/schema";
import { Button } from "../ui/button";
import { searchGuide } from "@/app/[locale]/(main)/actions";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ko } from "date-fns/locale";
import { subDays, format } from "date-fns";
import { Card } from "../ui/card";

export default function HeroSectionForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today;
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [loading, setLoading] = useState(false);
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
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    setValue("date", format(tomorrow, "yyyy-MM-dd"));
    setStartTime("09:00");
    setValue("startTime", "09:00");

    setEndTime("12:00");
    setValue("endTime", "12:00");
  }, [setValue]);

  const onValid = async (data: SearchGuideType) => {
    setLoading(true); // 로딩 시작

    // 폼 데이터를 FormData 객체로 변환
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);

    // 서버 함수 호출
    await searchGuide(formData);
    setLoading(false);
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
    <Card className="shadow-xl p-6">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <div>
              <Label className="block mb-2">날짜 선택</Label>
              <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="hover:bg-white w-36 px-3"
                  >
                    <span className="font-normal">{watchDate}</span>
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
            <div>
              <Label className="block mb-2">픽업 시각</Label>
              <select
                className={`w-36 focus:outline-none flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm  ${
                  startTime ? "" : "text-muted-foreground"
                }`}
                value={startTime}
                onChange={handleStartTimeChange}
              >
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
          {errors?.startTime?.type === "custom" ? (
            <div className="items-start">
              <span className="text-destructive font-medium">
                {errors?.startTime?.message}
              </span>
            </div>
          ) : errors?.date || errors?.startTime || errors?.endTime ? (
            <div>
              <span className="text-destructive font-medium">
                날짜와 시간을 다시 확인해주세요.
              </span>
            </div>
          ) : null}
          <Button disabled={loading}>지금 예약하기</Button>
        </div>
      </form>
    </Card>
  );
}
