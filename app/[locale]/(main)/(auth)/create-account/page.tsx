"use client";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createAccountSchema, CreateAccountType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "./actions";
import ErrorText from "@/components/errorText";
import { Link } from "@/i18n/routing";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";
import { LoadingOverlay } from "@/components/loading-overlay";

export default function CreateAccount() {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateAccountType>({
    resolver: zodResolver(createAccountSchema(t)),
  });

  const onValid = async (data: CreateAccountType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.password);

    const result = await createAccount(formData);
    if (result?.type === "checkUsername") {
      setError("username", { message: result.error });
      setLoading(false);
    }
    if (result?.type === "checkEmail") {
      setError("email", { message: result.error });
      setLoading(false);
    }
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      {loading && <LoadingOverlay />}
      <Card className="w-full max-w-md pb-4 shadow-md">
        <CardHeader>
          <CardTitle>{t("createAccount.createAccount")}</CardTitle>
        </CardHeader>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-3 px-7"
        >
          <Input
            type="text"
            placeholder={t("createAccount.username")}
            minLength={1}
            maxLength={30}
            {...register("username")}
            required
          />
          {errors?.username ? (
            <ErrorText text={errors.username.message!} />
          ) : null}
          <Input
            type="email"
            placeholder={t("createAccount.email")}
            {...register("email")}
            required
          />
          {errors?.email ? <ErrorText text={errors.email.message!} /> : null}
          <Input
            type="password"
            placeholder={t("createAccount.password")}
            minLength={PASSWORD_MIN_LENGTH}
            {...register("password")}
            required
          />
          {errors?.password ? (
            <ErrorText text={errors.password.message!} />
          ) : null}
          <Input
            type="password"
            placeholder={t("createAccount.confirmPassword")}
            minLength={PASSWORD_MIN_LENGTH}
            {...register("confirmPassword")}
            required
          />
          {errors?.confirmPassword ? (
            <ErrorText text={errors.confirmPassword.message!} />
          ) : null}
          <Button disabled={loading}>{t("createAccount.createAccount")}</Button>
          <Separator />
          <Link href={"/login"}>
            <Button className="w-full" variant={"secondary"}>
              {t("createAccount.alreadyHaveAccount")}
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
}
