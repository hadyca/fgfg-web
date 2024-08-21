"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchGuideSchema, SearchGuideType } from "@/app/(main)/schema";
import { Button } from "../ui/button";
import { searchGuide } from "@/app/(main)/actions";

export default function HeroSection() {
  const [today, setToday] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SearchGuideType>({
    resolver: zodResolver(searchGuideSchema),
  });

  useEffect(() => {
    const current = new Date();
    const currentDate = current.toISOString().split("T")[0];
    setToday(currentDate);
    setValue("date", currentDate); // 폼 필드의 값을 업데이트

    const savedFormData = localStorage.getItem("form-data");
    if (savedFormData) {
      const parsedData = JSON.parse(savedFormData);
      setValue("date", parsedData.date || currentDate);
      setValue("startTime", parsedData.startTime || "");
      setValue("endTime", parsedData.endTime || "");
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
      <option key={time} value={time}>
        {time}
      </option>
    );
  });

  const endTimeOptions = Array.from({ length: 22 }, (_, i) => {
    const time = `${String(i + 3).padStart(2, "0")}:00`;
    return (
      <option key={time} value={time}>
        {time}
      </option>
    );
  });

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
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  픽업 날짜
                </label>
                <input
                  type="date"
                  min={today}
                  {...register("date")}
                  className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  픽업 시각
                </label>
                <select
                  {...register("startTime")}
                  className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {startTimeOptions}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  종료 시각
                </label>
                <select
                  {...register("endTime")}
                  className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {endTimeOptions}
                </select>
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
                <span>날짜와 시간을 다시 확인해주세요.</span>
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
