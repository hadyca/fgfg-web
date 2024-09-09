import { notFound } from "next/navigation";
import { getGuide } from "./actions";
import PhotoCarousel from "@/components/photoCarousel";
import { calculateAge } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Separator } from "@/components/ui/separator";

export default async function guideProfile({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const guide = await getGuide(id);

  if (!guide.seeGuide) {
    return notFound();
  }
  console.log(guide?.seeGuide?.language);
  return (
    <div className="max-w-6xl mx-auto my-10">
      <PhotoCarousel guidePhotos={guide?.seeGuide?.guidePhotos} />
      <div className="flex flex-row items-center gap-2 mt-6">
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
          <span className="font-semibold">{guide?.seeGuide?.fullname}</span>
          <span> 님</span>
          {!guide?.seeGuide?.isActive ? <span> (휴업 중)</span> : null}
        </div>
      </div>
      <div>
        <span>나이:</span>
        <span>{calculateAge(guide?.seeGuide?.birthdate)}세</span>
      </div>
      <div>
        <span>언어:</span>
        <span>{guide?.seeGuide?.language}</span>
      </div>
      <Separator />
    </div>
  );
}
