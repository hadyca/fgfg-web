"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactGuideSchema,
  ContactGuideType,
} from "@/app/(main)/contact-guide/[guideId]/schema";
import ErrorText from "./errorText";
import { createChatRoom } from "@/app/(main)/contact-guide/[guideId]/actions";

interface ContactGuideFormProps {
  guideId: number;
}

export default function ContactGuideForm({ guideId }: ContactGuideFormProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactGuideType>({
    resolver: zodResolver(contactGuideSchema),
  });

  const onValid = async (data: ContactGuideType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("payload", data.payload);
    await createChatRoom(formData, guideId);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div>
        <div className="text-xl mb-3">
          궁금하신 사항이 있나요? 가이드에게 메시지 보내기
        </div>
        {errors?.payload ? <ErrorText text={errors.payload.message!} /> : null}
        <Textarea id="payload" {...register("payload")} required />
        <Button disabled={loading} className="mt-3">
          메시지 전송하기
        </Button>
      </div>
    </form>
  );
}
