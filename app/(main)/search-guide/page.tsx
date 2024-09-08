import GuideList from "@/components/guideList";
import { Suspense } from "react";
import GuideSearchForm from "@/components/ui/guideSearchForm";

interface SearchGuideProps {
  searchParams?: {
    startTime: string;
    endTime: string;
  };
}

export default function SearchGuide({ searchParams }: SearchGuideProps) {
  return (
    <div className="max-w-7xl my-10 mx-auto">
      <GuideSearchForm searchParams={searchParams} />
      <Suspense fallback={<h1>스켈레톤...</h1>}>
        <GuideList searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
