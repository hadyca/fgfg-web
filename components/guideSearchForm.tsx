"use client";

import { searchGuideSchema, SearchGuideType } from "@/app/(main)/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Drawer, DrawerContent, DrawerHeader } from "./ui/drawer";

interface SearchGuideProps {
  onSubmit: (data: SearchGuideType) => void; // onSubmit의 타입 정의
  searchParams?: {
    startTime: string;
    endTime: string;
  };
}

export default function GuideSearchForm({
  onSubmit,
  searchParams,
}: SearchGuideProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
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
    if (searchParams?.startTime && searchParams?.endTime) {
      const dateStartTime = new Date(searchParams?.startTime);
      const date = dateStartTime.toISOString().split("T")[0];
      const startTime = dateStartTime
        .toISOString()
        .split("T")[1]
        .substring(0, 5);
      const dateEndTime = new Date(searchParams?.endTime);
      const endTime = dateEndTime.toISOString().split("T")[1].substring(0, 5);

      setValue("date", date);

      setStartTime(startTime);
      setValue("startTime", startTime);

      setEndTime(endTime);
      setValue("endTime", endTime);
    }
  }, [setValue, searchParams]);

  const handleFormSubmit = async (data: SearchGuideType) => {
    onSubmit(data);
  };

  const startTimeOptions = Array.from({ length: 23 }, (_, i) => {
    const time = `${String(i).padStart(2, "0")}:00`;
    return (
      <SelectItem key={time} value={time}>
        {time}
      </SelectItem>
    );
  });

  const endTimeOptions = Array.from({ length: 23 }, (_, i) => {
    const time = `${String(i + 2).padStart(2, "0")}:00`;
    return (
      <SelectItem key={time} value={time}>
        {time}
      </SelectItem>
    );
  });

  const handleDateChange = (date: Date | undefined) => {
    if (!date || date === selectedDate) {
      setIsPopoverOpen(false);
      return;
    }
    setSelectedDate(date);
    setValue("date", date ? format(date, "yyyy-MM-dd") : ""); // 날짜 포맷을 맞춰서 저장
    setIsPopoverOpen(false); // 날짜 선택 후 팝오버 닫기
  };

  const handleStartTimeChange = (value: string) => {
    setValue("startTime", value);
    setStartTime(value);
  };

  const handleEndTimeChange = (value: string) => {
    setValue("endTime", value);
    setEndTime(value);
  };

  return (
    <Card className="max-w-max shadow-lg p-3">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex flex-col sm:flex-row justify-center items-end gap-4">
          <div>
            <Label className="block mb-2 text-center">날짜 선택</Label>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className="hover:bg-white w-36 pl-3"
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
            <Select
              key={startTime}
              onValueChange={handleStartTimeChange}
              defaultValue={startTime}
            >
              <SelectTrigger
                className={`w-36 focus:outline-none ${
                  startTime === "" ? "text-muted-foreground" : ""
                }`}
              >
                <SelectValue placeholder="시간 추가" />
              </SelectTrigger>
              <SelectContent>{startTimeOptions}</SelectContent>
            </Select>
          </div>
          <div className="flex flex-col justify-end">
            <Label className="block mb-2 text-center">종료 시각</Label>
            <Select
              key={endTime}
              onValueChange={handleEndTimeChange}
              defaultValue={endTime}
            >
              <SelectTrigger
                className={`w-36 focus:outline-none ${
                  endTime === "" ? "text-muted-foreground" : ""
                }`}
              >
                <SelectValue placeholder="시간 추가" />
              </SelectTrigger>
              <SelectContent
                ref={(ref) => {
                  if (!ref) return;
                  ref.ontouchstart = (e) => {
                    e.preventDefault();
                  };
                }}
              >
                {endTimeOptions}
              </SelectContent>
            </Select>
          </div>
          <button className="text-primary hover:text-primary/90">
            <MagnifyingGlassCircleIcon className="size-10" />
          </button>
        </div>
        {errors?.startTime?.type === "custom" ? (
          <div className="items-start">
            <span className="text-destructive font-medium">
              {errors?.startTime?.message}
            </span>
          </div>
        ) : errors?.startTime || errors?.startTime || errors?.endTime ? (
          <div>
            <span className="text-destructive font-medium">
              날짜와 시간을 다시 확인해주세요.
            </span>
          </div>
        ) : null}
      </form>
    </Card>
  );
}
