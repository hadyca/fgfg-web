"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";

export default function MainPopup() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const popupHideDate = localStorage.getItem("popupHideDate");
      const today = new Date().toDateString();

      if (popupHideDate === today) {
        setIsOpen(false);
      }
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleHideToday = () => {
    const today = new Date().toDateString();
    localStorage.setItem("popupHideDate", today);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="p-4">
          <div className="relative w-full aspect-[3/4] md:h-[500px]">
            <Image
              src={
                "https://imagedelivery.net/dGGUSNmPRJm6ENhe7q2fhw/1f2d5a74-9fc6-4f46-30e7-f4a46747df00/detail"
              }
              alt={"guide post"}
              className="object-contain md:object-cover"
              sizes="(max-width: 768px) 100vw, 500px"
              priority
              fill
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2 p-4">
          <button
            onClick={handleHideToday}
            className="text-sm text-gray-600 hover:text-gray-800"
          >
            오늘 하루 보지 않기
          </button>
          <Button onClick={handleClose}>닫기</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
