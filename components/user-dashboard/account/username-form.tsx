"use client";

import { updateUsername } from "@/app/[locale]/(main)/user-dashboard/account/actions";
import {
  usernameSchema,
  UsernameType,
} from "@/app/[locale]/(main)/user-dashboard/account/schema";
import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";

interface UsernameFormProps {
  username: string;
}

export default function UsernameForm({ username }: UsernameFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UsernameType>({
    resolver: zodResolver(usernameSchema(t)),
    defaultValues: {
      username,
    },
  });

  const onValid = async (data: UsernameType) => {
    if (username === data.username) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);

    const result = await updateUsername(formData);

    if (result?.type === "checkUsername") {
      setError("username", { message: result.error });
    } else if (!result.ok) {
      toast({
        variant: "destructive",
        title: result.error,
      });
    } else {
      toast({
        description: t("account.changeSuccess"),
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">{t("account.username")}</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-2/3"
          type="text"
          placeholder={t("account.username")}
          minLength={1}
          maxLength={30}
          {...register("username")}
          required
        />
        <Button disabled={loading}>
          {loading ? t("account.loading") : t("account.save")}
        </Button>
      </div>
      {errors?.username ? <ErrorText text={errors.username.message!} /> : null}
    </form>
  );
}
