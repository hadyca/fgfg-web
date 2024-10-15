"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  heightSchema,
  HeightType,
} from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateHeight } from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";

interface HeightFormProps {
  height: string;
}

export default function HeightForm({ height }: HeightFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HeightType>({
    resolver: zodResolver(heightSchema),
    defaultValues: {
      height,
    },
  });

  const onValid = async (data: HeightType) => {
    if (height === data.height) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("height", data.height);

    const { ok, error } = await updateHeight(formData);

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
      <div className="font-semibold mb-2">키</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-36"
          type="number"
          {...register("height")}
          required
        />
        <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
      </div>
      {errors?.height ? <ErrorText text={errors.height.message!} /> : null}
    </form>
  );
}
