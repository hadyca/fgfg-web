"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { searchGuideSchema, SearchGuideType } from "@/app/(main)/schema";
import { Button } from "../ui/button";
import { searchGuide } from "@/app/(main)/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
import { Calendar } from "../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ko } from "date-fns/locale";
import { subDays } from "date-fns";
import { Card } from "../ui/card";

export default function HeroSection() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedDateText, setSelectedDateText] = useState("");
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
    const today = format(new Date(), "yyyy-MM-dd");

    setSelectedDate(new Date());
    setSelectedDateText(today);
    setValue("date", format(new Date(), "yyyy-MM-dd"));

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
    <section
      className="relative h-[70vh] bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/6665776/pexels-photo-6665776.jpeg?auto=compress&cs=tinysrgb&w=1920&h=750&dpr=1')",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 text-center flex flex-col gap-4 items-center">
        <h1 className="text-xl md:text-5xl font-bold text-muted text-center my-4 md:mt-20">
          베트남 여자친구와 짜릿한 호치민 여행을 떠나보세요!
        </h1>
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
                        className={cn(
                          "hover:bg-white w-40 pl-3 text-left font-normal"
                        )}
                      >
                        <span>{watchDate}</span>
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
                  <Select
                    key={startTime}
                    onValueChange={handleStartTimeChange}
                    defaultValue={startTime}
                  >
                    <SelectTrigger className="w-36">
                      <SelectValue />
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
                    <SelectTrigger className="w-36">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>{endTimeOptions}</SelectContent>
                  </Select>
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
              <Button disabled={loading}>지금 예약하기</Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
}
