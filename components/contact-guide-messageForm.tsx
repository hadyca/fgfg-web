"use client";

import { useRef, useState } from "react";
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
  const messageChannel = useRef<RealtimeChannel>();
  const otherUserChannel = useRef<RealtimeChannel>();

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
    const chatRoom = await createChatRoom(formData, guideId);
    if (!chatRoom) {
      toast({
        variant: "destructive",
        title: "현재 활동을 잠시 중단한 가이드 입니다.",
      });
      return;
    }

    messageChannel.current = supabase.channel(`room-${chatRoom.id}`);
    otherUserChannel.current = supabase.channel(`user-${chatRoom.otherUserId}`);
    const newMessage = {
      id: Date.now(),
      payload: data.payload,
      createdAt: new Date().toISOString(),
      user: {
        id: userId,
        username,
        avatar,
      },
      isMyMessage: true,
    };
    //상대방 채팅방에 전달 하는 정보
    messageChannel.current?.send({
      type: "broadcast",
      event: "message",
      payload: newMessage,
    });

    otherUserChannel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        chatRoomId: chatRoom.id,
        message: data.payload,
        createdAt: newMessage.createdAt,
        usernameOrFullname: username,
        isRead: false,
      },
    });
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
