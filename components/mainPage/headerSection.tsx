"use client";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavItems from "../navItems";

interface NavProps {
  username: string;
}

export default function HeaderSection({ username }: NavProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="py-4 bg-white shadow-md relative">
      <div className="flex justify-between items-center px-6">
        <Link href="/" className="text-2xl font-bold text-orange-500">
          FGFG
        </Link>
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6 text-gray-800" />
          ) : (
            <Bars3Icon className="w-6 h-6 text-gray-800" />
          )}
        </button>
        {/* 데스크탑 네비게이션 메뉴 */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          <ul className="flex flex-row gap-8 items-center">
            <NavItems username={username} />
          </ul>
        </nav>
      </div>
      {/* 모바일 네비게이션 메뉴 */}
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden absolute top-full  w-full bg-white shadow-lg z-50`}
      >
        <ul className="flex flex-col gap-4 p-6">
          <NavItems username={username} />
        </ul>
      </nav>
    </header>
  );
}
