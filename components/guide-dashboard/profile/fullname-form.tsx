"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  fullnameSchema,
  FullnameType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateFullname } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";

interface FullnameFormProps {
  fullname: string;
}

export default function FullnameForm({ fullname }: FullnameFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FullnameType>({
    resolver: zodResolver(fullnameSchema),
    defaultValues: {
      fullname,
    },
  });

  const onValid = async (data: FullnameType) => {
    if (fullname === data.fullname) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", data.fullname);

    const { ok, error } = await updateFullname(formData);

    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      toast({
        description: "변경 되었습니다.",
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">이름</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-2/3"
          type="text"
          minLength={1}
          maxLength={30}
          {...register("fullname")}
          required
        />
        <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
      </div>
      {errors?.fullname ? <ErrorText text={errors.fullname.message!} /> : null}
    </form>
  );
}
