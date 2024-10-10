"use client";

import { Card } from "@/components/ui/card";
import AvatarForm from "./avatar-form";
import UsernameForm from "./username-form";
import { Separator } from "@/components/ui/separator";
import EmailForm from "./email-form";
import PasswordForm from "./password-form";

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
      </div>
      <div>
        <Card>
          <div>카드다</div>
        </Card>
      </div>
    </div>
  );
}
