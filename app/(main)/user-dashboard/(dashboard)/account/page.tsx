import { logout } from "@/lib/sharedActions";
import getUser from "@/lib/getUser";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import AccountInfo from "@/components/user-dashboard/account/account-info";

export default async function Account() {
  const user = await getUser();
  return (
    <>
      <div className="flex flex-row items-center mb-3">
        <Link href={"/user-dashboard"}>
          <span className="text-primary text-lg">대쉬보드</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">계정</span>
      </div>
      <AccountInfo
        avatar={user?.me.avatar}
        username={user?.me.username}
        email={user?.me.email}
      />
    </>
  );
}
