"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  personalitySchema,
  PersonalityType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updatePersonality } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";

interface PersonalityFormProps {
  personality:
    | "귀엽고 발랄한"
    | "섹시하고 매혹적인"
    | "엉뚱하고 독특한"
    | "활발하고 명랑한"
    | "차분하고 따뜻한"
    | "친절하고 상냥한"
    | "긍정적이고 밝은"
    | "유머러스하고 재치있는"
    | "지적이고 신중한"
    | "매력적이고 세련된";
}

export default function PersonalityForm({ personality }: PersonalityFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalityType>({
    resolver: zodResolver(personalitySchema),
    defaultValues: {
      personality,
    },
  });

  const selectedPersonality = watch("personality");

  const onValid = async (data: PersonalityType) => {
    if (personality === data.personality) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("personality", data.personality);

    const { ok, error } = await updatePersonality(formData);
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
      <div className="font-semibold mb-2">성격</div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <select
            {...register("personality")}
            required
            value={selectedPersonality || ""}
            className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border p-3 rounded-md text-sm w-56 ${
              selectedPersonality ? "" : "text-muted-foreground"
            }`}
          >
            <option value="" disabled hidden>
              성격을 선택해주세요
            </option>
            <option value="귀엽고 발랄한" className="text-black">
              귀엽고 발랄한
            </option>
            <option value="섹시하고 매혹적인" className="text-black">
              섹시하고 매혹적인
            </option>
            <option value="엉뚱하고 독특한" className="text-black">
              엉뚱하고 독특한
            </option>
            <option value="활발하고 명랑한" className="text-black">
              활발하고 명랑한
            </option>
            <option value="차분하고 따뜻한" className="text-black">
              차분하고 따뜻한
            </option>
            <option value="친절하고 상냥한" className="text-black">
              친절하고 상냥한
            </option>
            <option value="긍정적이고 밝은" className="text-black">
              긍정적이고 밝은
            </option>
            <option value="유머러스하고 재치있는" className="text-black">
              유머러스하고 재치있는
            </option>
            <option value="지적이고 신중한" className="text-black">
              지적이고 신중한
            </option>
            <option value="매력적이고 세련된" className="text-black">
              매력적이고 세련된
            </option>
          </select>
        </div>
        <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
      </div>
      {errors?.personality ? (
        <ErrorText text={errors.personality.message!} />
      ) : null}
    </form>
  );
}
