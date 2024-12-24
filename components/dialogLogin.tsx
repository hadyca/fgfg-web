"use client";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "@/components/errorText";
import {
  loginSchema,
  LoginType,
} from "@/app/[locale]/(main)/(auth)/login/schema";
import { login } from "@/app/[locale]/(main)/(auth)/login/actions";
import { Separator } from "./ui/separator";
import { useTranslations } from "next-intl";

interface DialogLoginProps {
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  guideId: number;
  startTime?: string;
  endTime?: string;
}

export default function DialogLogin({
  setIsOpenLogin,
  guideId,
  startTime,
  endTime,
}: DialogLoginProps) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema(t)),
  });

  const onValid = async (data: LoginType) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    const redirect =
      startTime && endTime
        ? `/guide-profile/${guideId}?starttime=${encodeURIComponent(
            startTime
          )}&endtime=${encodeURIComponent(endTime)}`
        : `/guide-profile/${guideId}`;

    const result = await login(formData, redirect);

    if (result?.type === "checkEmail") {
      setError("email", { message: result.error });
    }

    if (result?.type === "password") {
      setError("password", { message: result.error });
    }
    setLoading(false);
  };

  return (
    <Card className="w-full max-w-md pb-4 shadow-none border-none">
      <CardHeader>
        <CardTitle>{t("guideProfile.login")}</CardTitle>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col gap-3 px-7"
      >
        <Input
          type="email"
          placeholder={t("guideProfile.email")}
          {...register("email")}
          required
        />
        {errors?.email ? <ErrorText text={errors.email.message!} /> : null}
        <Input
          type="password"
          placeholder={t("guideProfile.password")}
          minLength={PASSWORD_MIN_LENGTH}
          {...register("password")}
          required
        />
        {errors?.password ? (
          <ErrorText text={errors.password.message!} />
        ) : null}
        <Button disabled={loading}>{t("guideProfile.login")}</Button>
        <Separator />
        <Button variant={"secondary"} onClick={() => setIsOpenLogin(false)}>
          {t("guideProfile.noAccount")}
        </Button>
      </form>
    </Card>
  );
}
