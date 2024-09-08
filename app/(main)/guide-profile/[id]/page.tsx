import { notFound } from "next/navigation";
import { getGuide } from "./actions";
import PhotoCarousel from "@/components/photoCarousel";

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

  return (
    <div className="max-w-6xl mx-auto my-10">
      <PhotoCarousel guidePhotos={guide?.seeGuide?.guidePhotos} />
      <div>{guide?.seeGuide?.fullname}</div>
      <div>{guide?.seeGuide?.birthdate}</div>
    </div>
  );
}
