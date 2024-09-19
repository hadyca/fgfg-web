import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { DateTime } from "luxon";

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

export function calculateGapTimeISO(startTime: string, endTime: string) {
  // ISO 8601 형식의 문자열을 DateTime 객체로 변환
  const start = DateTime.fromISO(startTime);
  const end = DateTime.fromISO(endTime);

  // 두 시간 간의 차이를 시간 단위로 계산
  const difference = end.diff(start, "hours").hours;

  return difference;
}

export function calculateGapTime(startTime: string, endTime: string) {
  // "HH:00" 형식을 DateTime 객체로 변환하는 함수
  const toDateTime = (time: string) => {
    return DateTime.fromFormat(time, "HH:mm");
  };

  // 두 시간 간의 차이를 시간으로 계산
  const start = toDateTime(startTime);
  const end = toDateTime(endTime);

  // 차이를 분 단위로 계산
  const difference = end.diff(start, "hours").hours;

  return difference;
}
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
  }).format(amount);
}

//현재 미사용
export function convertToVietnamDate(utcDateTimeString: string) {
  const utcDate = DateTime.fromISO(utcDateTimeString, { zone: "utc" });
  const vietnamDate = utcDate.setZone("Asia/Ho_Chi_Minh");
  return vietnamDate.toFormat("yyyy.M.d");
}

export function convertToVietnamTime(utcDateTimeString: string) {
  const utcDate = DateTime.fromISO(utcDateTimeString, { zone: "utc" });
  const vietnamDate = utcDate.setZone("Asia/Ho_Chi_Minh");
  return vietnamDate.toFormat("HH:mm");
}

export function convertToVietnamISO(utcDateTimeString: string) {
  // UTC 시간대로 해석 후, 베트남 시간대로 변환
  const vietnamDate = DateTime.fromISO(utcDateTimeString, {
    zone: "utc",
  }).setZone("Asia/Ho_Chi_Minh");

  return vietnamDate.toISO();
}

export function convertToUTC(vietnamLocalTime: string) {
  // 베트남 시간대로 해석한 후 UTC 시간대로 변환
  const utcDate = DateTime.fromISO(vietnamLocalTime, {
    zone: "Asia/Ho_Chi_Minh",
  }).toUTC();

  return utcDate.toISO();
}

export function convertMonthDayIntl(isoString: string, locale: string) {
  const date = DateTime.fromISO(isoString, { zone: "Asia/Ho_Chi_Minh" });
  return date
    .setLocale(locale)
    .toLocaleString({ month: "long", day: "numeric" });
}

// ISO 8601 포맷 검증 함수
export function isValidISODate(dateString: string): boolean {
  const dt = DateTime.fromISO(dateString, { zone: "utc" });
  return dt.isValid;
}
