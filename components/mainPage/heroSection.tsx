"use client";
import { useFormState } from "react-dom";
import Button from "../ui/button";
import { getGuides } from "@/app/actions";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [state, action] = useFormState(getGuides, null);
  const [today, setToday] = useState("");

  useEffect(() => {
    const current = new Date();
    const currentDate = current.toISOString().split("T")[0];
    setToday(currentDate);
  }, []);

  useEffect(() => {
    alert("날짜와 시간을 다시 확인 하세요.");
  }, [state?.fieldErrors]);

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
          action={action}
          className="bg-white p-6 rounded-lg shadow-xl border border-gray-200 gap-6 w-max"
        >
          <div className="flex flex-row gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                픽업 날짜
              </label>
              <input
                type="date"
                name="date"
                min={today}
                defaultValue={today}
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                픽업 시각
              </label>
              <select
                name="startTime"
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="06:00">06:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                종료 시각
              </label>
              <select
                name="endTime"
                className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="09:00">09:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="18:00">06:00 PM</option>
                <option value="21:00">09:00 PM</option>
              </select>
            </div>
          </div>
          <Button text="검색하기" />
        </form>
      </div>
    </section>
  );
}
