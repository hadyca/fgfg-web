"use client";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginType } from "./schema";
import ErrorText from "@/components/errorText";
import { login } from "./actions";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LoadingOverlay } from "@/components/loading-overlay";

export default function LogIn() {
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
    formData.append("confirmPassword", data.password);

    const result = await login(formData);

    if (result?.type === "checkEmail") {
      setError("email", { message: result.error });
      setLoading(false);
    }

    if (result?.type === "password") {
      setError("password", { message: result.error });
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      {loading && <LoadingOverlay />}
      <Card className="w-full max-w-md pb-4 shadow-md">
        <CardHeader>
          <CardTitle>{t("login.login")}</CardTitle>
        </CardHeader>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-3 px-7"
        >
          <Input
            type="email"
            placeholder={t("login.email")}
            {...register("email")}
            required
          />
          {errors?.email ? <ErrorText text={errors.email.message!} /> : null}
          <Input
            type="password"
            placeholder={t("login.password")}
            minLength={PASSWORD_MIN_LENGTH}
            {...register("password")}
            required
          />
          {errors?.password ? (
            <ErrorText text={errors.password.message!} />
          ) : null}
          <Button disabled={loading}>{t("login.login")}</Button>
          <Separator />
          <Link href={"/create-account"}>
            <Button className="w-full" variant={"secondary"}>
              {t("login.signup")}
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
}
