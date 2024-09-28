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
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
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
      pickupPlaceMain: "",
      pickupPlaceLat: 0,
      pickupPlaceLng: 0,
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
    formData.append("pickupPlaceMain", data.pickupPlaceMain);
    formData.append("pickupPlaceLat", data.pickupPlaceLat.toString());
    formData.append("pickupPlaceLng", data.pickupPlaceLng.toString());
    formData.append("pickupPlaceDetail", data.pickupPlaceDetail);

    await createGuideProfile(formData);

    setLoading(false);
  };

  const handleDeleteImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadUrl((prev) => prev.filter((_, i) => i !== index));
    const currentPhotos = getValues("guidePhotos");
    const updatedGuidePhotos = currentPhotos.filter(
      (_: any, i: number) => i !== index
    );
    setValue("guidePhotos", updatedGuidePhotos);
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
                      className="relative border-2 w-32 h-32 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
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
                      ) : (
                        <XCircleIcon
                          className="absolute -top-3 -right-3 size-8 text-destructive cursor-pointer"
                          onClick={(e) => handleDeleteImage(index, e)}
                        />
                      )}
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
              <Label htmlFor="personality">성격</Label>
              {errors?.personality ? (
                <ErrorText text={errors.personality.message!} />
              ) : null}
              <div>
                <select
                  id="personality"
                  {...register("personality")}
                  required
                  defaultValue=""
                  className="border p-3 rounded-md text-sm w-56"
                >
                  <option value="" disabled className="text-muted-foreground">
                    성격을 선택해주세요
                  </option>
                  <option value="귀엽고 발랄한">귀엽고 발랄한</option>
                  <option value="섹시하고 매혹적인">섹시하고 매혹적인</option>
                  <option value="엉뚱하고 독특한">엉뚱하고 독특한</option>
                  <option value="활발하고 명랑한">활발하고 명랑한</option>
                  <option value="차분하고 따뜻한">차분하고 따뜻한</option>
                  <option value="친절하고 상냥한">친절하고 상냥한</option>
                  <option value="긍정적이고 밝은">긍정적이고 밝은</option>
                  <option value="유머러스하고 재치있는">
                    유머러스하고 재치있는
                  </option>
                  <option value="지적이고 신중한">지적이고 신중한</option>
                  <option value="매력적이고 세련된">매력적이고 세련된</option>
                </select>
              </div>
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
          {/* 구글 지도와 연동된 픽업 위치 */}
          <div className="space-y-1">
            <Label>픽업 위치</Label>
            {errors?.pickupPlaceMain ? (
              <ErrorText text={errors.pickupPlaceMain.message!} />
            ) : null}
            <GoogleMapApi
              onMarkerChange={(position) => {
                setValue("pickupPlaceLat", position.lat);
                setValue("pickupPlaceLng", position.lng);
              }}
              onInputValueChange={(value) => {
                setValue("pickupPlaceMain", value);
              }}
            />
          </div>
          <div className="mt-2">
            <Label htmlFor="selfIntro">픽업 위치 구체적인 설명</Label>
            <div className="text-sm text-muted-foreground mb-2">
              고객님께서 길을 헤매지 않도록, 조금 더 구체적으로 설명해주세요
            </div>
            {errors?.pickupPlaceDetail ? (
              <ErrorText text={errors.pickupPlaceDetail.message!} />
            ) : null}
            <Textarea
              id="pickupPlaceDetail"
              {...register("pickupPlaceDetail")}
              placeholder="EX) 노트르담 대성당 맞은편에 있는 카페에요. 카페 안에서 만나요"
              required
            />
          </div>
          <Separator className="my-4" />
          <GuideProfileQandA />
          <Button disabled={loading}>{loading ? "로딩 중" : "확인"}</Button>
        </form>
      </Card>
    </div>
  );
}
