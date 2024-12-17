"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  languageSchema,
  LanguageType,
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/schema";
import { updateLanguage } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { MinusCircleIcon } from "@heroicons/react/24/outline";
import { LANGUAGE_OPTIONS_KOREAN } from "@/lib/constants";

interface LanguageInput {
  id: number;
  language: string;
  level: string;
}

interface LanguageFormProps {
  language: LanguageInput[];
}

export default function LanguageForm({
  language: originLanguage,
}: LanguageFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const initialLanguage: LanguageInput[] =
    typeof originLanguage === "string"
      ? JSON.parse(originLanguage)
      : originLanguage;

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<LanguageType>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      language: initialLanguage,
    },
  });
  const language = watch("language");
  const isAllLanguagesSelected =
    language.length >= LANGUAGE_OPTIONS_KOREAN.length;

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

  const onValid = async (data: LanguageType) => {
    const filteredLanguageOptions = language.filter(
      (option) => option.language.trim() !== "" && option.level.trim() !== ""
    );
    setLoading(true);
    const formData = new FormData();
    formData.append("language", JSON.stringify(filteredLanguageOptions));

    const { ok, error } = await updateLanguage(formData);

    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      toast({
        description: "변경 되었습니다.",
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onValid)}>
      <div className="font-semibold mb-2">외국어 능력</div>
      <div className="flex flex-row justify-between items-center">
        <div className="space-y-1">
          {errors?.language ? (
            <ErrorText text={errors?.language[0]?.message!} />
          ) : null}
          {language.map((option, index) => (
            <div key={option.id} className="flex flex-row gap-3 items-center">
              <div>
                <select
                  value={option.language}
                  onChange={(e) => handleLanguageChange(index, e.target.value)}
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
        <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
      </div>
      {errors?.language ? <ErrorText text={errors.language.message!} /> : null}
    </form>
  );
}
