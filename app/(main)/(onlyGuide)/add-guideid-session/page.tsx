"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import saveGuideIdSession from "./actions";

interface CheckGuideStatusProps {
  searchParams: {
    redirect: string;
  };
}

export default function AddGuideIdSession({
  searchParams,
}: CheckGuideStatusProps) {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로

  const redirectUrl = searchParams?.redirect || "/"; // 원래 URL로 리다이렉트

  useEffect(() => {
    async function updateSessionAndRedirect() {
      await saveGuideIdSession();
      if (pathname !== redirectUrl) {
        router.replace(redirectUrl);
      }
    }

    updateSessionAndRedirect();
  }, [router, redirectUrl, pathname]);

  return (
    <div className="flex justify-center items-center h-screen text-7xl font-semibold text-muted-foreground">
      Guide logging in...
    </div>
  );
}
