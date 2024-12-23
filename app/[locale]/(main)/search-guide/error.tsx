"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/routing";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl">😥</h1>
        <p className="text-lg mt-2">에러 페이지</p>
        <Button onClick={() => router.push("/")}>홈으로</Button>
      </div>
    </div>
  );
}
