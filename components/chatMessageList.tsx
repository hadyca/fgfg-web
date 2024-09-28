"use client";

import { useEffect, useRef, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowUpCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  saveMessage,
  updateIsRead,
} from "@/app/(main)/chat-room/[chatRoomId]/actions";
import { supabase } from "@/lib/supabaseClient";
import { DateTime } from "luxon";
import { useChatRoomStore } from "@/store/useChatRoomStore";
import { GetMessageSkeleton } from "@/app/(main)/chat-room/[chatRoomId]/skeleton";

interface ChatMessageListProps {
  otherUserId: number;
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string;
}

export default function ChatMessageList({
  otherUserId,
  userId,
  chatRoomId,
  username,
  avatar,
}: ChatMessageListProps) {
  const [message, setMessage] = useState("");
  const messageChannel = useRef<RealtimeChannel>();
  const otherUserChannel = useRef<RealtimeChannel>();

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
  const setMessages = useChatRoomStore((state) => state.setMessages);

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

    setMessages(chatRoomId, [...currentRoomMessages, newMessage]);

    //상대방 채팅방에 전달 받는 정보
    messageChannel.current?.send({
      type: "broadcast",
      event: "message",
      payload: newMessage,
    });
    await saveMessage(chatRoomId, message);
    setMessage("");

    otherUserChannel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        chatRoomId,
        message,
        createdAt: newMessage.createdAt,
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

    //채팅방 채널 구독 (채팅방 실시간용)
    messageChannel.current = supabase.channel(`room-${chatRoomId}`);
    messageChannel.current
      .on("broadcast", { event: "message" }, (payload) => {
        const receivedMessage = {
          id: payload.payload.id,
          payload: payload.payload.payload,
          createdAt: payload.payload.createdAt,
          user: payload.payload.user,
          isMyMessage: false,
        };
        setMessages(chatRoomId, [...currentRoomMessages, receivedMessage]);
      })
      .subscribe();

    //상대 채널 구독
    otherUserChannel.current = supabase.channel(`user-${otherUserId}`);

    //
    const updateReadStatus = async () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView();
      }

      await updateIsRead(chatRoomId);
    };

    updateReadStatus();

    return () => {
      messageChannel.current?.unsubscribe();
      otherUserChannel.current?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId, messages, otherUserId]);

  return (
    <div className="flex flex-col w-full border-x">
      <div className="flex-grow overflow-y-auto p-4">
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
                      <span className="text-gray-500 text-sm bg-gray-200 px-3 py-1 rounded-full">
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
                        <AvatarImage
                          src={
                            message.user.avatar
                              ? `${message.user.avatar}/avatar`
                              : ""
                          }
                          alt="avatar"
                        />
                        <AvatarFallback>
                          <UserCircleIcon className="text-primary" />
                        </AvatarFallback>
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
                        } p-2.5 rounded-md`}
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
      <div className="relative">
        <form className="flex px-5 pb-3 pt-2 border-t" onSubmit={onSubmit}>
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
