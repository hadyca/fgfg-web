import GuideList from "@/components/guideList";
import SearchGuideForm from "@/components/searchGuideForm";

interface SearchGuideProps {
  searchParams?: {
    starttime: string;
    endtime: string;
  };
}

export default function SearchGuide({ searchParams }: SearchGuideProps) {
  return (
    <div className="max-w-7xl mx-auto mt-3 flex flex-col justify-center items-center gap-5">
      <SearchGuideForm searchParams={searchParams} />
      <GuideList searchParams={searchParams} />
    </div>
  );
}
