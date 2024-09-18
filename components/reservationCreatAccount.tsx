"use client";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorText from "@/components/errorText";
import { Separator } from "@/components/ui/separator";
import {
  createAccountSchema,
  CreateAccountType,
} from "@/app/(main)/(auth)/create-account/schema";
import { createAccount } from "@/app/(main)/(auth)/create-account/actions";
import DialogLogin from "./dialogLogin";
import ReservationLogin from "./reservationLogin";

interface ReservationCreateAccountProps {
  guideId: number;
  startTime: string;
  endTime: string;
}

export default function ReservationCreateAccount({
  guideId,
  startTime,
  endTime,
}: ReservationCreateAccountProps) {
  const [loading, setLoading] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
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
    formData.append("confirm_password", data.password);
    const redirect = `/reservation/${guideId}?starttime=${encodeURIComponent(
      startTime
    )}&endtime=${encodeURIComponent(endTime)}`;

    const result = await createAccount(formData, redirect);
    if (result?.type === "checkUsername") {
      setError("username", { message: result.error });
    }
    if (result?.type === "checkEmail") {
      setError("email", { message: result.error });
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      {!isOpenLogin ? (
        <Card className="w-full max-w-md pb-4">
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
              maxLength={10}
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
              {...register("confirm_password")}
              required
            />
            {errors?.confirm_password ? (
              <ErrorText text={errors.confirm_password.message!} />
            ) : null}
            <Button disabled={loading}>회원 가입</Button>
            <Separator />
            <Button
              onClick={() => setIsOpenLogin(true)}
              className="w-full"
              variant={"secondary"}
            >
              FGFG회원이신가요? 로그인
            </Button>
          </form>
        </Card>
      ) : (
        <ReservationLogin
          guideId={guideId}
          startTime={startTime}
          endTime={endTime}
        />
      )}
    </div>
  );
}
