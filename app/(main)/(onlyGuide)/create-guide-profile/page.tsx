"use client";

import ErrorText from "@/components/errorText";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import { createGuideProfileSchema } from "./schema";
import { CreateGuideProfileType } from "./schema";
import GuideProfileQandA from "@/components/guideProfileQandA";
import { getUploadUrl } from "@/lib/sharedActions";
import { createGuideProfile } from "./actions";
import GoogleMapApi from "@/components/googleMapApi";

export default function CreateGuideProfile() {
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadUrl, setUploadUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<Array<File | null>>([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    getValues,
    formState: { errors },
  } = useForm<CreateGuideProfileType>({
    resolver: zodResolver(createGuideProfileSchema),
    defaultValues: {
      guidePhotos: [],
    },
  });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    const fileType = files?.[0]?.type;
    const typeOk = fileType ? ACCEPTED_IMAGE_TYPES.includes(fileType) : false;
    if (!typeOk) {
      setError("guidePhotos", { message: "이미지 파일을 선택해주세요." });
      return;
    }
    if (!files || files.length === 0) {
      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreviews((prev) => [...prev, url]);

    setFiles((prev) => [...prev, file]);

    const { success, result } = await getUploadUrl();
    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl((prev) => [...prev, uploadURL]);
      const currentPhotos = getValues("guidePhotos"); // 현재 guidePhotos 배열을 가져옴

      const newPhoto = {
        id: previews.length + 1,
        url: `https://imagedelivery.net/dGGUSNmPRJm6ENhe7q2fhw/${id}`,
      };

      const newPhotos = [...currentPhotos, newPhoto];

      setValue("guidePhotos", newPhotos);
    }
  };

  const onValid = async (data: CreateGuideProfileType) => {
    setLoading(true);

    await Promise.all(
      files.map(async (file, index) => {
        const url = uploadUrl[index];

        if (!file || !url) {
          setError("guidePhotos", { message: "사진을 업로드해주세요." });
          return;
        }

        const cloudflareForm = new FormData();
        cloudflareForm.append("file", file);

        const response = await fetch(url, {
          method: "POST",
          body: cloudflareForm,
        });

        if (response.status !== 200) {
          setError("guidePhotos", {
            message: "사진 업로드에 실패했습니다. 나중에 다시 시도해주세요.",
          });
          return;
        }
      })
    );

    const formData = new FormData();
    formData.append("guidePhotos", JSON.stringify(data.guidePhotos));
    formData.append("personality", data.personality);
    formData.append("guideIntro", data.guideIntro);

    await createGuideProfile(formData);
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl my-10 pb-4 shadow-md">
        <CardHeader>
          <CardTitle>가이드 프로필 생성</CardTitle>
          <CardDescription>
            매력적인 사진과 멋진 가이드 소개로 본인을 더 어필 해보세요!
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col px-7">
          <div className="flex flex-col gap-5">
            <div className="space-y-1">
              <Label>가이드 프로필 사진</Label>
              {errors?.guidePhotos ? (
                <ErrorText text={errors?.guidePhotos?.message!} />
              ) : null}
              <div className="flex gap-3 flex-wrap">
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={index}>
                    <Label
                      htmlFor={`photo_${index}`}
                      className="border-2 w-32 h-32 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                      style={{
                        backgroundImage: `url(${previews[index]})`,
                      }}
                    >
                      {!previews[index] ? (
                        <>
                          <PhotoIcon className="w-12" />
                          <div
                            className={`text-neutral-300 text-sm ${
                              index === 0 ? "font-bold" : ""
                            }`}
                          >
                            {index === 0 ? "대표 사진" : "사진 추가"}
                          </div>
                        </>
                      ) : null}
                    </Label>
                    <input
                      onChange={(e) => onImageChange(e)}
                      id={`photo_${index}`}
                      name={`photo_${index}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="fullname">성격</Label>
              {errors?.personality ? (
                <ErrorText text={errors.personality.message!} />
              ) : null}
              <Input
                id="personality"
                type="text"
                minLength={1}
                {...register("personality")}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="selfIntro">가이드 소개</Label>
              {errors?.guideIntro ? (
                <ErrorText text={errors.guideIntro.message!} />
              ) : null}
              <Textarea id="guideIntro" {...register("guideIntro")} required />
            </div>
          </div>
          <Separator className="my-4" />
          {/* 구글 지도와 연동된 픽업 장소 */}
          <div className="space-y-1">
            <Label>픽업 장소</Label>
            <GoogleMapApi />
          </div>
          <Separator className="my-4" />
          <GuideProfileQandA />
          <Button disabled={loading}>{loading ? "로딩 중" : "확인"}</Button>
        </form>
      </Card>
    </div>
  );
}
