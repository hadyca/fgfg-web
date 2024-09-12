import { notFound } from "next/navigation";
import { getGuide } from "./actions";
import PhotoCarousel from "@/components/photoCarousel";
import { calculateAge } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import ReservationDateForm from "@/components/reservationDateForm";

interface GuideProfilePros {
  params: {
    id: string;
  };
  searchParams?: {
    starttime: string;
    endtime: string;
  };
}

interface Language {
  id: number;
  language: string;
  level: string;
}

export default async function guideProfile(props: GuideProfilePros) {
  const id = Number(props.params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const guide = await getGuide(id);

  if (!guide.seeGuide) {
    return notFound();
  }

  const parsedLanguage = JSON.parse(guide?.seeGuide?.language);
  console.log(guide?.seeGuide?.reservations);
  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <PhotoCarousel guidePhotos={guide?.seeGuide?.guidePhotos} />
      <div className="grid grid-cols-1 md:grid-cols-10">
        <div className="w-full md:col-span-6">
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={`${guide?.seeGuide?.mainGuidePhoto?.fileUrl}/avatar`}
                  alt="fgfgavatar"
                />
                <AvatarFallback>
                  <UserCircleIcon className="text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <span>가이드:</span>
                <span className="font-semibold">
                  {guide?.seeGuide?.fullname}
                </span>
                <span> 님</span>
                {!guide?.seeGuide?.isActive ? <span> (휴업 중)</span> : null}
              </div>
            </div>
            <div>
              <span>나이: </span>
              <span>{calculateAge(guide?.seeGuide?.birthdate)}세</span>
            </div>
            <div>
              <span>키: </span>
              <span>{guide?.seeGuide?.height}cm</span>
            </div>
            <div>
              <span>언어: </span>
              <span>베트남어(원어민)</span>
              {parsedLanguage
                ? parsedLanguage.map((language: Language, index: number) => (
                    <span key={language.id}>
                      , {language.language}lv{language.level}
                      {index < parsedLanguage.length - 1 && ", "}
                    </span>
                  ))
                : null}
            </div>
          </div>
          <Separator className="my-8" />
          <div>
            <div className="text-xl font-medium">가이드 소개</div>
            <div>{guide?.seeGuide?.guideIntro}</div>
          </div>
          <Separator className="my-8" />
        </div>
        <div className="md:col-span-4 flex justify-center items-start ">
          <ReservationDateForm guideId={id} searchParams={props.searchParams} />
        </div>
      </div>
      <div className="mt-8 md:mt-0">
        <div className="text-xl font-medium">가이드 예약 완료 시간</div>
        {/* <div>{guide?.seeGuide?.reservations}</div> */}
      </div>
      <Separator className="my-8" />
    </div>
  );
}
