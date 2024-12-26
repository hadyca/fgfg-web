"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  birthdateSchema,
  BirthdateType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateBirthdate } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import { useTranslations } from "next-intl";

interface BirthdateFormProps {
  birthdate: string;
}

export default function BirthdateForm({ birthdate }: BirthdateFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BirthdateType>({
    resolver: zodResolver(birthdateSchema(t)),
    defaultValues: {
      birthdate,
    },
  });

  const onValid = async (data: BirthdateType) => {
    if (birthdate === data.birthdate) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("birthdate", data.birthdate);

    const { ok, error } = await updateBirthdate(formData);

    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      toast({
        description: t("profile.changeSuccess"),
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">{t("profile.birthdate")}</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-36"
          type="date"
          {...register("birthdate")}
          required
        />
        <Button disabled={loading}>
          {loading ? t("profile.loading") : t("profile.save")}
        </Button>
      </div>
      {errors?.birthdate ? (
        <ErrorText text={errors.birthdate.message!} />
      ) : null}
    </form>
  );
}
