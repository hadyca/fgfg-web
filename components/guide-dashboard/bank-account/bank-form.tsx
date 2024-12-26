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
} from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/bank-account/schema";
import { updateBank } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/bank-account/actions";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import {
  CalendarIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BANK_OPTIONS } from "@/lib/constants";

interface BankFormProps {
  bankname?: BankType["bankname"];
  bankAccount?: string;
}

export default function BankForm({ bankname, bankAccount }: BankFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue: setFormValue,
    formState: { errors },
  } = useForm<BankType>({
    resolver: zodResolver(bankSchema(t)),
    defaultValues: {
      bankname: bankname || undefined,
      bankAccount: bankAccount || undefined,
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
        description: t("bankAccount.changeSuccess"),
      });
    }

    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] pb-10">
      <form onSubmit={handleSubmit(onValid)}>
        <div className="font-semibold mb-2">{t("bankAccount.bankName")}</div>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-64 justify-between"
              >
                {selectedBankname || t("bankAccount.selectBank")}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-64 p-0"
              side="bottom"
              align="start"
              sideOffset={4}
              alignOffset={0}
              avoidCollisions={false}
            >
              <Command>
                <CommandInput placeholder={t("bankAccount.selectBank")} />
                <CommandList>
                  <CommandEmpty>{t("bankAccount.bankNotFound")}</CommandEmpty>
                  <CommandGroup>
                    {BANK_OPTIONS.map((bank) => (
                      <CommandItem
                        key={bank}
                        value={bank}
                        onSelect={(currentValue) => {
                          setFormValue(
                            "bankname",
                            currentValue as BankType["bankname"]
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedBankname === bank
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {bank}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors?.bankname ? (
            <ErrorText text={errors.bankname.message!} />
          ) : null}
        </div>
        <div className="font-semibold mt-6 mb-2">
          {t("bankAccount.bankAccountNumber")}
        </div>
        <div className="flex flex-row justify-between items-center">
          <Input
            className="w-64"
            type="number"
            {...register("bankAccount")}
            required
          />
          <Button disabled={loading}>
            {loading ? t("bankAccount.loading") : t("bankAccount.save")}
          </Button>
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
            {t("bankAccount.paymentAfter")}
          </div>
          <div className="text-muted-foreground">
            {t("bankAccount.paymentAfterDescription")}
          </div>
          <Separator className="my-6" />
          <ExclamationTriangleIcon className="size-16" strokeWidth={1.2} />
          <div className="text-lg font-semibold mb-2">
            {t("bankAccount.wrongAccountNumber")}
          </div>
          <div className="text-muted-foreground">
            {t("bankAccount.wrongAccountNumberDescription")}
          </div>
          <Separator className="my-6" />
          <QuestionMarkCircleIcon className="size-16" strokeWidth={1.2} />
          <div className="text-lg font-semibold mb-2">
            {t("bankAccount.myBankNotInList")}
          </div>
          <div className="text-muted-foreground">
            {t("bankAccount.myBankNotInListDescription")}
          </div>
        </Card>
      </div>
    </div>
  );
}
