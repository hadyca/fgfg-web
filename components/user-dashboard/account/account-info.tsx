"use client";

import { Card } from "@/components/ui/card";
import AvatarForm from "./avatar-form";
import UsernameForm from "./username-form";
import { Separator } from "@/components/ui/separator";
import EmailForm from "./email-form";
import PasswordForm from "./password-form";
import { EyeIcon } from "@heroicons/react/24/outline";
import DeleteAccountForm from "./deleteAccount-form";

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
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] pb-10">
      <div className="flex flex-col gap-10">
        <AvatarForm avatar={avatar} />
        <Separator />
        <UsernameForm username={username} />
        <Separator />
        <EmailForm email={email} />
        <Separator />
        <PasswordForm />
        <Separator />
        <DeleteAccountForm />
      </div>
      <Separator className="md:hidden my-10" />
      <div className="px-14">
        <Card className="p-6">
          <EyeIcon className="size-16" />
          <div className="text-lg font-semibold mb-2">
            다른 사람에게 어떤 정보가 공개되나요?
          </div>
          <div className="text-muted-foreground">
            유저명은 가이드와의 채팅 시 공개되며, 이메일은 공개되지 않습니다.
          </div>
        </Card>
      </div>
    </div>
  );
}
