"use client";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl">😥</h1>
        <p className="text-lg mt-2">에러 페이지</p>
        <button
          onClick={() => router.push("/")}
          className="primary-btn mt-4 h-10 disabled:bg-neutral-400  disabled:text-neutral-300 disabled:cursor-not-allowed"
        >
          홈으로
        </button>
      </div>
    </div>
  );
}
