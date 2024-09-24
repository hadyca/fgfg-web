import { Skeleton } from "@/components/ui/skeleton";

export function GetMessageSkeleton() {
  return (
    <div className="p-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="flex gap-3 items-start mb-6">
          {/* Avatar Skeleton */}
          <Skeleton className="w-10 h-10 rounded-full" />

          {/* Message and Timestamp */}
          <div className="flex flex-col gap-2">
            {/* Message Skeleton */}
            <Skeleton className="w-60 h-6 rounded-md" />

            {/* Timestamp Skeleton */}
            <Skeleton className="w-20 h-4 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
