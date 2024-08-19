import GuideList from "@/components/guideList";
import { getGuides } from "./actions";

interface SearchGuideProps {
  searchParams: {
    startTime: string;
    endTime: string;
  };
}

export default async function SearchGuide({ searchParams }: SearchGuideProps) {
  const initialGuides = await getGuides(
    searchParams?.startTime,
    searchParams?.endTime
  );

  return (
    <div>
      <h1>가이드 찾기 화면</h1>
      <GuideList initialGuides={initialGuides?.seeAvailableGuides} />
    </div>
  );
}
