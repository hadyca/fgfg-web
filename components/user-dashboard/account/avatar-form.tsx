"use client";

import { getUploadUrl } from "@/app/[locale]/(main)/signup-guide/actions";
import { updateAvatar } from "@/app/[locale]/(main)/user-dashboard/account/actions";
import ErrorText from "@/components/errorText";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/hooks/use-toast";
import { useTranslations } from "next-intl";

interface AvatarFormProps {
  avatar: string;
}

export default function AvatarForm({ avatar }: AvatarFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [avatarLoading, setAvatarLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [newAvatar, setNewAvatar] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState("");

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      avatar,
    },
  });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    const fileType = files?.[0]?.type;
    const typeOk = fileType ? ACCEPTED_IMAGE_TYPES.includes(fileType) : false;

    if (!typeOk) {
      setError("avatar", { message: t("account.selectImageFile") });
      return;
    }

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    const url = URL.createObjectURL(file);
    setNewAvatar(url);
    setFile(file);

    setAvatarLoading(true);
    const { success, result } = await getUploadUrl();
    setAvatarLoading(false);

    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        "avatar",
        `https://imagedelivery.net/dGGUSNmPRJm6ENhe7q2fhw/${id}`
      );
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click(); // input 태그 클릭을 트리거
    }
  };

  const onValid = async (data: any) => {
    if (newAvatar === "") {
      return;
    }
    setLoading(true);
    if (!file || !uploadUrl) {
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });

    if (response.status !== 200) {
      setError("avatar", {
        message: t("account.uploadFailed"),
      });
      return;
    }

    const formData = new FormData();
    formData.append("avatar", data.avatar);
    const { ok, error } = await updateAvatar(formData);

    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
      return;
    } else {
      toast({
        description: t("account.changeSuccess"),
      });
    }

    setLoading(false);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">{t("account.avatar")}</div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3 justify-center items-center relative">
          <div className="relative">
            <Avatar className="size-16">
              {newAvatar ? (
                <>
                  <AvatarImage
                    className="object-cover"
                    src={newAvatar}
                    alt="@fgfg"
                  />
                  <AvatarFallback>
                    <UserCircleIcon className="text-primary w-full h-full" />
                  </AvatarFallback>
                </>
              ) : avatar ? (
                <>
                  <AvatarImage src={`${avatar}/avatar`} alt="@fgfg" />
                  <AvatarFallback>
                    <UserCircleIcon className="text-primary w-full h-full" />
                  </AvatarFallback>
                </>
              ) : (
                <UserCircleIcon className="text-primary w-full h-full" />
              )}
            </Avatar>
            {avatarLoading && (
              <div className="absolute rounded-md inset-0 flex items-center justify-center bg-white bg-opacity-50">
                <Spinner />
              </div>
            )}
          </div>
          <input
            ref={inputRef}
            onChange={onImageChange}
            id="avatar"
            name="avatar"
            type="file"
            accept="image/*"
            className="hidden"
          />
          <Button type="button" variant={"outline"} onClick={handleClick}>
            {t("account.selectImage")}
          </Button>
        </div>
        <Button disabled={loading || avatarLoading}>
          {loading ? t("account.loading") : t("account.save")}
        </Button>
      </div>
      {errors?.avatar ? <ErrorText text={errors.avatar.message!} /> : null}
    </form>
  );
}
