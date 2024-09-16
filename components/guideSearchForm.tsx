"use client";

import { searchGuideSchema, SearchGuideType } from "@/app/(main)/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ko } from "date-fns/locale";
import { subDays, format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import { convertToVietnamISO, convertToVietnamTime } from "@/lib/utils";

interface SearchGuideProps {
  onSubmit: (data: SearchGuideType) => void;
  searchParams?: {
    starttime: string;
    endtime: string;
  };
}

export default function GuideSearchForm({
  onSubmit,
  searchParams,
}: SearchGuideProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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
    if (searchParams?.starttime && searchParams?.endtime) {
      const date = convertToVietnamISO(searchParams.starttime); //searchParams.starttime는 UTC기준이고, 베트남 시간기준으로 바꿔야함
      const dateOnly = date!.split("T")[0];

      const startTime = convertToVietnamTime(searchParams.starttime);
      const endTime = convertToVietnamTime(searchParams.endtime);

      setValue("date", dateOnly!);
      setSelectedDate(new Date(dateOnly!));

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
  }, [setValue, searchParams]);

  const handleFormSubmit = async (data: SearchGuideType) => {
    onSubmit(data);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (!date || date === selectedDate) {
      setIsPopoverOpen(false);
      return;
    }
    setSelectedDate(date);
    setValue("date", date ? format(date, "yyyy-MM-dd") : "");
    setIsPopoverOpen(false);
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
    <Card className="max-w-max shadow-lg p-3">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-4">
          <div>
            <Label className="block mb-2 text-center">날짜 선택</Label>
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
          <div>
            <Label className="block mb-2 text-center">픽업 시각</Label>
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
            <Label className="block mb-2 text-center">종료 시각</Label>
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
          <button className="text-primary hover:text-primary/90">
            <MagnifyingGlassCircleIcon className="size-10" />
          </button>
        </div>
        {errors?.startTime?.type === "custom" ? (
          <div className="mt-3">
            <span className="text-destructive font-medium">
              {errors?.startTime?.message}
            </span>
          </div>
        ) : errors?.date || errors?.startTime || errors?.endTime ? (
          <div className="mt-3">
            <span className="text-destructive font-medium">
              날짜와 시간을 다시 확인해주세요.
            </span>
          </div>
        ) : null}
      </form>
    </Card>
  );
}
