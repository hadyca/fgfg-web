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
import { Separator } from "../ui/separator";
import { useTranslations } from "next-intl";

interface ReservationLoginProps {
  setIsOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  guideId: number;
  startTime: string;
  endTime: string;
}

export default function ReservationLogin({
  setIsOpenLogin,
  guideId,
  startTime,
  endTime,
}: ReservationLoginProps) {
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

    const redirect = `/reservation/${guideId}?starttime=${encodeURIComponent(
      startTime
    )}&endtime=${encodeURIComponent(endTime)}`;

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
    <Card className="w-full max-w-md pb-4">
      <CardHeader>
        <CardTitle>{t("reservation.login")}</CardTitle>
      </CardHeader>
      <form
        onSubmit={handleSubmit(onValid)}
        className="flex flex-col gap-3 px-7"
      >
        <Input
          type="email"
          placeholder={t("reservation.email")}
          {...register("email")}
          required
        />
        {errors?.email ? <ErrorText text={errors.email.message!} /> : null}
        <Input
          type="password"
          placeholder={t("reservation.password")}
          minLength={PASSWORD_MIN_LENGTH}
          {...register("password")}
          required
        />
        {errors?.password ? (
          <ErrorText text={errors.password.message!} />
        ) : null}
        <Button disabled={loading}>{t("reservation.login")}</Button>
        <Separator />
        <Button variant={"secondary"} onClick={() => setIsOpenLogin(false)}>
          {t("reservation.noAccount")}
        </Button>
      </form>
    </Card>
  );
}
