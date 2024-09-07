"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import saveGuideIdSession from "./actions";
import getUser from "@/lib/getUser";

interface CheckGuideStatusProps {
  searchParams: {
    redirect: string;
  };
}

export default function AddGuideIdSession({
  searchParams,
}: CheckGuideStatusProps) {
  const router = useRouter();

  useEffect(() => {
    async function updateSessionAndRedirect() {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      await saveGuideIdSession();
      const redirectUrl = searchParams?.redirect || "/"; // 원래 URL로 리다이렉트
      router.replace(redirectUrl);
    }

    updateSessionAndRedirect();
  }, [router, searchParams]);
  return (
    <div className="flex justify-center items-center h-screen text-7xl font-semibold text-muted-foreground">
      Guide logging in...
    </div>
  );
}
