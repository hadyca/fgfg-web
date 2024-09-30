import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GetMessageSkeleton() {
  return (
    <div>
      {Array.from({ length: 5 }).map((_, index) => (
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

export function GetChatRoomsSkeleton() {
  return (
    <div className="min-w-xl">
      <div className="w-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-start gap-3 p-4 w-full">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="w-32 h-5 rounded-md" />
              <Skeleton className="w-40 h-4 rounded-md" />
            </div>
            <Skeleton className="w-16 h-4 rounded-md ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}
