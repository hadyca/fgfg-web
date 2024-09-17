"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FlagIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { reportGuide } from "@/app/(main)/guide-profile/[guideId]/actions";

interface ReportFormProps {
  guideId: number;
}
export default function ReportForm({ guideId }: ReportFormProps) {
  const { register, handleSubmit, reset } = useForm();
  const [open, setOpen] = useState(false); // Dialog 상태 관리
  const [submitted, setSubmitted] = useState(false); // 제출 후 메시지 상태
  const [loading, setLoading] = useState(false);

  const onValid = async (data: any) => {
    setLoading(true);
    await reportGuide(guideId, data.reason);
    setLoading(false);
    setSubmitted(true);
    reset();
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(!open);
        setSubmitted(false);
      }}
    >
      <DialogTrigger asChild>
        <div className="flex gap-2 justify-center items-center text-muted-foreground text-sm underline cursor-pointer">
          <FlagIcon className="size-4" />
          <span>가이드 신고하기</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>가이드를 신고하시는 이유를 알려주세요.</DialogTitle>
              <DialogDescription>
                이 내용은 가이드가 볼 수 없습니다.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onValid)}>
              <div className="flex flex-col gap-3">
                <Textarea id="reason" {...register("reason")} required />
                <DialogFooter>
                  <Button disabled={loading}>
                    {loading ? "로딩 중" : "제출"}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>신고가 접수되었습니다.</DialogTitle>
              <DialogDescription>
                시간을 내어 알려주셔서 감사합니다. 좋은 서비스를 만드는데
                회원님의 신고가 큰 도움이 됩니다.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>확인</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
