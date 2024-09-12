import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface GuidePhoto {
  id: number;
  fileUrl: string;
}

interface PhotoCarouselPros {
  guidePhotos: GuidePhoto[];
}

export default function PhotoCarousel({ guidePhotos }: PhotoCarouselPros) {
  return (
    <Carousel className="w-[200px] h-[260px] md:w-[500px] md:h-[640px] mx-auto rounded-md mb-9">
      <CarouselContent>
        {guidePhotos.map((photo: GuidePhoto) => (
          <CarouselItem key={photo.id}>
            <div className="relative w-[200px] h-[260px] md:w-[500px] md:h-[640px]  rounded-md overflow-hidden">
              <Image
                fill
                src={`${photo.fileUrl}/detail`}
                alt={`guide detail image ${photo.id}`}
                className="object-cover"
                sizes="(max-width: 768px) 200px, 500px" // 반응형 sizes 설정
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
