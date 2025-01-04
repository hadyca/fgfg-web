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
import { useLocale, useTranslations } from "next-intl";
import { PERSONALITY_OPTIONS } from "@/lib/constants";
import { LoadingOverlay } from "@/components/loading-overlay";

interface PersonalityFormProps {
  personality: string;
}

export default function PersonalityForm({ personality }: PersonalityFormProps) {
  const locale = useLocale();
  const t = useTranslations();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PersonalityType>({
    resolver: zodResolver(personalitySchema(t)),
    defaultValues: {
      personality: personality as PersonalityType["personality"],
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
      setLoading(false);
    } else {
      toast({
        description: t("profile.changeSuccess"),
      });
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      {loading && <LoadingOverlay />}
      <div className="font-semibold mb-2">{t("profile.personality")}</div>
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
              {t("profile.selectPersonality")}
            </option>
            {PERSONALITY_OPTIONS.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="text-black"
              >
                {option[locale as keyof typeof option]}
              </option>
            ))}
          </select>
        </div>
        <Button disabled={loading}>{t("profile.save")}</Button>
      </div>
      {errors?.personality ? (
        <ErrorText text={errors.personality.message!} />
      ) : null}
    </form>
  );
}
