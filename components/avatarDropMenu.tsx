import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { logout } from "@/lib/sharedActions";

interface AvatarDropMenuProps {
  avatar?: string;
  isApprovedGuide?: boolean;
}

export default function AvatarDropMenu({
  avatar,
  isApprovedGuide,
}: AvatarDropMenuProps) {
  const handleLogout = async () => {
    await logout();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar>
          <AvatarImage src={avatar} alt="@shadcn" />
          <AvatarFallback>
            <UserCircleIcon className="text-primary" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link href="/user-reservation">
          <DropdownMenuItem>
            <span>내 예약</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        {isApprovedGuide ? (
          <Link href="/guide-dashboard">
            <DropdownMenuItem>
              <span>가이드 관리</span>
            </DropdownMenuItem>
          </Link>
        ) : null}
        <Link href="/user-profile">
          <DropdownMenuItem>
            <span>계정</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>로그아웃</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
