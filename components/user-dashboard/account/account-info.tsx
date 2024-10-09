"use client";

import { getUploadUrl } from "@/app/(main)/signup-guide/actions";
import {
  usernameSchema,
  UsernameType,
} from "@/app/(main)/user-dashboard/(dashboard)/account/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import AvatarForm from "./avatarForm";

interface AccountInfoProps {
  avatar: string;
  username: string;
  email: string;
}

export default function AccountInfo({
  avatar,
  username,
  email,
}: AccountInfoProps) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<UsernameType>({
    resolver: zodResolver(usernameSchema),
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr]">
      <div>
        <AvatarForm avatar={avatar} />
        <div>
          <div>유저이름</div>
          <div className="flex flex-row justify-between">
            <span>{username}</span>
            <span>수정</span>
          </div>
        </div>
      </div>
      <div>
        <Card>
          <div>카드다</div>
        </Card>
      </div>
    </div>
  );
}
