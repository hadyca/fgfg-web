"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  guideIntroSchema,
  GuideIntroType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateGuideIntro } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import { Textarea } from "@/components/ui/textarea";

interface GuideIntroFormProps {
  guideIntro: string;
}

export default function GuideIntroForm({ guideIntro }: GuideIntroFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GuideIntroType>({
    resolver: zodResolver(guideIntroSchema),
    defaultValues: {
      guideIntro,
    },
  });

  const onValid = async (data: GuideIntroType) => {
    if (guideIntro === data.guideIntro) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("guideIntro", data.guideIntro);

    const { ok, error } = await updateGuideIntro(formData);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      toast({
        description: "변경 되었습니다.",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">가이드 소개</div>
      <div className="flex flex-col items-end">
        <Textarea {...register("guideIntro")} required />
        {errors?.guideIntro ? (
          <ErrorText text={errors.guideIntro.message!} />
        ) : null}
        <Button className="mt-3" disabled={loading}>
          {loading ? "로딩 중" : "저장"}
        </Button>
      </div>
    </form>
  );
}
