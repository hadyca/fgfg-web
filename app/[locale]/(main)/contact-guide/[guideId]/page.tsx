import { notFound } from "next/navigation";
import { getGuide } from "../../guide-profile/[guideId]/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";
import ContactGuideForm from "@/components/contact-guide-messageForm";
import getUser from "@/lib/getUser";

interface ContactGuideProps {
  params: {
    guideId: string;
  };
}

export const metadata = {
  title: "메시지 보내기",
  description:
    "FGFG 서비스에서 가이드와 직접 메시지를 주고받고 소통하세요. 여행 일정과 픽업 위치를 쉽게 조율할 수 있습니다.",
};

export default async function ContactGuide({ params }: ContactGuideProps) {
  const guideId = Number(params.guideId);
  if (isNaN(guideId)) {
    return notFound();
  }

  const guide = await getGuide(guideId);
  if (!guide.seeGuide) {
    return notFound();
  }

  const user = await getUser();

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 border">
      <div className="flex flex-row justify-between items-center text-xl">
        <div>
          <span className="font-semibold">{guide?.seeGuide?.fullname}</span>
          <span>님에게 연락하기</span>
        </div>
        <Avatar className="size-16">
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
      </div>
      {/* <Separator className="my-8" />
      <div>
        <div className="text-xl">
          해당 가이드는 FGFG의 소중한 분입니다. 매너있는 채팅 부탁드립니다.
          (자주 묻는 질문 업데이트 예정...)
        </div>
      </div> */}
      <Separator className="my-8" />
      <ContactGuideForm
        guideId={guideId}
        userId={user?.me.id}
        username={user?.me.username}
        avatar={user?.me.avatar}
      />
    </div>
  );
}
