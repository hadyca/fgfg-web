"use client";

import GuideList from "@/components/guideList";
import { useRouter } from "next/navigation";
import GuideSearchForm from "@/components/guideSearchForm";
import { searchGuide } from "./actions";
import { SearchGuideType } from "../schema";

interface SearchGuideProps {
  searchParams?: {
    starttime: string;
    endtime: string;
  };
}

export default function SearchGuide({ searchParams }: SearchGuideProps) {
  const router = useRouter();

  const handleFormSubmit = async (data: SearchGuideType) => {
    const formData = new FormData();
    formData.append("date", data.date);
    formData.append("startTime", data.startTime);
    formData.append("endTime", data.endTime);
    const result = await searchGuide(formData);
    if (result.ok && result.redirect) {
      router.push(result.redirect);
    } else {
      console.log(result.error);
    }
  };
  return (
    <div className="max-w-7xl mx-auto mt-3 flex flex-col justify-center items-center gap-5">
      <GuideSearchForm
        onSubmit={handleFormSubmit}
        searchParams={searchParams}
      />
      <GuideList searchParams={searchParams} />
    </div>
  );
}
