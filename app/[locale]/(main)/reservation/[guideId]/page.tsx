import { Separator } from "@/components/ui/separator";
import ReservationInfo from "@/components/reservation/reservationInfo";
import { Card } from "@/components/ui/card";
import { getGuide } from "../../guide-profile/[guideId]/actions";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import {
  calculateGapTimeISO,
  formatCurrency,
  isValidISODate,
} from "@/lib/utils";
import { PERSONALITY_OPTIONS, HOUR_FEE } from "@/lib/constants";
import ReservationCreateAccount from "@/components/reservation/reservationCreatAccount";
import getUser from "@/lib/getUser";
import ReservationLoggedInInfo from "@/components/reservation/reservatioLoggedInInfo";
import { getLocale, getTranslations } from "next-intl/server";

interface ReservationProps {
  params: {
    guideId: string;
  };
  searchParams: {
    starttime: string;
    endtime: string;
  };
}

export const metadata = {
  title: "예약",
  description:
    "예약 내용을 확인하고 최종 확정하세요. 일정과 정보를 검토한 후 예약을 완료할 수 있습니다.",
};

export default async function Reservation(props: ReservationProps) {
  const locale = await getLocale();
  const t = await getTranslations();
  const guideId = Number(props.params.guideId);
  if (isNaN(guideId)) {
    return notFound();
  }

  const guide = await getGuide(guideId);
  if (!guide.seeGuide) {
    return notFound();
  }
  const { starttime, endtime } = props.searchParams;

  // starttime과 endtime이 존재하고, 유효한 ISO 포맷인지 검증
  if (
    !starttime ||
    !endtime ||
    !isValidISODate(starttime) ||
    !isValidISODate(endtime)
  ) {
    // 값이 없거나 유효하지 않으면 "/"로 리다이렉트
    redirect("/");
  }

  const user = await getUser();

  const isMe = Boolean(guideId === user?.me?.guide?.id);

  const amount =
    HOUR_FEE *
    calculateGapTimeISO(
      props.searchParams.starttime,
      props.searchParams.endtime
    );

  return (
    <div className="max-w-6xl mx-auto my-10 px-6 grid grid-cols-1 md:grid-cols-2 md:flex-col">
      <div className="md:order-1 order-2">
        <ReservationInfo
          startTime={props.searchParams.starttime}
          endTime={props.searchParams.endtime}
        />
        <Separator className="my-8" />
        {user ? (
          <ReservationLoggedInInfo
            isMe={isMe}
            amount={amount}
            guideId={guideId}
            userId={user?.me?.id}
            username={user?.me?.username}
            avatar={user?.me?.avatar}
            email={user?.me?.email}
            startTime={props.searchParams.starttime}
            endTime={props.searchParams.endtime}
          />
        ) : (
          <ReservationCreateAccount
            guideId={guideId}
            startTime={props.searchParams.starttime}
            endTime={props.searchParams.endtime}
          />
        )}
      </div>
      <div className="md:order-2 order-1 flex justify-center mb-6 w-full">
        <Card className="shadow-lg w-96 p-6 h-fit sticky top-10">
          <div className="flex flex-row gap-3 items-center">
            <div className="relative size-32 rounded-md overflow-hidden flex-shrink-0">
              <Image
                fill
                src={`${guide?.seeGuide?.mainGuidePhoto?.fileUrl}/mainphoto`}
                alt={"guide main photo"}
                className="object-cover"
                sizes="128px"
                priority
              />
            </div>
            <div>
              <span className="font-semibold">{guide?.seeGuide?.fullname}</span>
              <div className="text-sm text-muted-foreground">
                {PERSONALITY_OPTIONS.find(
                  (option) => option.value === guide?.seeGuide?.personality
                )?.[locale as "en" | "ko" | "vn"] ||
                  guide?.seeGuide?.personality}
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col gap-3">
            <div className="text-lg">{t("reservation.feeDetail")}</div>
            <div>
              <div className="flex justify-between">
                <span className="underline">
                  {`${formatCurrency(HOUR_FEE)} x ${calculateGapTimeISO(
                    props.searchParams.starttime,
                    props.searchParams.endtime
                  )}${t("reservation.hour")}`}
                </span>
                <span>{formatCurrency(amount)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
