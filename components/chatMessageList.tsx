"use client";

import { useEffect, useRef, useState } from "react";
import { RealtimeChannel } from "@supabase/supabase-js";
import { formatToTimeAgo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ArrowUpCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import {
  saveMessage,
  updateIsRead,
} from "@/app/(main)/chat-room/[chatRoomId]/actions";
import { supabase } from "@/lib/supabaseClient";

interface User {
  id: number;
  avatar: string;
  username: string;
}

interface InitialChatMessages {
  id: number;
  payload: string;
  createdAt: string;
  user: User;
}

interface ChatMessageListProps {
  initialMessages: InitialChatMessages[];
  userId: number;
  chatRoomId: string;
  username: string;
  avatar: string;
}

export default function ChatMessageList({
  initialMessages,
  userId,
  chatRoomId,
  username,
  avatar,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const [formattedTimes, setFormattedTimes] = useState<string[]>([]);
  const channel = useRef<RealtimeChannel>();
  const messagesEndRef = useRef<HTMLDivElement | null>(null); // 메시지 끝의 ref

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    //서버에 send하기 전에 바로 내 화면에 보여주는 것
    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: Date.now(),
        payload: message,
        createdAt: new Date().toISOString(),
        user: {
          id: userId,
          username: "no need my username", //내화면이라 필요없음
          avatar: "no need my avatar", //내화면이라 필요없음
        },
      },
    ]);

    //상대방이 전달 받는 정보
    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        payload: message,
        created_at: new Date().toISOString(),
        user: {
          id: userId,
          username,
          avatar,
        },
      },
    });
    await saveMessage(chatRoomId, message);
    setMessage("");
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
    channel.current = supabase.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, (payload) => {
        setMessages((prevMsgs) => [...prevMsgs, payload.payload]);
      })
      .subscribe();
    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId]);

  useEffect(() => {
    // 비동기 함수 정의
    const updateReadStatus = async () => {
      const formatted = messages.map((message) =>
        formatToTimeAgo(message.createdAt)
      );
      setFormattedTimes(formatted);

      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }

      await updateIsRead(chatRoomId);
    };

    updateReadStatus();
  }, [messages, chatRoomId]);

  return (
    <div className="flex flex-col">
      <div className="flex-grow overflow-y-auto p-5">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex gap-2 items-start ${
              message.user.id === userId ? "justify-end" : ""
            }`}
          >
            {message.user.id === userId ? null : (
              <Avatar>
                <AvatarImage
                  src={`${message.user.avatar}/avatar`}
                  alt="fgfgavatar"
                />
                <AvatarFallback>
                  <UserCircleIcon className="text-primary" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={`flex flex-col gap-1 ${
                message.user.id === userId ? "items-end" : ""
              }`}
            >
              <span
                className={`${
                  message.user.id === userId
                    ? "bg-primary text-primary-foreground"
                    : "bg-neutral-100"
                } p-2.5 rounded-md`}
              >
                {message.payload}
              </span>
              <span className="text-xs">{formattedTimes[index]}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input 영역을 아래로 분리 */}
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
