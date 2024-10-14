"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  phoneSchema,
  PhoneType,
} from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updatePhone } from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";

interface PhoneFormProps {
  phone: string;
}

export default function PhoneForm({ phone }: PhoneFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneType>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone,
    },
  });

  const onValid = async (data: PhoneType) => {
    if (phone === data.phone) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("phone", data.phone);

    await updatePhone(formData);

    toast({
      description: "변경 되었습니다.",
    });

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">핸드폰 번호</div>
      <div className="flex flex-row justify-between items-center">
        <Input className="w-2/3" type="text" {...register("phone")} required />
        <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
      </div>
      {errors?.phone ? <ErrorText text={errors.phone.message!} /> : null}
    </form>
  );
}
