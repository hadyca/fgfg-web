"use client";

import { deleteAccount } from "@/app/[locale]/(main)/user-dashboard/account/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useTranslations } from "next-intl";

export default function DeleteAccountForm() {
  const t = useTranslations();
  const router = useRouter();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    const { ok, error } = await deleteAccount();

    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      toast({
        description: t("account.deleteAccountDescription"),
      });
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="font-semibold mb-2 text-destructive">
        {t("account.deleteAccount")}
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id="deleteAccount"
            onCheckedChange={(checked) => setChecked(checked === true)}
          />
          <Label htmlFor="deleteAccount">
            {t("account.deleteAccountDescription2")}
          </Label>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={loading || !checked}>
              {loading ? t("account.loading") : t("account.deleteAccount")}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>
                {t("account.deleteAccountConfirm")}
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t("account.no")}</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleSubmit()}>
                {t("account.yes")}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
