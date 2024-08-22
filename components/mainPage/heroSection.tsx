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

export default function HeroSection() {
  const [today, setToday] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm<SearchGuideType>({
    resolver: zodResolver(searchGuideSchema),
  });

  const currentDate = watch("date"); // 날짜 필드의 값을 관찰합니다.

  console.log(currentDate);

  useEffect(() => {
    const current = new Date();
    const today = current.toISOString().split("T")[0];
    setToday(today);
    setValue("date", today); // 폼 필드의 현재 값을 업데이트

    const savedFormData = localStorage.getItem("form-data");

    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);

      setValue("date", parsedData.date || today);

      const initialStartTime = parsedData.startTime || "09:00";
      setValue("startTime", initialStartTime);
      setStartTime(initialStartTime);

      const initialEndTime = parsedData.endTime || "12:00";
      setValue("endTime", initialEndTime);
      setEndTime(initialEndTime);
    }
  }, [setValue]);

  const onValid = async (data: SearchGuideType) => {
    setLoading(true); // 로딩 시작

    // 폼 데이터를 localStorage에 저장
    localStorage.setItem("form-data", JSON.stringify(data));

    // 폼 데이터를 FormData 객체로 변환
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);

    // 서버 함수 호출
    await searchGuide(formData);
    setLoading(false);
  };

  const startTimeOptions = Array.from({ length: 22 }, (_, i) => {
    const time = `${String(i).padStart(2, "0")}:00`;
    return (
      <SelectItem key={time} value={time}>
        {time}
      </SelectItem>
    );
  });

  const endTimeOptions = Array.from({ length: 22 }, (_, i) => {
    const time = `${String(i + 3).padStart(2, "0")}:00`;
    return (
      <SelectItem key={time} value={time}>
        {time}
      </SelectItem>
    );
  });
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false); // 날짜 선택 후 캘린더 닫기
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
        <div className="mt-6">
          <h1 className="text-2xl md:text-4xl font-bold text-white">
            외국인 여자친구 가이드와 함께 여행하세요
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 gap-6 w-max"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-row justify-center items-center gap-4">
              <div>
                <Label className="block mb-2">날짜 선택</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      // className={cn(
                      //   "w-[240px] pl-3 text-left font-normal",
                      //   !field.value && "text-muted-foreground"
                      // )}
                    >
                      {currentDate ? (
                        format(new Date(currentDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}

                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      // selected={field.value}
                      // onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
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
                <span className="text-red-500 font-medium">
                  최소 이용 시간은 3시간 입니다.
                </span>
              </div>
            ) : errors?.startTime || errors?.startTime || errors?.endTime ? (
              <div>
                <span className="text-red-500 font-medium">
                  날짜와 시간을 다시 확인해주세요.
                </span>
              </div>
            ) : null}
            <Button
              disabled={loading}
              className="w-full disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
            >
              검색하기
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
