"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";
import { updateIsActive } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";

interface IsActiveFormProps {
  isActive: boolean;
}

export default function IsActiveForm({
  isActive: originIsActive,
}: IsActiveFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(originIsActive);

  const handleActive = async (isActive: boolean) => {
    setLoading(true);
    const { ok, error } = await updateIsActive(isActive);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      setIsActive(isActive);
      toast({
        description: "변경 되었습니다.",
      });
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="font-semibold mb-2">가이드 활동 일시 정지</div>
      <div className="flex flex-row justify-between items-center">
        <span>언제든 편하실 때 가이드 활동을 다시 시작해보세요! 🥰</span>
        <Button disabled={loading} onClick={() => handleActive(!isActive)}>
          {loading ? "로딩 중" : isActive ? "활동 정지" : "활동 시작"}
        </Button>
      </div>
    </div>
  );
}
