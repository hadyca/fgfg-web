"use client";

import ErrorText from "@/components/errorText";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { signUpGuideSchema, SignUpGuideType } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import {
  PhotoIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { getUploadUrl, signupGuide, userCheck } from "./actions";
import { Separator } from "@/components/ui/separator";
import { ACCEPTED_IMAGE_TYPES, LANGUAGE_OPTIONS_KOREAN } from "@/lib/constants";
import GuideQandA from "@/components/guideQandA";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import Spinner from "@/components/ui/spinner";

export default function SignUpGuide() {
  const [photoLoading, setPhotoLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [existError, setExistError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog 상태 관리

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignUpGuideType>({
    resolver: zodResolver(signUpGuideSchema),
    defaultValues: {
      language: [{ id: 1, language: "", level: "" }],
    },
  });

  const language = watch("language");
  const isAllLanguagesSelected =
    language.length >= LANGUAGE_OPTIONS_KOREAN.length;

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;

    const fileType = files?.[0]?.type;
    const typeOk = fileType ? ACCEPTED_IMAGE_TYPES.includes(fileType) : false;

    if (!typeOk) {
      setError("resumePhoto", { message: "이미지 파일을 선택해주세요." });
      return;
    }

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);

    setPhotoLoading(true);
    const { success, result } = await getUploadUrl();
    setPhotoLoading(false);

    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        "resumePhoto",
        `https://imagedelivery.net/dGGUSNmPRJm6ENhe7q2fhw/${id}`
      );
    }
  };

  const onValid = async (data: SignUpGuideType) => {
    setLoading(true);

    const user = await userCheck();

    if (user?.me?.guide?.isApproved !== undefined) {
      setExistError("가이드 심사 중 혹은 이미 등록된 가이드 입니다.");
      setLoading(false);
      return;
    }

    if (!file || !uploadUrl) {
      setError("resumePhoto", { message: "사진을 업로드해주세요." });
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      setError("resumePhoto", {
        message: "사진 업로드에 실패했습니다. 나중에 다시 시도해주세요.",
      });
      return;
    }

    const filteredLanguageOptions = language.filter(
      (option) => option.language.trim() !== "" && option.level.trim() !== ""
    );

    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("birthdate", data.birthdate);
    formData.append("height", data.height);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("resumePhoto", data.resumePhoto);
    formData.append("selfIntro", data.selfIntro);
    formData.append("language", JSON.stringify(filteredLanguageOptions));

    await signupGuide(formData);

    setLoading(false);
    setIsDialogOpen(true);
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newOptions = [...language];
    newOptions[index].language = value;
    setValue("language", newOptions);
  };

  const handleLevelChange = (index: number, value: string) => {
    const newOptions = [...language];
    newOptions[index].level = value;
    setValue("language", newOptions);
  };

  const handleAddLanguage = () => {
    const newId = language.length + 1; // 배열 길이 + 1을 ID로 사용
    setValue("language", [...language, { id: newId, language: "", level: "" }]);
  };

  const handleRemoveLanguage = (id: number) => {
    const newOptions = language
      .filter((item) => item.id !== id) // 선택된 언어 삭제
      .map((item, index) => ({
        ...item,
        id: index + 1, // 인덱스를 기반으로 ID를 재정렬
      }));

    setValue("language", newOptions);
  };

  const getAvailableLanguages = (currentIndex: number) => {
    const selectedLanguages = language
      .filter((_, index) => index !== currentIndex)
      .map((option) => option.language);
    return LANGUAGE_OPTIONS_KOREAN.map((lang) => ({
      name: lang,
      disabled: selectedLanguages.includes(lang),
    }));
  };

  const handleDialog = () => {
    setIsDialogOpen(false);
    router.push("/");
  };

  const handleDeleteImage = (e: React.MouseEvent) => {
    e.preventDefault();
    setPreview("");
    setFile(null);
    setValue("resumePhoto", ""); // Form에 있는 resumePhoto 값도 비워줍니다.
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl my-10 pb-4 shadow-md">
        <CardHeader>
          <CardTitle>가이드 가입</CardTitle>
          <span className="text-sm text-muted-foreground">
            *표시된 항목은 비공개 정보 입니다.
          </span>
        </CardHeader>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col px-7">
          <div className="flex flex-col gap-5">
            <div className="space-y-1">
              <Label htmlFor="fullname">이름</Label>
              {errors?.fullname ? (
                <ErrorText text={errors.fullname.message!} />
              ) : null}
              <Input
                id="fullname"
                type="text"
                minLength={1}
                {...register("fullname")}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="resumePhoto">
                <span>*이력서 사진 </span>
                <span className="text-sm text-muted-foreground">
                  (※얼굴이 잘 보이는 사진으로 등록해주세요.)
                </span>
              </Label>
              <Label
                htmlFor="resumePhoto"
                className={`relative ${
                  !preview ? "border-dashed" : "border-none"
                } border-2 w-32 h-32 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md cursor-pointer bg-center bg-cover`}
                style={{ backgroundImage: `url(${preview})` }}
              >
                {preview === "" ? (
                  <>
                    <PhotoIcon className="w-12" />
                    <div className="text-neutral-300 text-sm">사진 추가</div>
                  </>
                ) : (
                  <>
                    {!photoLoading ? (
                      <XCircleIcon
                        className="absolute -top-3 -right-3 size-8 text-destructive cursor-pointer"
                        onClick={handleDeleteImage}
                      />
                    ) : null}
                  </>
                )}
                {photoLoading && (
                  <div className="absolute rounded-md inset-0 flex items-center justify-center bg-white bg-opacity-50">
                    <Spinner />
                  </div>
                )}
              </Label>
              {errors?.resumePhoto ? (
                <ErrorText text={errors.resumePhoto.message!} />
              ) : null}
              <input
                onChange={onImageChange}
                id="resumePhoto"
                name="resumePhoto"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="birthdate">생년월일 (생년만 공개됨)</Label>
              {errors?.birthdate ? (
                <ErrorText text={errors.birthdate.message!} />
              ) : null}
              <Input
                id="birthdate"
                type="date"
                {...register("birthdate")}
                required
                className="w-36"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="birthdate">키(cm)</Label>
              {errors?.height ? (
                <ErrorText text={errors.height.message!} />
              ) : null}
              <Input
                id="height"
                type="number"
                {...register("height")}
                required
                className="w-36"
              />
            </div>
            <div className="space-y-1">
              <Label>외국어 능력</Label>
              {errors?.language ? (
                <ErrorText text={errors?.language[0]?.message!} />
              ) : null}
              {language.map((option, index) => (
                <div
                  key={option.id}
                  className="flex flex-row gap-3 items-center"
                >
                  <div>
                    <select
                      value={option.language}
                      onChange={(e) =>
                        handleLanguageChange(index, e.target.value)
                      }
                      className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 w-36 rounded-md border border-input px-3 py-2 text-sm focus:outline-none ${
                        option.language ? "" : "text-muted-foreground"
                      }`}
                    >
                      <option value="" disabled hidden>
                        언어 선택
                      </option>
                      {getAvailableLanguages(index).map((lang) => (
                        <option
                          key={lang.name}
                          value={lang.name}
                          disabled={lang.disabled}
                          className="text-black"
                        >
                          {lang.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      value={option.level}
                      onChange={(e) => handleLevelChange(index, e.target.value)}
                      className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 h-10 w-36 rounded-md border border-input px-3 py-2 text-sm focus:outline-none ${
                        option.level ? "" : "text-muted-foreground"
                      }`}
                    >
                      <option value="" disabled hidden>
                        레벨
                      </option>
                      <option value="1" className="text-black">
                        1(기초 수준)
                      </option>
                      <option value="2" className="text-black">
                        2
                      </option>
                      <option value="3" className="text-black">
                        3
                      </option>
                      <option value="4" className="text-black">
                        4
                      </option>
                      <option value="5" className="text-black">
                        5(원어민 수준)
                      </option>
                    </select>
                  </div>
                  <MinusCircleIcon
                    className="w-6 h-6 text-destructive cursor-pointer"
                    onClick={() => handleRemoveLanguage(option.id)}
                  />
                </div>
              ))}
              {!isAllLanguagesSelected && (
                <Button
                  variant={"outline"}
                  onClick={handleAddLanguage}
                  type="button"
                  className="flex items-center justify-between w-36 pl-1 gap-1"
                >
                  <PlusCircleIcon className="w-6 h-6 text-primary" />
                  <span>언어 추가하기</span>
                </Button>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="address">*거주지 주소</Label>
              {errors?.address ? (
                <ErrorText text={errors.address.message!} />
              ) : null}
              <Input
                id="address"
                type="text"
                {...register("address")}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">*핸드폰 번호</Label>
              {errors?.phone ? (
                <ErrorText text={errors.phone.message!} />
              ) : null}
              <Input id="phone" type="text" {...register("phone")} required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="selfIntro">*자기 소개</Label>
              {errors?.selfIntro ? (
                <ErrorText text={errors.selfIntro.message!} />
              ) : null}
              <Textarea id="selfIntro" {...register("selfIntro")} required />
            </div>
          </div>
          <Separator className="my-4" />
          <GuideQandA />
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                onCheckedChange={(checked) =>
                  setIsTermsChecked(checked === true)
                }
              />
              <label htmlFor="terms2" className="text-sm font-medium">
                <Link
                  href={"/policies/privacy-policy"}
                  className="text-primary"
                >
                  개인정보 수집
                </Link>
                <span> 및 </span>
                <Link
                  href={"/policies/terms-and-conditions"}
                  className="text-primary"
                >
                  이용약관
                </Link>
                <span> 동의</span>
              </label>
            </div>
            {existError !== "" ? <ErrorText text={existError} /> : null}
            <Button disabled={loading || !isTermsChecked || photoLoading}>
              {loading ? "로딩 중" : "가이드 가입"}
            </Button>
          </div>
        </form>
      </Card>

      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>🎉 가입 접수 완료</DialogTitle>
          </DialogHeader>
          <p>
            가이드 가입 신청이 완료되었습니다. 심사 결과와 면접 장소는 24시간
            이내에 가입하신 이메일로 안내해드리겠습니다.
          </p>
          <DialogFooter>
            <Button onClick={handleDialog}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
