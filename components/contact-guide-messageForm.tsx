"use client";

import { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactGuideSchema,
  ContactGuideType,
} from "@/app/[locale]/(main)/contact-guide/[guideId]/schema";
import ErrorText from "./errorText";
import { createChatRoom } from "@/app/[locale]/(main)/contact-guide/[guideId]/actions";
import { RealtimeChannel } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useToast } from "./hooks/use-toast";

interface ContactGuideFormProps {
  guideId: number;
  userId: number;
  username: string;
  avatar: string;
}

export default function ContactGuideForm({
  guideId,
  userId,
  username,
  avatar,
}: ContactGuideFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const otherUserChannel = useRef<RealtimeChannel | undefined>();

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
    const { ok, error, chatRoom, messageId } = await createChatRoom(
      formData,
      guideId
    );
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
      return;
    }

    otherUserChannel.current = supabase.channel(`user-${chatRoom.otherUserId}`);

    if (otherUserChannel.current) {
      otherUserChannel.current.send({
        type: "broadcast",
        event: "message",
        payload: {
          id: messageId,
          chatRoomId: chatRoom.id,
          message: data.payload,
          user: {
            id: userId,
            username,
            avatar,
          },
          isMyMessage: true,
          createdAt: new Date().toISOString(),
          avatar,
          usernameOrFullname: username,
          isRead: false,
        },
      });
    }

    router.push(`/chat-room/${chatRoom.id}`);
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
