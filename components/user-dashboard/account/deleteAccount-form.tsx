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

export default function DeleteAccountForm() {
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
        description: "계정이 삭제 되었습니다.",
      });
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="font-semibold mb-2 text-destructive">계정 삭제</div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center gap-2">
          <Checkbox
            id="deleteAccount"
            onCheckedChange={(checked) => setChecked(checked === true)}
          />
          <Label htmlFor="deleteAccount">
            저는 계정 삭제가 영구적이며, 되돌릴 수 없다는 점을 이해합니다.
          </Label>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button disabled={loading || !checked}>
              {loading ? "로딩 중" : "계정 삭제"}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-sm">
            <AlertDialogHeader>
              <AlertDialogTitle>계정을 삭제하시겠어요?</AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>아니요</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleSubmit()}>
                확인
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
