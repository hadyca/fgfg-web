"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  addressSchema,
  AddressType,
} from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateAddress } from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";

interface AddressFormProps {
  address: string;
}

export default function AddressForm({ address }: AddressFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressType>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address,
    },
  });

  const onValid = async (data: AddressType) => {
    if (address === data.address) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("address", data.address);

    const { ok, error } = await updateAddress(formData);

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
      <div className="font-semibold mb-2">거주지 주소</div>
      <div className="flex flex-row justify-between items-center">
        <Input
          className="w-2/3"
          type="text"
          {...register("address")}
          required
        />
        <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
      </div>
      {errors?.address ? <ErrorText text={errors.address.message!} /> : null}
    </form>
  );
}
