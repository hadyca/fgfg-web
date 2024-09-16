import { notFound } from "next/navigation";
import { getGuide } from "./actions";
import PhotoCarousel from "@/components/photoCarousel";
import {
  calculateAge,
  convertToVietnamDate,
  convertToVietnamTime,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import ReservationDateForm from "@/components/reservationDateForm";
import { Card } from "@/components/ui/card";
import ReportForm from "@/components/reportForm";
import GoogleMapApiSimple from "@/components/googleMapApiSimple";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface Reservation {
  id: number;
  startTime: string;
  endTime: string;
}

export default async function guideProfile(props: GuideProfilePros) {
  const guideId = Number(props.params.id);
  if (isNaN(guideId)) {
    return notFound();
  }
  const guide = await getGuide(guideId);

  if (!guide.seeGuide) {
    return notFound();
  }

  const parsedLanguage = JSON.parse(guide?.seeGuide?.language);

  return (
    <div className="max-w-6xl mx-auto my-10 px-6 md:px-0">
      <PhotoCarousel guidePhotos={guide?.seeGuide?.guidePhotos} />
      <div className="grid grid-cols-1 md:grid-cols-10">
        <div className="w-full md:col-span-6">
          <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-3">
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
          </div>
          <Separator className="my-8" />
          <div className="flex flex-col gap-2">
            <div className="text-xl font-medium">가이드 소개</div>
            <div>{guide?.seeGuide?.guideIntro}</div>
          </div>
          <Separator className="my-8" />
        </div>
        <div className="md:col-span-4 flex flex-col justify-center items-center gap-3">
          <div>
            <ReservationDateForm
              guideId={guideId}
              searchParams={props.searchParams}
              reservations={guide?.seeGuide?.reservations}
            />
          </div>
          <ReportForm guideId={guideId} />
        </div>
      </div>
      <div className="mt-8 md:mt-0 flex flex-col gap-2">
        <div className="text-xl font-medium">
          <div className="flex flex-row items-center">
            <span>픽업 위치 </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <ExclamationCircleIcon className="size-6 text-primary" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    픽업 위치를 바꾸고 싶으시다면, 가이드님과 채팅을 해보세요!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            {/* 구글 맵 링크 추가 */}
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                guide?.seeGuide?.pickupPlaceMain
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              <span>{guide?.seeGuide?.pickupPlaceMain}</span>
            </a>
          </div>
          <span className="text-sm text-muted-foreground">
            {guide?.seeGuide?.pickupPlaceDetail}
          </span>
        </div>
        <GoogleMapApiSimple
          lat={guide?.seeGuide?.pickupPlaceLat}
          lng={guide?.seeGuide?.pickupPlaceLng}
        />
      </div>
      <Separator className="my-8" />
      <div className="mt-8 md:mt-0 flex flex-col gap-2">
        <div className="text-xl font-medium">이미 예약된 시간</div>
        {guide?.seeGuide?.reservations.length !== 0 ? (
          <div className="flex flex-wrap gap-3">
            {guide?.seeGuide?.reservations.map((reservation: Reservation) => (
              <Card key={reservation.id} className="shadow-sm p-2 inline-block">
                <div className="flex items-center gap-1">
                  <span>{convertToVietnamDate(reservation.startTime)}</span>
                  <Separator
                    className="w-[1px] h-4 bg-primary"
                    orientation="vertical"
                  />
                  <span>{convertToVietnamTime(reservation.startTime)}</span>
                  <span>~</span>
                  <span>{convertToVietnamTime(reservation.endTime)}</span>
                </div>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
      <Separator className="my-8" />
    </div>
  );
}
