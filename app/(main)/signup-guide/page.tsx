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
import {
  IdentificationIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/outline";
import { PhotoIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { signupGuide, userCheck } from "./actions";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ACCEPTED_IMAGE_TYPES, LANGUAGE_OPTIONS_KOREAN } from "@/lib/constants";
import GuideQandA from "@/components/guideQandA";
import { getUploadUrl } from "@/lib/sharedActions";

export default function SignUpGuide() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [existError, setExistError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [nextId, setNextId] = useState(2);

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
      setError("photo", { message: "이미지 파일을 선택해주세요." });
      return;
    }

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);

    const { success, result } = await getUploadUrl();

    if (success) {
      const { id, uploadURL } = result;
      setUploadUrl(uploadURL);
      setValue(
        "photo",
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
      setError("photo", { message: "사진을 업로드해주세요." });
      return;
    }

    const cloudflareForm = new FormData();
    cloudflareForm.append("file", file);
    const response = await fetch(uploadUrl, {
      method: "post",
      body: cloudflareForm,
    });
    if (response.status !== 200) {
      setError("photo", {
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
    formData.append("photo", data.photo);
    formData.append("selfIntro", data.selfIntro);
    formData.append("language", JSON.stringify(filteredLanguageOptions));

    await signupGuide(formData);

    //to-be 접수 성공 후, 24시간 내 심사 결과 줄거라는 (심사 중)이라는 모달창 띄우기
    setLoading(false);
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
    setValue("language", [
      ...language,
      { id: nextId, language: "", level: "" },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemoveLanguage = (id: number) => {
    const newOptions = language.filter((item) => item.id !== id);
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

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl my-10 pb-4 shadow-md">
        <CardHeader>
          <CardTitle>가이드 가입</CardTitle>
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
              <Label htmlFor="photo">프로필 사진</Label>
              <Label
                htmlFor="photo"
                className="border-2 w-32 h-32 flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover"
                style={{ backgroundImage: `url(${preview})` }}
              >
                {preview === "" ? (
                  <>
                    <PhotoIcon className="w-12" />
                    <div className="text-neutral-300 text-sm">사진 추가</div>
                  </>
                ) : null}
              </Label>
              {errors?.photo ? (
                <ErrorText text={errors.photo.message!} />
              ) : null}
              <input
                onChange={onImageChange}
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="birthdate">생년월일</Label>
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
                    <Select
                      value={option.language}
                      onValueChange={(value) =>
                        handleLanguageChange(index, value)
                      }
                    >
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="언어 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableLanguages(index).map((lang) => (
                          <SelectItem
                            key={lang.name}
                            value={lang.name}
                            disabled={lang.disabled}
                          >
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={option.level}
                      onValueChange={(value) => handleLevelChange(index, value)}
                    >
                      <SelectTrigger className="w-20">
                        <SelectValue placeholder="레벨" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1(기초 수준)</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5(원어민 수준)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {index > 0 && (
                    <MinusCircleIcon
                      className="w-6 h-6 text-destructive cursor-pointer"
                      onClick={() => handleRemoveLanguage(option.id)}
                    />
                  )}
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
              <Label htmlFor="address">주소</Label>
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
              <Label htmlFor="phone">핸드폰 번호</Label>
              {errors?.phone ? (
                <ErrorText text={errors.phone.message!} />
              ) : null}
              <Input id="phone" type="text" {...register("phone")} required />
            </div>

            <div className="space-y-1">
              <Label htmlFor="selfIntro">자기 소개</Label>
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
            <Button disabled={loading || !isTermsChecked}>
              {loading ? "로딩 중" : "가이드 가입"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
