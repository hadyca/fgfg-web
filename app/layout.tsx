import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apolloWrapper";
import { Toaster } from "@/components/ui/toaster";
import { headers } from "next/headers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    template: "%s - FGFG Foreign GirlFriend Guide",
    default: "FGFG Foreign GirlFriend Guide",
  },
  description: "베트남 여친 가이드 서비스, FGFG에서 만나요!",
  keywords: [
    "FGFG",
    "FGFG Global",
    "Foreign Girlfriend Guide",
    "국제결혼",
    "국제연애",
    "국제커플",
    "베트남",
    "베트남 여친",
    "베트남 연애",
    "베트남 여자",
    "렌탈 여친",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const userLang = headers().get("accept-language") || "en";
  return (
    <html lang="en">
      <body
        className={cn("min-h-screen font-sans antialiased", fontSans.variable)}
      >
        <ApolloWrapper>{children}</ApolloWrapper>
        <Toaster />
      </body>
    </html>
  );
}
