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
import { reportGuide } from "@/app/[locale]/(main)/guide-profile/[guideId]/actions";
import { useTranslations } from "next-intl";

interface ReportFormProps {
  guideId: number;
}
export default function ReportForm({ guideId }: ReportFormProps) {
  const t = useTranslations();
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
          <span>{t("guideProfile.reportGuide")}</span>
        </div>
      </DialogTrigger>
      <DialogContent>
        {!submitted ? (
          <>
            <DialogHeader>
              <DialogTitle>
                {t("guideProfile.reportGuideDescription")}
              </DialogTitle>
              <DialogDescription>
                {t("guideProfile.reportGuideDescription2")}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onValid)}>
              <div className="flex flex-col gap-3">
                <Textarea id="reason" {...register("reason")} required />
                <DialogFooter>
                  <Button disabled={loading}>
                    {loading
                      ? t("guideProfile.loading")
                      : t("guideProfile.submit")}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>{t("guideProfile.reportSuccess")}</DialogTitle>
              <DialogDescription>
                {t("guideProfile.reportSuccessDescription")}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>
                {t("guideProfile.confirm")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
