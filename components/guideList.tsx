"use client";

import { getGuides } from "@/app/(main)/search-guide/actions";
import GetGuideSkeleton from "@/app/(main)/search-guide/skeleton";
import { calculateAge } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MainGuidePhoto {
  id: string;
  fileUrl: string;
}

interface Guide {
  id: string;
  fullname: string;
  birthdate: string;
  personality: string;
  mainGuidePhoto: MainGuidePhoto;
  isActive: boolean;
}

interface GuideListPros {
  searchParams?: {
    starttime: string;
    endtime: string;
  };
}

export default function GuideList({ searchParams }: GuideListPros) {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuides = async () => {
      setLoading(true);
      try {
        const data = await getGuides(
          searchParams?.starttime,
          searchParams?.endtime
        );
        const filteredData = data?.seeAvailableGuides.filter(
          (guide: Guide) => guide.mainGuidePhoto !== null
        );
        setGuides(filteredData);
      } catch (error) {
        console.error("Failed to fetch guides:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
  }, [searchParams]);

  if (loading) {
    return <GetGuideSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {guides.map((guide: Guide) => (
        <div
          key={guide.id}
          className="text-center group flex flex-col justify-start items-start"
        >
          <Link
            href={
              searchParams?.starttime && searchParams?.endtime
                ? `/guide-profile/${guide.id}?starttime=${encodeURIComponent(
                    searchParams?.starttime!
                  )}&endtime=${encodeURIComponent(searchParams?.endtime!)}`
                : `/guide-profile/${guide.id}`
            }
            className="w-full flex flex-col items-center"
          >
            <div className="relative w-60 h-72 rounded-md overflow-hidden">
              <Image
                fill
                src={`${guide.mainGuidePhoto.fileUrl}/mainphoto`}
                alt={"guide main photo"}
                className="object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                sizes="240px"
                priority
              />
            </div>
            <div className="text-primary text-lg">
              <span className="mr-1">{guide.fullname}</span>
              <span>({calculateAge(guide.birthdate)}세)</span>
            </div>
            <div className="text-sm">{guide.personality}</div>
            <div className="text-sm">{!guide.isActive ? "휴업 중" : null}</div>
          </Link>
        </div>
      ))}
    </div>
  );
}
