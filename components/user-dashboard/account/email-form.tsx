"use client";

import { updateEmail } from "@/app/(main)/user-dashboard/account/actions";
import {
  emailSchema,
  EmailType,
} from "@/app/(main)/user-dashboard/account/schema";
import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface EmailFormProps {
  email: string;
}

export default function EmailForm({ email }: EmailFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EmailType>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email,
    },
  });

  const onValid = async (data: EmailType) => {
    if (email === data.email) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("email", data.email);

    const result = await updateEmail(formData);

    if (result?.type === "checkEmail") {
      setError("email", { message: result.error });
    } else {
      toast({
        description: "변경 되었습니다.",
      });
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">이메일</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-2/3"
          type="email"
          placeholder="이메일"
          {...register("email")}
          required
        />
        <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
      </div>
      {errors?.email ? <ErrorText text={errors.email.message!} /> : null}
    </form>
  );
}
