import { notFound } from "next/navigation";
import { getGuide } from "./actions";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GuidePhoto {
  id: string;
  fileUrl: string;
  fileUrlOrder: string;
}

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
  const firstPhoto = guide.seeGuide.guidePhotos[0]; // 첫 번째 사진
  const remainingPhotos = guide.seeGuide.guidePhotos.slice(1, 8); // 나머지 최대 7장의 사진

  return (
    <div className="max-w-7xl mx-auto border">
      <Carousel>
        <CarouselContent>
          {guide?.seeGuide?.guidePhotos.map((photo) => (
            <CarouselItem key={photo.id}>
              <div className="relative size-96 rounded-md overflow-hidden">
                <Image
                  fill
                  src={`${photo.fileUrl}/detail`}
                  alt={"guide detail photo"}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
