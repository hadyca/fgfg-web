"use client";

import { updateUsername } from "@/app/(main)/user-dashboard/(dashboard)/account/actions";
import {
  usernameSchema,
  UsernameType,
} from "@/app/(main)/user-dashboard/(dashboard)/account/schema";
import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface UsernameFormProps {
  username: string;
}

export default function UsernameForm({ username }: UsernameFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<UsernameType>({
    resolver: zodResolver(usernameSchema),
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
    } else {
      toast({
        description: "유저명이 업데이트 되었습니다.",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">유저명</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-2/3"
          type="text"
          placeholder="유저명"
          minLength={1}
          maxLength={30}
          {...register("username")}
          required
        />
        <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
      </div>
      {errors?.username ? <ErrorText text={errors.username.message!} /> : null}
    </form>
  );
}
