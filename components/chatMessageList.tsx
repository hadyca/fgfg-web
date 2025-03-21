"use client";

import { useEffect, useRef, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowUpCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { saveMessage } from "@/app/[locale]/(main)/chat-room/[chatRoomId]/actions";
import { DateTime } from "luxon";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import BillsSkeleton, {
  GetMessageSkeleton,
} from "@/app/[locale]/(main)/chat-room/[chatRoomId]/skeleton";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import ChatRoomBill from "./chat-room-bill";
import { useToast } from "./hooks/use-toast";
import { useLocale, useTranslations } from "next-intl";

interface ChatMessageListProps {
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string;
  messageChannel: RealtimeChannel | undefined;
  otherUserChannel: RealtimeChannel | undefined;
}

export default function ChatMessageList({
  userId,
  chatRoomId,
  username,
  avatar,
  otherUserChannel,
}: ChatMessageListProps) {
  const locale = useLocale();
  const t = useTranslations();
  const { toast } = useToast();

  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 메시지 끝의 ref

  const { setChatRoom, setMessages, messages, initialMessagesLoading } =
    useChatRoomStore();

  const isInitialMessagesLoading = initialMessagesLoading[chatRoomId] ?? true;
  const currentRoomMessages = messages[chatRoomId] || [];
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newMessage = {
      id: Date.now(),
      payload: message,
      createdAt: new Date().toISOString(),
      user: {
        id: userId,
        username,
        avatar,
      },
      isMyMessage: true,
    };

    setMessage("");
    setMessages(chatRoomId, [newMessage]);
    setChatRoom(chatRoomId, message, newMessage.createdAt, true);

    const { ok, error, messageId } = await saveMessage(chatRoomId, message);
    if (!ok) {
      toast({
        description: error,
      });
      return;
    }
    otherUserChannel?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: messageId,
        chatRoomId,
        message,
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
  };

  // 날짜 헤더 표시 함수
  const formatDateForHeader = (date: string, locale: string) => {
    const formattedDate = DateTime.fromISO(date)
      .setLocale(locale === "ko" ? "ko" : locale === "vn" ? "vi" : "en")
      .toLocaleString({
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    return formattedDate;
  };

  // 메시지 시간 표시 함수 (오전/오후, 시간/분)
  const formatTimeForMessage = (date: string, locale: string) => {
    return DateTime.fromISO(date)
      .setLocale(locale === "ko" ? "ko" : locale === "vn" ? "vi" : "en")
      .toLocaleString(DateTime.TIME_SIMPLE);
  };

  // 처음 렌더링 시 스크롤을 맨 아래로 이동 + 내 화면 isRead를 true로 처리
  useEffect(() => {
    if (!isInitialMessagesLoading) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView();
        }
      }, 100);
    }
  }, [isInitialMessagesLoading, chatRoomId]); // 상태 값만 참조하도록 함

  //채팅 입력 후, 화면 아래로 스크롤
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-full md:border-l h-full">
      <div className="sticky top-0 bg-white px-5 py-3 border-b z-10">
        <div className="flex justify-end">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary" className="rounded-full">
                {t("chatRoom.viewReservation")}
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-2/3">
              {isInitialMessagesLoading ? (
                <BillsSkeleton />
              ) : (
                <ChatRoomBill chatRoomId={chatRoomId} />
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="h-full py-4 px-5 overflow-y-auto">
        {isInitialMessagesLoading ? (
          <GetMessageSkeleton />
        ) : (
          <>
            {currentRoomMessages.map((message, index) => {
              const currentMessageDate = DateTime.fromISO(
                message.createdAt
              ).toFormat("yyyy-MM-dd");
              const previousMessageDate =
                index > 0
                  ? DateTime.fromISO(
                      currentRoomMessages[index - 1].createdAt
                    ).toFormat("yyyy-MM-dd")
                  : null;

              const showDateHeader = previousMessageDate !== currentMessageDate;

              return (
                <div key={`${message.id}-${index}`}>
                  {showDateHeader && (
                    <div className="text-center my-4">
                      <span className="text-secondary-foreground text-sm bg-secondary px-3 py-1 rounded-full">
                        {formatDateForHeader(message.createdAt, locale)}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex gap-2 items-start ${
                      message.isMyMessage ? "justify-end" : ""
                    }`}
                  >
                    {!message.isMyMessage && (
                      <Avatar>
                        {message.user.avatar ? (
                          <>
                            <AvatarImage
                              src={`${message.user.avatar}/avatar`}
                              alt="@shadcn"
                            />
                            <AvatarFallback>
                              <UserCircleIcon className="text-primary w-full h-full" />
                            </AvatarFallback>
                          </>
                        ) : (
                          <UserCircleIcon className="text-primary w-full h-full" />
                        )}
                      </Avatar>
                    )}
                    <div
                      className={`flex flex-col gap-1 ${
                        message.isMyMessage ? "items-end pl-36" : "pr-36"
                      }`}
                    >
                      <span
                        className={`${
                          message.isMyMessage
                            ? "bg-primary text-primary-foreground"
                            : "bg-neutral-100"
                        } p-2.5 rounded-md whitespace-pre-wrap`}
                      >
                        {message.payload}
                      </span>
                      <span className="text-xs">
                        {formatTimeForMessage(message.createdAt, locale)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="relative p-5">
        <form className="flex" onSubmit={onSubmit}>
          <input
            required
            onChange={onChange}
            value={message}
            disabled={isInitialMessagesLoading}
            className="rounded-full w-full h-10 border border-neutral-300 px-5 placeholder:text-neutral-400 focus:outline-none"
            type="text"
            name="message"
            placeholder="Write a message..."
          />
          <button
            className="absolute right-5"
            disabled={isInitialMessagesLoading}
          >
            <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
          </button>
        </form>
      </div>
    </div>
  );
}
