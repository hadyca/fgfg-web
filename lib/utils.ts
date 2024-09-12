import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthdate: string) {
  const today = new Date();
  const birthDate = new Date(birthdate);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  // 아직 생일이 지나지 않았다면 나이를 1살 줄인다.
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export function calculateGapTime(startTime: string, endTime: string) {
  // "HH:00" 형식에서 시간을 분으로 변환하는 함수
  const toMinutes = (time: string) => {
    const [hours] = time.split(":").map(Number); // 분은 항상 0이므로 무시 가능
    return hours * 60;
  };

  // 두 시간 간의 차이를 분으로 계산
  const startMinutes = toMinutes(startTime);
  const endMinutes = toMinutes(endTime);
  const difference = endMinutes - startMinutes;

  // 차이를 시간으로 변환
  const hours = Math.floor(difference / 60);

  return hours;
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}
