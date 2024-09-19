import { Separator } from "@/components/ui/separator";
import ReservationInfo from "@/components/reservationInfo";
import { Card } from "@/components/ui/card";
import { getGuide } from "../../guide-profile/[guideId]/actions";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import {
  calculateGapTimeISO,
  formatCurrency,
  isValidISODate,
} from "@/lib/utils";
import { SERVICE_FEE } from "@/lib/constants";
import ReservationLoggedInInfo from "@/components/reservatioLoggedInInfo";
import ReservationCreateAccount from "@/components/reservationCreatAccount";
import getUser from "@/lib/getUser";

interface ReservationProps {
  params: {
    guideId: string;
  };
  searchParams: {
    starttime: string;
    endtime: string;
  };
}

export default async function Reservation(props: ReservationProps) {
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

  const isMe = Boolean(guideId === user?.me.guide.id);

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 grid grid-cols-2">
      <div>
        <ReservationInfo
          startTime={props.searchParams.starttime}
          endTime={props.searchParams.endtime}
        />
        <Separator className="my-8" />
        {user ? (
          <ReservationLoggedInInfo isMe={isMe} />
        ) : (
          <ReservationCreateAccount
            guideId={guideId}
            startTime={props.searchParams.starttime}
            endTime={props.searchParams.endtime}
          />
        )}
      </div>
      <div className="flex justify-center">
        <Card className="shadow-lg max-w-md p-6 h-fit sticky top-10">
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
              <span> 님</span>
              <div className="text-sm text-muted-foreground">
                {guide?.seeGuide?.personality}
              </div>
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col gap-3">
            <div className="text-xl">요금 세부정보</div>
            <div>
              <div className="flex justify-between">
                <span className="underline">
                  {`${formatCurrency(SERVICE_FEE)} x ${calculateGapTimeISO(
                    props.searchParams.starttime,
                    props.searchParams.endtime
                  )}시간`}
                </span>
                <span>
                  {formatCurrency(
                    SERVICE_FEE *
                      calculateGapTimeISO(
                        props.searchParams.starttime,
                        props.searchParams.endtime
                      )
                  )}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}