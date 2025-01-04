"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  phoneSchema,
  PhoneType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updatePhone } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import { useTranslations } from "next-intl";
import { LoadingOverlay } from "@/components/loading-overlay";

interface PhoneFormProps {
  phone: string;
}

export default function PhoneForm({ phone }: PhoneFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneType>({
    resolver: zodResolver(phoneSchema(t)),
    defaultValues: {
      phone,
    },
  });

  const onValid = async (data: PhoneType) => {
    if (phone === data.phone) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("phone", data.phone);

    const { ok, error } = await updatePhone(formData);

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
      <div className="font-semibold mb-2">{t("profile.phone")}</div>
      <div className="flex flex-row justify-between items-center">
        <Input className="w-2/3" type="text" {...register("phone")} required />
        <Button disabled={loading}>{t("profile.save")}</Button>
      </div>
      {errors?.phone ? <ErrorText text={errors.phone.message!} /> : null}
    </form>
  );
}
