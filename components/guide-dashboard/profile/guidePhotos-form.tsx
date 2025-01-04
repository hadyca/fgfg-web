"use client";

import ErrorText from "@/components/errorText";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  guidePhotosSchema,
  GuidePhotosType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateGuidePhotos } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import { Label } from "@/components/ui/label";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { getUploadUrl } from "@/app/[locale]/(main)/signup-guide/actions";
import { ACCEPTED_IMAGE_TYPES } from "@/lib/constants";
import Spinner from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { LoadingOverlay } from "@/components/loading-overlay";

interface GuidePhotosInput {
  fileUrlOrder: number;
  fileUrl: string;
}

interface GuidePhotosFormProps {
  guidePhotos: GuidePhotosInput[];
}

export default function GuidePhotosForm({ guidePhotos }: GuidePhotosFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [photoLoading, setPhotoLoading] = useState<boolean[]>(
    Array(8).fill(false)
  );
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<(GuidePhotosInput | null)[]>([]);
  const [uploadUrl, setUploadUrl] = useState<string[]>([]);
  const [files, setFiles] = useState<Array<File | null>>([]);
  const {
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
  } = useForm<GuidePhotosType>({
    resolver: zodResolver(guidePhotosSchema(t)),
    defaultValues: {
      guidePhotos: guidePhotos.map((photo) => ({
        ...photo,
        fileUrlOrder: parseInt(photo.fileUrlOrder as unknown as string),
      })),
    },
  });

  useEffect(() => {
    if (guidePhotos) {
      const updatedPreviews = guidePhotos.map((photo) => ({
        ...photo,
        fileUrl: `${photo.fileUrl}/avatar`,
      }));
      setPreviews(updatedPreviews);
    }
  }, [guidePhotos]);

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
      setError("guidePhotos", { message: t("profile.imageFile") });
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

      if (!updatedPreviews[index]) {
        updatedPreviews[index] = { fileUrlOrder: index + 1, fileUrl: "" };
      }

      updatedPreviews[index].fileUrl = url; // 항상 지정된 인덱스에 추가 혹은 대체
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

  const onValid = async (data: GuidePhotosType) => {
    setLoading(true);
    try {
      await Promise.all(
        files.map(async (file, index) => {
          const url = uploadUrl[index];
          //배열값 중간에 undefine이나, null이 있으면 그냥 pass
          if (file == null || undefined) {
            return;
          }

          const cloudflareForm = new FormData();
          cloudflareForm.append("file", file);

          const response = await fetch(url, {
            method: "POST",
            body: cloudflareForm,
          });

          if (response.status !== 200) {
            throw new Error(t("profile.imageUploadFailed"));
          }
        })
      );

      // 기존 fileUrlOrder 값으로 정렬한 후, 순서대로 재배열
      const reorderedPhotos = data.guidePhotos
        .sort((a, b) => a.fileUrlOrder - b.fileUrlOrder) // 기존 순서대로 정렬
        .map((photo, index) => ({
          ...photo,
          fileUrlOrder: index + 1, // 정렬된 순서대로 1, 2, 3, 4 설정
        }));

      const formData = new FormData();
      formData.append("guidePhotos", JSON.stringify(reorderedPhotos));

      const { ok, error } = await updateGuidePhotos(formData);

      if (!ok) {
        toast({
          variant: "destructive",
          title: error,
        });
      } else {
        toast({
          description: t("profile.changeSuccess"),
        });
        setLoading(false);
      }
    } catch (error) {
      setError("guidePhotos", {
        message: t("profile.photoUploadFailed"),
      });
      setLoading(false);
    }
  };

  const handleDeleteImage = (index: number, e: React.MouseEvent) => {
    e.preventDefault();

    setPreviews((prev) => {
      const updatedPreviews = [...prev];
      updatedPreviews[index] = null;
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
    <form onSubmit={handleSubmit(onValid)}>
      {loading && <LoadingOverlay />}
      <div className="font-semibold mb-2">{t("profile.guideProfilePhoto")}</div>
      <div className="flex flex-row justify-between items-end">
        <div className="flex gap-3 flex-wrap">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index}>
              <Label
                htmlFor={`photo_${index}`}
                className={`relative ${
                  !previews[index] ? "border-dashed" : "border-none"
                } border-2 w-32 h-32 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md cursor-pointer bg-center bg-cover`}
                style={{
                  backgroundImage: previews[index]?.fileUrl
                    ? `url(${previews[index]?.fileUrl})`
                    : "none",
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
                      {index === 0
                        ? t("profile.representativePhoto")
                        : t("profile.addPhoto")}
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
        <Button disabled={loading}>{t("profile.save")}</Button>
      </div>
      {errors?.guidePhotos ? (
        <ErrorText text={errors.guidePhotos.message!} />
      ) : null}
    </form>
  );
}
