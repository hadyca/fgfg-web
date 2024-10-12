"use client";

import { updatePassword } from "@/app/(main)/user-dashboard/account/actions";
import {
  passwordSchema,
  PasswordType,
} from "@/app/(main)/user-dashboard/account/schema";
import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function PasswordForm() {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<PasswordType>({
    resolver: zodResolver(passwordSchema),
  });

  const onValid = async (data: PasswordType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("newPassword", data.newPassword);
    formData.append("confirmPassword", data.confirmPassword);

    const result = await updatePassword(formData);

    if (result?.type === "checkPassword") {
      setError("password", { message: result.error });
    } else {
      toast({
        description: "변경 되었습니다.",
      });
      reset();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">비밀번호</div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <div className="text-sm mb-2">현재 비밀번호</div>
          <Input
            className="w-2/3"
            type="password"
            minLength={PASSWORD_MIN_LENGTH}
            {...register("password")}
            required
          />
          {errors?.password ? (
            <ErrorText text={errors.password.message!} />
          ) : null}
        </div>
        <div className="flex flex-col">
          <div className="text-sm mb-2">새 비밀번호</div>
          <Input
            className="w-2/3"
            type="password"
            minLength={PASSWORD_MIN_LENGTH}
            {...register("newPassword")}
            required
          />
          {errors?.newPassword ? (
            <ErrorText text={errors.newPassword.message!} />
          ) : null}
        </div>

        <div className="flex flex-col">
          <div className="text-sm mb-2">비밀번호 확인</div>
          <div className="flex flex-row justify-between">
            <Input
              className="w-2/3"
              type="password"
              minLength={PASSWORD_MIN_LENGTH}
              {...register("confirmPassword")}
              required
            />
            <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
          </div>
          {errors?.confirmPassword ? (
            <ErrorText text={errors.confirmPassword.message!} />
          ) : null}
        </div>
      </div>
    </form>
  );
}
