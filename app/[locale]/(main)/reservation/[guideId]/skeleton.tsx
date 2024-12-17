import { Skeleton } from "@/components/ui/skeleton";

export function GetReservationSkeletonTop() {
  return (
    <div className="min-w-sm space-y-3">
      {/* 예약 정보 제목 */}
      <Skeleton className="h-6 w-24" />

      {/* 날짜 섹션 */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-12" /> {/* 날짜 제목 */}
        <Skeleton className="h-5 w-20" /> {/* 날짜 값 */}
      </div>

      {/* 시간 섹션 */}
      <div className="space-y-1">
        <Skeleton className="h-4 w-12" /> {/* 시간 제목 */}
        <Skeleton className="h-5 w-28" /> {/* 시간 값 */}
      </div>
    </div>
  );
}

export function GetReservationSkeletonBottom() {
  return (
    <div className="min-w-xl space-y-6">
      {/* 결제 수단 */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" /> {/* 결제 수단 제목 */}
        <Skeleton className="h-12 w-full" /> {/* 카드 번호 */}
        <div className="flex space-x-4">
          <Skeleton className="h-12 w-1/2" /> {/* 만료 날짜 */}
          <Skeleton className="h-12 w-1/2" /> {/* 보안 코드 */}
        </div>
        <Skeleton className="h-12 w-full" /> {/* 국가 선택 */}
      </div>
    </div>
  );
}
