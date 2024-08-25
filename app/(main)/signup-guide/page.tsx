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
import { Separator } from "@/components/ui/separator";
import { IdentificationIcon, EyeIcon } from "@heroicons/react/24/outline";

export default function SignUpGuide() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpGuideType>({
    resolver: zodResolver(signUpGuideSchema),
  });

  console.log(errors);

  const onValid = async (data: SignUpGuideType) => {
    console.log(data);
    setLoading(true);
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("birthdate", data.birthdate);
    formData.append("address", data.address);
    formData.append("phone", data.phone);
    formData.append("selfIntro", data.selfIntro);

    // const result = await createAccount(formData);
    // if (result?.type === "checkUsername") {
    //   setError("username", { message: result.error });
    // }
    // if (result?.type === "checkEmail") {
    //   setError("email", { message: result.error });
    // }
    //to-be 접수 성공 후, 24시간 내 결과 줄거라는 (심사 중)이라는 모달창 띄우기
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-2xl my-10 pb-4 shadow-md">
        <CardHeader>
          <CardTitle>가이드 가입</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onValid)} className="flex flex-col px-7">
          <div>
            <div className="flex flex-row items-center gap-1">
              <IdentificationIcon className="size-6" />
              <span className="text-lg font-semibold">개인 정보</span>
            </div>
            <div className="text-sm text-muted-foreground">
              귀하의 개인 정보는 fgfg에서 가이드 관리 목적으로만 사용되며,
              외부에 공개되지 않습니다.
            </div>
          </div>
          <div className="flex flex-col gap-3 my-4">
            <div className="space-y-1">
              <Label htmlFor="fullname">이름(본명)</Label>
              <Input
                id="fullname"
                type="text"
                minLength={1}
                {...register("fullname")}
                required
              />
            </div>
            {errors?.fullname ? (
              <ErrorText text={errors.fullname.message!} />
            ) : null}
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
            <div className="space-y-1">
              <Label htmlFor="selfIntro">자기 소개</Label>
              <Textarea id="selfIntro" {...register("selfIntro")} required />
            </div>
          </div>
          <Separator />
          <div className="my-4">
            <div className="flex flex-row items-center gap-1">
              <EyeIcon className="size-6" />
              <span className="text-lg font-semibold">공개 정보</span>
            </div>
            <div className="text-sm text-muted-foreground">
              공개 정보는 실제 고객이 가이드 조회 시 확인할 수 있는 내용으로,
              서비스 이용 시 고객에게 공개됩니다. 가입 후 다시 수정 할 수
              있습니다.
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="hobby">사진 등록 부분</Label>
            <Input
              id="hobby"
              type="text"
              minLength={1}
              maxLength={10}
              {...register("hobby")}
              required
            />
          </div>
          {errors?.username ? (
            <ErrorText text={errors.username.message!} />
          ) : null}
          <div className="space-y-1">
            <Label htmlFor="hobby">취미 및 관심사</Label>
            <Input
              id="hobby"
              type="text"
              minLength={1}
              maxLength={10}
              {...register("hobby")}
              required
            />
          </div>
          {errors?.username ? (
            <ErrorText text={errors.username.message!} />
          ) : null}
          <div className="space-y-1">
            <Label htmlFor="hobby">언어 능력</Label>
            <Input
              id="hobby"
              type="text"
              minLength={1}
              maxLength={10}
              {...register("hobby")}
              required
            />
          </div>
          {errors?.username ? (
            <ErrorText text={errors.username.message!} />
          ) : null}
          <div className="space-y-1">
            <Label htmlFor="hobby">가이드 불가능한 시간</Label>
            <Input
              id="hobby"
              type="text"
              minLength={1}
              maxLength={10}
              {...register("hobby")}
              required
            />
          </div>
          {errors?.username ? (
            <ErrorText text={errors.username.message!} />
          ) : null}
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
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
          <Button
            disabled={loading}
            className=" disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
          >
            가이드 가입
          </Button>
        </form>
      </Card>
    </div>
  );
}
