"use client";

import { PASSWORD_MIN_LENGTH } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginType } from "./schema";
import { logIn } from "./actions";
import ErrorText from "@/components/errorText";

export default function LogIn() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const onValid = async (data: LoginType) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);

    const result = await logIn(formData);

    if (result?.type === "checkEmail") {
      setError("email", { message: result.error });
    }

    if (result?.type === "password") {
      setError("password", { message: result.error });
    }
    setLoading(false);
  };

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
      <div className="w-full max-w-md">
        <Card className="pb-4 shadow-md">
          <CardHeader>
            <CardTitle>로그인</CardTitle>
          </CardHeader>
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col gap-3 px-4"
          >
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
            <Button
              disabled={loading}
              className=" disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
            >
              로그인
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
