import GuideList from "@/components/guideList";
import { getGuides } from "./actions";

interface SearchGuideProps {
  searchParams: {
    startTime: string;
    endTime: string;
  };
}

export default async function SearchGuide({ searchParams }: SearchGuideProps) {
  const data = await getGuides(searchParams?.startTime, searchParams?.endTime);

  const filteredData = data?.seeAvailableGuides.filter(
    (guide: any) => guide.mainGuidePhoto !== null
  );

  return (
    <div className="max-w-7xl my-10 mx-auto">
      <GuideList data={filteredData} />
    </div>
  );
}
