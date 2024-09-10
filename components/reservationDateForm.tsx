"use client";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useEffect, useState } from "react";
import { subDays, format } from "date-fns";
import { searchGuideSchema, SearchGuideType } from "@/app/(main)/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ko } from "date-fns/locale";
import { reserveGuide } from "@/app/(main)/guide-profile/[id]/actions";

interface ReservationDateFormProps {
  searchParams?: { startTime: string; endTime: string };
}

export default function ReservationDateForm({
  searchParams,
}: ReservationDateFormProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

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

  const onValid = async (data: SearchGuideType) => {
    setLoading(true); // 로딩 시작

    // 폼 데이터를 FormData 객체로 변환
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);

    // 서버 함수 호출
    // await reserveGuide(formData, guideId);
    // await searchGuide(formData);
    setLoading(false);
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
  };

  const handleEndTimeChange = (value: string) => {
    setValue("endTime", value);
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
            <div className="flex flwx-row gap-3">
              <div>
                <Label className="block mb-2">픽업 시각</Label>
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
              <div>
                <Label className="block mb-2">종료 시각</Label>
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
                  <SelectContent>{endTimeOptions}</SelectContent>
                </Select>
              </div>
            </div>
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
          <Button disabled={loading}>예약하기</Button>
        </div>
      </form>
    </Card>
  );
}
