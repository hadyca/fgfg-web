"use client";

import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/solid";
import NavItems from "../navItems";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface NavProps {
  username: string;
  isGuide: boolean;
}

export default function HeaderSection({ username, isGuide }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false); // 링크 클릭 시 Sheet 닫기
  };

  return (
    <header>
      <div className="h-16 px-4 border-b border-b-border z-20 relative flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          FGFG
        </Link>
        {/* 데스크탑 네비게이션 메뉴 */}
        <nav className="md:block hidden">
          <NavItems username={username} isGuide={isGuide} isMobile={false} />
        </nav>
        {/* 모바일 네비게이션 메뉴 */}
        <nav className="md:hidden block">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger className="md:hidden block">
              <Bars3Icon className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent>
              <NavItems
                username={username}
                isGuide={isGuide}
                isMobile={true}
                onLinkClick={handleLinkClick}
              />
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  );
}
