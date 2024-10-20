"use client";

import ErrorText from "@/components/errorText";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  bankSchema,
  BankType,
} from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/bank-account/schema";
import { updateBank } from "@/app/(main)/(onlyGuide)/guide-dashboard/(dashboard)/bank-account/actions";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import {
  CalendarIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";

interface BankFormProps {
  bankname?:
    | "Vietcombank"
    | "VietinBank"
    | "BIDV"
    | "Techcombank"
    | "Sacombank"
    | "VPBank"
    | "MB Bank"
    | "ACB"
    | "TPBank"
    | "Eximbank"
    | "HDBank"
    | "HSBC Vietnam"
    | "Citibank Vietnam"
    | "ANZ Vietnam"
    | "Shinhan Bank"
    | "Woori Bank"
    | "Standard Chartered Bank"
    | "Deutsche Bank";
  bankAccount?: string;
}

export default function BankForm({ bankname, bankAccount }: BankFormProps) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<BankType>({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      bankname,
      bankAccount,
    },
  });

  const selectedBankname = watch("bankname");

  const onValid = async (data: BankType) => {
    if (bankname === data.bankname && bankAccount === data.bankAccount) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("bankname", data.bankname);
    formData.append("bankAccount", data.bankAccount);

    const { ok, error } = await updateBank(formData);

    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      toast({
        description: "변경 되었습니다.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] pb-10">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="font-semibold mb-2">은행명</div>
        <div>
          <select
            {...register("bankname")}
            required
            value={selectedBankname || ""}
            className={`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border p-3 rounded-md text-sm w-56 ${
              selectedBankname ? "" : "text-muted-foreground"
            }`}
          >
            <option value="" disabled hidden>
              은행을 선택해주세요
            </option>
            <option value="Vietcombank" className="text-black">
              Vietcombank
            </option>
            <option value="VietinBank" className="text-black">
              VietinBank
            </option>
            <option value="BIDV" className="text-black">
              BIDV
            </option>
            <option value="Techcombank" className="text-black">
              Techcombank
            </option>
            <option value="Sacombank" className="text-black">
              Sacombank
            </option>
            <option value="VPBank" className="text-black">
              VPBank
            </option>
            <option value="MB Bank" className="text-black">
              MB Bank
            </option>
            <option value="ACB" className="text-black">
              ACB
            </option>
            <option value="TPBank" className="text-black">
              TPBank
            </option>
            <option value="Eximbank" className="text-black">
              Eximbank
            </option>
            <option value="HDBank" className="text-black">
              HDBank
            </option>
            <option value="HSBC Vietnam" className="text-black">
              HSBC Vietnam
            </option>
            <option value="Citibank Vietnam" className="text-black">
              Citibank Vietnam
            </option>
            <option value="ANZ Vietnam" className="text-black">
              ANZ Vietnam
            </option>
            <option value="Shinhan Bank" className="text-black">
              Shinhan Bank
            </option>
            <option value="Woori Bank" className="text-black">
              Woori Bank
            </option>
            <option value="Standard Chartered Bank" className="text-black">
              Standard Chartered Bank
            </option>
            <option value="Deutsche Bank" className="text-black">
              Deutsche Bank
            </option>
          </select>
          {errors?.bankname ? (
            <ErrorText text={errors.bankname.message!} />
          ) : null}
        </div>
        <div className="font-semibold mt-6 mb-2">계좌 번호</div>
        <div className="flex flex-row justify-between items-center">
          <Input
            className="w-2/3"
            type="number"
            {...register("bankAccount")}
            required
          />
          <Button disabled={loading}>{loading ? "로딩 중" : "저장"}</Button>
        </div>
        {errors?.bankAccount ? (
          <ErrorText text={errors.bankAccount.message!} />
        ) : null}
      </form>
      <Separator className="md:hidden my-10" />
      <div className="px-14">
        <Card className="p-6">
          <CalendarIcon className="size-16" strokeWidth={1.2} />
          <div className="text-lg font-semibold mb-2">
            고객이 결제를 마친 후, 정산은 언제 이루어지나요?
          </div>
          <div className="text-muted-foreground">
            가이드님이 예약을 수락하면 고객의 결제가 진행되며, 이후 수수료를
            제외한 금액이 보통 1~2주 이내에 이체됩니다.
          </div>
          <Separator className="my-6" />
          <ExclamationTriangleIcon className="size-16" strokeWidth={1.2} />
          <div className="text-lg font-semibold mb-2">
            계좌 번호를 잘못 입력한 경우, 다시 정산을 받을 수 있나요?
          </div>
          <div className="text-muted-foreground">
            다른 계좌로 이체된 경우에는 재정산이 어렵지만, 이체되지 않은 금액은
            다시 정산이 가능합니다. 문제가 발생할 경우, 운영자에게 이메일로
            문의해 주세요.
          </div>
          <Separator className="my-6" />
          <QuestionMarkCircleIcon className="size-16" strokeWidth={1.2} />
          <div className="text-lg font-semibold mb-2">
            내가 거래 하는 은행이 선택항목에 없으면 어떻게 하나요?
          </div>
          <div className="text-muted-foreground">
            운영자에게 이메일을 보내주시면, 바로 추가해드리겠습니다!
          </div>
        </Card>
      </div>
    </div>
  );
}
