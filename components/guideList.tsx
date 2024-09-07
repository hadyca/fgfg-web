import { calculateAge } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface MainGuidePhoto {
  id: string;
  fileUrl: string;
}

interface Guide {
  __typename: string;
  id: string;
  fullname: string;
  birthdate: string;
  personality: string;
  mainGuidePhoto: MainGuidePhoto;
  isActive: boolean;
}

interface GuideProps {
  data: Guide[];
}

export default function GuideList({ data }: GuideProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 justify-items-center">
      {data.map((guide) => (
        <div key={guide.id} className="text-center group">
          <Link href={`/guide-profile/${guide.id}`}>
            <div className="relative w-60 h-72 rounded-md overflow-hidden">
              <Image
                fill
                src={`${guide.mainGuidePhoto.fileUrl}/mainphoto`}
                alt={"guide main photo"}
                className="transform transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
            <div className="text-primary text-lg">
              <span>{guide.fullname}</span>
              <span> ({calculateAge(guide.birthdate)}세)</span>
            </div>
            <div className="text-sm">{guide.personality}</div>
            <div className="text-sm">{!guide.isActive ? "휴업 중" : null}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
