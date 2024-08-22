"use client";

import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";
import NavItems from "../navItems";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface NavProps {
  username: string;
  isGuide: boolean;
}

export default function HeaderSection({ username, isGuide }: NavProps) {
  return (
    <header className="py-4 bg-white border border-b-slate-200 relative">
      <div className="flex justify-between items-center px-10">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          FGFG
        </Link>
        {/* 데스크탑 네비게이션 메뉴 */}
        <nav className="md:block hidden">
          <NavItems username={username} isGuide={isGuide} isMobile={false} />
        </nav>
        {/* 모바일 네비게이션 메뉴 */}
        <nav className="md:hidden block">
          <Sheet>
            <SheetTrigger className="md:hidden block">
              <Bars3Icon className="w-6 h-6 text-black" />
            </SheetTrigger>

            <SheetContent>
              <NavItems username={username} isGuide={isGuide} isMobile={true} />
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
