import GuideList from "@/components/guideList";
import SearchGuideForm from "@/components/searchGuideForm";

interface SearchGuideProps {
  searchParams?: {
    starttime: string;
    endtime: string;
  };
}

export const metadata = {
  title: "가이드 보기",
  description:
    "원하시는 가이드를 선택하세요. 프로필을 확인하고, 나에게 맞는 가이드를 찾아보세요.",
};

export default function SearchGuide({ searchParams }: SearchGuideProps) {
  return (
    <div className="max-w-7xl mx-auto mt-3 flex flex-col justify-center items-center gap-5">
      <SearchGuideForm searchParams={searchParams} />
      <GuideList searchParams={searchParams} />
    </div>
  );
}
