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
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function CreateAccount() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateAccountType>({
    resolver: zodResolver(createAccountSchema),
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
    }
    if (result?.type === "checkEmail") {
      setError("email", { message: result.error });
    }
    setLoading(false);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      <Card className="w-full max-w-md pb-4 shadow-md">
        <CardHeader>
          <CardTitle>회원 가입</CardTitle>
        </CardHeader>
        <form
          onSubmit={handleSubmit(onValid)}
          className="flex flex-col gap-3 px-7"
        >
          <Input
            type="text"
            placeholder="유저명"
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
            placeholder="이메일"
            {...register("email")}
            required
          />
          {errors?.email ? <ErrorText text={errors.email.message!} /> : null}
          <Input
            type="password"
            placeholder="비밀번호"
            minLength={PASSWORD_MIN_LENGTH}
            {...register("password")}
            required
          />
          {errors?.password ? (
            <ErrorText text={errors.password.message!} />
          ) : null}
          <Input
            type="password"
            placeholder="비밀번호 확인"
            minLength={PASSWORD_MIN_LENGTH}
            {...register("confirmPassword")}
            required
          />
          {errors?.confirmPassword ? (
            <ErrorText text={errors.confirmPassword.message!} />
          ) : null}
          <Button disabled={loading}>회원 가입</Button>
          <Separator />
          <Link href={"/login"}>
            <Button className="w-full" variant={"secondary"}>
              FGFG회원이신가요? 로그인
            </Button>
          </Link>
        </form>
      </Card>
    </div>
  );
}
