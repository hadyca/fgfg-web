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
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { getUploadUrl, signupGuide, userCheck } from "./actions";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function SignUpGuide() {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const [uploadUrl, setUploadUrl] = useState("");
  const [existError, setExistError] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isTermsChecked, setIsTermsChecked] = useState(false); // 체크박스 상태 관리

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<SignUpGuideType>({
    resolver: zodResolver(signUpGuideSchema),
  });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
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
    if (user?.data?.me?.isGuide !== null) {
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

    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("birthdate", data.birthdate);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("photo", data.photo);
    formData.append("selfIntro", data.selfIntro);

    await signupGuide(formData);

    //to-be 접수 성공 후, 24시간 내 심사 결과 줄거라는 (심사 중)이라는 모달창 띄우기
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl my-10 pb-4 shadow-md">
        <CardHeader>
          <CardTitle>가이드 가입</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col px-7">
          <div className="mb-4">
            <div className="flex flex-row items-center gap-1">
              <IdentificationIcon className="size-6" />
              <span className="text-lg font-semibold">개인 정보</span>
            </div>
            <div className="text-sm text-muted-foreground">
              귀하의 개인 정보는 fgfg에서 가이드 관리 목적으로만 사용되며,
              외부에 공개되지 않습니다.
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="space-y-1">
              <Label htmlFor="fullname">이름(본명)</Label>
              <Input
                id="fullname"
                type="text"
                minLength={1}
                {...register("fullname")}
              />
            </div>
            {errors?.fullname ? (
              <ErrorText text={errors.fullname.message!} />
            ) : null}
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
                    <div className="text-neutral-400 text-sm">사진 추가</div>
                  </>
                ) : null}
              </Label>
              <input
                onChange={onImageChange}
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="hidden"
                required
              />
            </div>
            {errors?.photo ? <ErrorText text={errors.photo.message!} /> : null}
            <div className="space-y-1">
              <Label htmlFor="birthdate">생년월일</Label>
              <Input
                id="birthdate"
                type="date"
                {...register("birthdate")}
                required
                className="w-36"
              />
            </div>
            {errors?.birthdate ? (
              <ErrorText text={errors.birthdate.message!} />
            ) : null}
            <div className="space-y-1">
              <Label htmlFor="address">주소</Label>
              <Input
                id="address"
                type="text"
                {...register("address")}
                required
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="phone">핸드폰 번호</Label>
              <Input id="phone" type="text" {...register("phone")} required />
            </div>
            {errors?.phone ? <ErrorText text={errors.phone.message!} /> : null}
            <div className="space-y-1">
              <Label htmlFor="selfIntro">자기 소개</Label>
              <Textarea id="selfIntro" {...register("selfIntro")} required />
            </div>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-row items-center gap-1">
            <QuestionMarkCircleIcon className="size-6" />
            <span className="text-lg font-semibold">자주 묻는 질문</span>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>면접을 봐야 하나요?</AccordionTrigger>
              <AccordionContent>네 면접 봐야합니다.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>수익 부분</AccordionTrigger>
              <AccordionContent>수익 부분 설명</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>성적인 부분</AccordionTrigger>
              <AccordionContent>안전합니다</AccordionContent>
            </AccordionItem>
          </Accordion>
          <Separator className="my-4" />
          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                onCheckedChange={(checked) =>
                  setIsTermsChecked(checked === true)
                } // 체크박스 상태 업데이트
              />
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Link
                  href={"/policies/privacy-policy"}
                  className="text-orange-500"
                >
                  개인정보 수집
                </Link>
                <span> 및 </span>
                <Link
                  href={"/policies/terms-and-conditions"}
                  className="text-orange-500"
                >
                  이용약관
                </Link>
                <span> 동의</span>
              </label>
            </div>
            {existError !== "" ? <ErrorText text={existError} /> : null}
            <Button
              disabled={loading || !isTermsChecked}
              className=" disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
            >
              {loading ? "로딩 중" : "가이드 가입"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
