import { notFound } from "next/navigation";
import { getGuide } from "./actions";
import PhotoCarousel from "@/components/guide-profile/photoCarousel";
import {
  calculateAge,
  convertToVietnamDate,
  convertToVietnamTime,
} from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import ReservationDateForm from "@/components/guide-profile/reservationDateForm";
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
import getUser from "@/lib/getUser";
import CreateChatRoomBtn from "@/components/guide-profile/createChatRoomBtn";
import { DateTime } from "luxon";
import { Metadata } from "next";

interface GuideProfileProps {
  params: {
    guideId: string;
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
  userCancel: boolean;
  guideCancel: boolean;
}

export async function generateMetadata({
  params,
}: GuideProfileProps): Promise<Metadata> {
  const guideId = Number(params.guideId);
  if (isNaN(guideId)) {
    return { title: "가이드를 찾을 수 없습니다" };
  }

  const guide = await getGuide(guideId);
  if (!guide?.seeGuide) {
    return { title: "가이드를 찾을 수 없습니다" };
  }

  return {
    title: guide.seeGuide.fullname,
    description: `${guide.seeGuide.fullname}님의 프로필 내용을 확인하고, 예약을 진행해보세요!`,
  };
}

export default async function guideProfile(props: GuideProfileProps) {
  const guideId = Number(props.params.guideId);
  if (isNaN(guideId)) {
    return notFound();
  }
  const guide = await getGuide(guideId);
  if (!guide.seeGuide) {
    return notFound();
  }

  const filteredReservations = guide?.seeGuide?.reservations.filter(
    (reservation: Reservation) => {
      const now = DateTime.now().toISO();
      return (
        now < reservation.startTime && //예약 시작 시간이 미래 시간
        !reservation.userCancel &&
        !reservation.guideCancel
      ); //유저캔슬과 가이드캔슬이 아닌 것들
    }
  );

  const user = await getUser();

  const isMe = Boolean(guideId === user?.me?.guide?.id);

  return (
    <div className="max-w-6xl mx-auto my-10 px-6">
      <PhotoCarousel guidePhotos={guide?.seeGuide?.guidePhotos} />
      <div className="grid grid-cols-1 md:grid-cols-10">
        <div className="w-full md:col-span-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Avatar>
                {guide?.seeGuide?.user?.avatar ? (
                  <>
                    <AvatarImage
                      src={`${guide?.seeGuide?.user?.avatar}/avatar`}
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      <UserCircleIcon className="text-primary w-full h-full" />
                    </AvatarFallback>
                  </>
                ) : (
                  <UserCircleIcon className="text-primary w-full h-full" />
                )}
              </Avatar>
              <div className="flex flex-row items-center">
                <div className="mr-3">
                  <span>가이드: </span>
                  <span className="font-semibold">
                    {guide?.seeGuide?.fullname}
                  </span>
                  <span className="ml-1">님</span>
                  {!guide?.seeGuide?.isActive ? (
                    <span className="ml-1">(휴업 중)</span>
                  ) : null}
                </div>
                {!isMe && guide?.seeGuide?.isActive ? (
                  <CreateChatRoomBtn
                    userId={user?.me?.id}
                    guideId={guideId}
                    startTime={props.searchParams?.starttime}
                    endTime={props.searchParams?.endtime}
                  />
                ) : null}
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
                <span>베트남어(원어민), </span>
                {guide?.seeGuide?.language
                  ? guide?.seeGuide?.language.map(
                      (language: Language, index: number) => (
                        <span key={language.id}>
                          {language.language}lv{language.level}
                          {index < guide?.seeGuide?.language.length - 1 && ", "}
                        </span>
                      )
                    )
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
        <div className="md:col-span-4 flex flex-col justify-start items-center">
          <div className="flex flex-col gap-3 sticky top-10">
            <ReservationDateForm
              guideId={guideId}
              searchParams={props.searchParams}
              reservations={filteredReservations}
              isActive={guide?.seeGuide?.isActive}
              isMe={isMe}
            />
            <ReportForm guideId={guideId} />
          </div>
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
                    픽업 위치를 바꾸고 싶으시다면, 가이드님께 메시지를 보내
                    보세요!
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                guide?.seeGuide?.pickupPlaceMain
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary"
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
        {filteredReservations.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {filteredReservations.map((reservation: Reservation) => (
              <Card key={reservation.id} className="shadow-sm p-2 inline-block">
                <div className="flex items-center gap-1">
                  <span>{convertToVietnamDate(reservation.startTime)}</span>
                  <Separator
                    className="w-[1px] h-4 bg-gray-300"
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
