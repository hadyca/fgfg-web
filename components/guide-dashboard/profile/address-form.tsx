"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  addressSchema,
  AddressType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateAddress } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import { useTranslations } from "next-intl";

interface AddressFormProps {
  address: string;
}

export default function AddressForm({ address }: AddressFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressType>({
    resolver: zodResolver(addressSchema(t)),
    defaultValues: {
      address,
    },
  });

  const onValid = async (data: AddressType) => {
    if (address === data.address) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("address", data.address);

    const { ok, error } = await updateAddress(formData);

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
      <div className="font-semibold mb-2">{t("profile.address")}</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-2/3"
          type="text"
          {...register("address")}
          required
        />
        <Button disabled={loading}>
          {loading ? t("profile.loading") : t("profile.save")}
        </Button>
      </div>
      {errors?.address ? <ErrorText text={errors.address.message!} /> : null}
    </form>
  );
}
