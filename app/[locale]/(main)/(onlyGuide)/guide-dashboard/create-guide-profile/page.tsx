"use client";

import ErrorText from "@/components/errorText";
import { useToast } from "@/components/hooks/use-toast";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { createGuideProfile } from "./actions";
import GoogleMapApi from "@/components/googleMapApi";

import Spinner from "@/components/ui/spinner";
import { getUploadUrl } from "@/app/[locale]/(main)/signup-guide/actions";

export default function CreateGuideProfile() {
  const { toast } = useToast();

  const [photoLoading, setPhotoLoading] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploadUrl, setUploadUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<Array<File | null>>([]);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
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

  const selectedPersonality = watch("personality");

  const onImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = event.target;

    const {
      target: { files },
    } = event;

    const fileType = files?.[0]?.type;
    const typeOk = fileType ? ACCEPTED_IMAGE_TYPES.includes(fileType) : false;
    if (!typeOk) {
      setError("guidePhotos", { message: "이미지 파일을 선택해주세요." });
      input.value = ""; // 선택한 파일 초기화
      return;
    }
    if (!files || files.length === 0) {
      input.value = ""; // 선택한 파일 초기화

      return;
    }
    const file = files[0];
    const url = URL.createObjectURL(file);

    // 이미지 미리보기와 파일 업데이트
    setPreviews((prev) => {
      const updatedPreviews = [...prev];
      updatedPreviews[index] = url; // 항상 지정된 인덱스에 추가 혹은 대체
      return updatedPreviews;
    });

    setFiles((prev) => {
      const updatedFiles = [...prev];
      updatedFiles[index] = file; // 항상 지정된 인덱스에 추가 혹은 대체
      return updatedFiles;
    });

    // 로딩 상태를 먼저 설정
    setPhotoLoading((prev) => {
      const updatedLoading = [...prev];
      updatedLoading[index] = true;
      return updatedLoading;
    });

    const { success, result } = await getUploadUrl();

    // 로딩 상태 해제
    setPhotoLoading((prev) => {
      const updatedLoading = [...prev];
      updatedLoading[index] = false;
      return updatedLoading;
    });

    if (success) {
      const { id, uploadURL } = result;

      // 업로드 URL 배열 업데이트
      setUploadUrl((prev) => {
        const updatedUrls = [...prev];
        updatedUrls[index] = uploadURL;
        return updatedUrls;
      });

      const currentPhotos = getValues("guidePhotos"); // 현재 guidePhotos 배열을 가져옴

      const newPhoto = {
        fileUrlOrder: index + 1,
        fileUrl: `https://imagedelivery.net/dGGUSNmPRJm6ENhe7q2fhw/${id}`,
      };

      const newPhotos = [...currentPhotos, newPhoto];
      setValue("guidePhotos", newPhotos);
    }
    input.value = ""; // 파일 선택 초기화
  };

  const onValid = async (data: CreateGuideProfileType) => {
    setLoading(true);

    try {
      await Promise.all(
        files.map(async (file, index) => {
          const url = uploadUrl[index];

          if (file === null) return;

          const cloudflareForm = new FormData();
          cloudflareForm.append("file", file);

          const response = await fetch(url, {
            method: "POST",
            body: cloudflareForm,
          });
          if (response.status !== 200) {
            throw new Error("이미지 업로드에 실패했습니다.");
          }
        })
      );

      // 이미지 업로드 성공 시에만 실행되는 코드
      const reorderedPhotos = data.guidePhotos
        .sort((a, b) => a.fileUrlOrder - b.fileUrlOrder)
        .map((photo, index) => ({
          ...photo,
          fileUrlOrder: index + 1,
        }));

      const formData = new FormData();
      formData.append("guidePhotos", JSON.stringify(reorderedPhotos));
      formData.append("personality", data.personality);
      formData.append("guideIntro", data.guideIntro);
      formData.append("pickupPlaceMain", data.pickupPlaceMain);
      formData.append("pickupPlaceLat", data.pickupPlaceLat.toString());
      formData.append("pickupPlaceLng", data.pickupPlaceLng.toString());
      formData.append("pickupPlaceDetail", data.pickupPlaceDetail);

      await createGuideProfile(formData);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "프로필 생성에 실패했습니다. 나중에 다시 시도해주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();

    // 이미지 미리보기 배열 업데이트 (해당 인덱스를 null로 설정)
    setPreviews((prev) => {
      const updatedPreviews = [...prev];
      updatedPreviews[index] = ""; // 이미지 URL을 빈 문자열로 설정하여 삭제
      return updatedPreviews;
    });

    // 파일 배열 업데이트 (해당 인덱스를 null로 설정)
    setFiles((prev) => {
      const updatedFiles = [...prev];
      updatedFiles[index] = null; // 파일을 null로 설정하여 삭제
      return updatedFiles;
    });

    // 업로드 URL 배열 업데이트 (해당 인덱스를 null로 설정)
    setUploadUrl((prev) => {
      const updatedUrls = [...prev];
      updatedUrls[index] = ""; // URL을 빈 문자열로 설정하여 삭제
      return updatedUrls;
    });

    // guidePhotos 배열 업데이트 (해당 인덱스를 null로 설정)
    const currentPhotos = getValues("guidePhotos");
    const updatedGuidePhotos = currentPhotos.filter(
      (photo) => photo.fileUrlOrder !== index + 1
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
                      className={`relative ${
                        !previews[index] ? "border-dashed" : "border-none"
                      } border-2 w-32 h-32 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md cursor-pointer bg-center bg-cover`}
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
                        <>
                          {!photoLoading[index] ? (
                            <XCircleIcon
                              className="absolute -top-3 -right-3 size-8 text-destructive cursor-pointer"
                              onClick={(e) => handleDeleteImage(index, e)}
                            />
                          ) : null}
                        </>
                      )}
                      {photoLoading[index] && (
                        <div className="absolute rounded-md inset-0 flex items-center justify-center bg-white bg-opacity-50">
                          <Spinner />
                        </div>
                      )}
                    </Label>
                    <input
                      onChange={(e) => onImageChange(e, index)}
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
                  value={selectedPersonality || ""}
                  className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border p-3 rounded-md text-sm w-56 ${
                    selectedPersonality ? "" : "text-muted-foreground"
                  }`}
                >
                  <option value="" disabled hidden>
                    성격을 선택해주세요
                  </option>
                  <option value="귀엽고 발랄한" className="text-black">
                    귀엽고 발랄한
                  </option>
                  <option value="섹시하고 매혹적인" className="text-black">
                    섹시하고 매혹적인
                  </option>
                  <option value="엉뚱하고 독특한" className="text-black">
                    엉뚱하고 독특한
                  </option>
                  <option value="활발하고 명랑한" className="text-black">
                    활발하고 명랑한
                  </option>
                  <option value="차분하고 따뜻한" className="text-black">
                    차분하고 따뜻한
                  </option>
                  <option value="친절하고 상냥한" className="text-black">
                    친절하고 상냥한
                  </option>
                  <option value="긍정적이고 밝은" className="text-black">
                    긍정적이고 밝은
                  </option>
                  <option value="유머러스하고 재치있는" className="text-black">
                    유머러스하고 재치있는
                  </option>
                  <option value="지적이고 신중한" className="text-black">
                    지적이고 신중한
                  </option>
                  <option value="매력적이고 세련된" className="text-black">
                    매력적이고 세련된
                  </option>
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
          <Button disabled={loading || photoLoading.some((loading) => loading)}>
            {loading ? "로딩 중" : "확인"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
