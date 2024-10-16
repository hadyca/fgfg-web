import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import getGuide from "@/lib/getGuide";
import BankForm from "@/components/guide-dashboard/bank-account/bank-form";

export default async function BankAccount() {
  const guide = await getGuide();

  return (
    <>
      <div className="flex flex-row items-center mb-2">
        <Link href={"/guide-dashboard"}>
          <span className="text-primary text-lg">가이드 관리</span>
        </Link>
        <ChevronRightIcon className="size-4" />
        <span className="text-lg">입금 계좌</span>
      </div>
      <div className="font-bold text-3xl mb-10">입금 계좌</div>
      <BankForm
        bankname={guide?.seeMyGuide?.bankname}
        bankAccount={guide?.seeMyGuide?.bankAccount}
      />
    </>
  );
}
