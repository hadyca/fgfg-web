import { Skeleton } from "@/components/ui/skeleton";

export default function GetGuideSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <Skeleton className="w-60 h-72 rounded-md" />
          <div className="flex flex-col justify-center items-center gap-3">
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-20 h-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
