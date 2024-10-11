"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
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
import DialogLogin from "../dialogLogin";
import Link from "next/link";

interface CreateChatRoomBtnProps {
  userId?: number;
  guideId: number;
  startTime?: string;
  endTime?: string;
}

export default function CreateChatRoomBtn({
  userId,
  guideId,
  startTime,
  endTime,
}: CreateChatRoomBtnProps) {
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
    formData.append("confirmPassword", data.password);
    const redirect =
      startTime && endTime
        ? `/guide-profile/${guideId}?starttime=${encodeURIComponent(
            startTime
          )}&endtime=${encodeURIComponent(endTime)}`
        : `/guide-profile/${guideId}`;

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
    <>
      {userId ? (
        <Link href={`/contact-guide/${guideId}`}>
          <Button>가이드에게 메시지 보내기</Button>
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={() => setIsOpenLogin(false)}>
              가이드에게 메시지 보내기
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle hidden>회원 가입</DialogTitle>
            <DialogDescription hidden>
              회원 가입을 위해 아래 양식을 작성해주세요.
            </DialogDescription>
            <div className="flex justify-center items-center">
              {!isOpenLogin ? (
                <Card className="w-full max-w-md pb-4 shadow-none border-none">
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
                    {errors?.email ? (
                      <ErrorText text={errors.email.message!} />
                    ) : null}
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
                <DialogLogin
                  setIsOpenLogin={setIsOpenLogin}
                  guideId={guideId}
                  startTime={startTime}
                  endTime={endTime}
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
