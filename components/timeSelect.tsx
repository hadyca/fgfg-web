"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface TimeSelectProps {
  onChange: (value: string) => void; // 'onChange' 함수는 문자열을 매개변수로 받고 반환 값이 없습니다.
}

export default function TimeSelect({ onChange }: TimeSelectProps) {
  const [selectedTime, setSelectedTime] = useState("00:00");

  const generateTimes = (): string[] => {
    const times: string[] = [];
    for (let hour = 0; hour < 24; hour++) {
      const hourString = hour.toString().padStart(2, "0"); // 시간을 두 자리 숫자로 포맷
      times.push(`${hourString}:00`);
      times.push(`${hourString}:30`);
    }
    return times;
  };

  const times = generateTimes();

  const handleChange = (value: string): void => {
    setSelectedTime(value);
    onChange(value);
  };

  return (
    <Select defaultValue="00:00" onValueChange={handleChange}>
      <SelectTrigger className="w-full md:w-auto px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {times.map((time) => (
            <SelectItem key={time} value={time}>
              {time}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
