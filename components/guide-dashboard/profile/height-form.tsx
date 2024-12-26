"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  heightSchema,
  HeightType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateHeight } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import { useTranslations } from "next-intl";

interface HeightFormProps {
  height: string;
}

export default function HeightForm({ height }: HeightFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeightType>({
    resolver: zodResolver(heightSchema(t)),
    defaultValues: {
      height,
    },
  });

  const onValid = async (data: HeightType) => {
    if (height === data.height) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("height", data.height);

    const { ok, error } = await updateHeight(formData);

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
      <div className="font-semibold mb-2">{t("profile.height")}</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-36"
          type="number"
          {...register("height")}
          required
        />
        <Button disabled={loading}>
          {loading ? t("profile.loading") : t("profile.save")}
        </Button>
      </div>
      {errors?.height ? <ErrorText text={errors.height.message!} /> : null}
    </form>
  );
}
