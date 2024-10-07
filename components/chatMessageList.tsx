"use client";

import { useEffect, useRef, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowUpCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  saveMessage,
  updateIsRead,
} from "@/app/(main)/chat-room/[chatRoomId]/actions";
import { DateTime } from "luxon";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { GetMessageSkeleton } from "@/app/(main)/chat-room/[chatRoomId]/skeleton";
import { Drawer, DrawerContent, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import ChatRoomBill from "./chat-room-bill";

interface Bills {
  id: number;
  startTime: string;
  endTime: string;
  guideConfirm: boolean;
}

interface ChatMessageListProps {
  otherUserId: number;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string;
  bills: Bills[];
  messageChannel: RealtimeChannel | undefined;
  otherUserChannel: RealtimeChannel | undefined;
}

export default function ChatMessageList({
  userId,
  chatRoomId,
  username,
  avatar,
  bills,
  messageChannel,
  otherUserChannel,
}: ChatMessageListProps) {
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 메시지 끝의 ref

  const updateLastMessageInRoom = useChatRoomStore(
    (state) => state.updateLastMessageInRoom
  );
  const updateIsReadInRoom = useChatRoomStore(
    (state) => state.updateIsReadInRoom
  );

  const initialMessagesLoading = useChatRoomStore(
    (state) => state.initialMessagesLoading
  );
  const messages = useChatRoomStore((state) => state.messages);

  const currentRoomMessages = messages[chatRoomId] || [];
  const currentRoomLoading = initialMessagesLoading[chatRoomId] ?? true; // 기본적으로 로딩 상태는 true

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

    //상대방 채팅방에 전달 하는 정보
    messageChannel?.send({
      type: "broadcast",
      event: "message",
      payload: newMessage,
    });
    await saveMessage(chatRoomId, message);

    otherUserChannel?.send({
      type: "broadcast",
      event: "message",
      payload: {
        chatRoomId,
        message,
        createdAt: newMessage.createdAt,
        avatar,
        usernameOrFullname: username,
        isRead: false,
      },
    });
    updateLastMessageInRoom(chatRoomId, message, newMessage.createdAt);
  };

  // 날짜 헤더 표시 함수
  const formatDateForHeader = (date: string) => {
    const formattedDate = DateTime.fromISO(date).toLocaleString({
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  };

  // 메시지 시간 표시 함수 (오전/오후, 시간/분)
  const formatTimeForMessage = (date: string) => {
    return DateTime.fromISO(date).toLocaleString(DateTime.TIME_SIMPLE);
  };

  // 처음 렌더링 시 스크롤을 맨 아래로 이동
  useEffect(() => {
    setTimeout(() => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }
    }, 100);
  }, []);

  useEffect(() => {
    updateIsReadInRoom(chatRoomId, true);

    //
    const updateReadStatus = async () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }

      await updateIsRead(chatRoomId);
    };

    updateReadStatus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId, messages]);

  return (
    <div className="flex flex-col w-full md:border-l h-full">
      <div className="sticky top-0 bg-white px-5 py-3 border-b z-10">
        <div className="flex justify-end">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="secondary" className="rounded-full">
                예약 보기
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-1/2">
              {bills.length > 0 ? (
                <ChatRoomBill bills={bills} />
              ) : (
                <div className="flex justify-center items-center h-full">
                  예약 정보가 없습니다.
                </div>
              )}
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <div className="h-full py-4 px-5 overflow-y-auto">
        {currentRoomLoading ? (
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
                <div key={message.id}>
                  {showDateHeader && (
                    <div className="text-center my-4">
                      <span className="text-secondary-foreground text-sm bg-secondary px-3 py-1 rounded-full">
                        {formatDateForHeader(message.createdAt)}
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
                        {formatTimeForMessage(message.createdAt)}
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
            className="rounded-full w-full h-10 border border-neutral-300 px-5 placeholder:text-neutral-400 focus:outline-none"
            type="text"
            name="message"
            placeholder="Write a message..."
          />
          <button className="absolute right-5">
            <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
          </button>
        </form>
      </div>
    </div>
  );
}
