import { Separator } from "@/components/ui/separator";
import ReservationInfo from "@/components/reservationInfo";
import { Card } from "@/components/ui/card";
import { getGuide } from "../../guide-profile/[guideId]/actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import { calculateGapTimeISO, formatCurrency } from "@/lib/utils";
import { SERVICE_FEE } from "@/lib/constants";
import getSession from "@/lib/session";
import ReservationLoggedInInfo from "@/components/reservatioLoggedInInfo";
import ReservationCreateAccount from "@/components/reservationCreatAccount";

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

  const session = await getSession();
  const isLogin = session.token;

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 grid grid-cols-2">
      <div>
        <ReservationInfo
          startTime={props.searchParams.starttime}
          endTime={props.searchParams.endtime}
        />
        <Separator className="my-8" />
        {isLogin ? <ReservationLoggedInInfo /> : <ReservationCreateAccount />}
      </div>
      <div className="flex justify-center">
        <Card className="shadow-lg max-w-md p-6 h-fit sticky top-10">
          <div className="flex flex-row gap-3 items-center">
            <div className="relative size-32 rounded-md overflow-hidden">
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
