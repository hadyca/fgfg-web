"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { useState } from "react";
import { updateIsActive } from "@/app/[locale]/(main)/(onlyGuide)/guide-dashboard/(dashboard)/profile/actions";
import { useTranslations } from "next-intl";

interface IsActiveFormProps {
  isActive: boolean;
}

export default function IsActiveForm({
  isActive: originIsActive,
}: IsActiveFormProps) {
  const t = useTranslations();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(originIsActive);

  const handleActive = async (isActive: boolean) => {
    setLoading(true);
    const { ok, error } = await updateIsActive(isActive);
    if (!ok) {
      toast({
        variant: "destructive",
        title: error,
      });
    } else {
      setIsActive(isActive);
      toast({
        description: t("profile.changeSuccess"),
      });
    }
    setLoading(false);
  };
  return (
    <div>
      <div className="font-semibold mb-2">{t("profile.isActive")}</div>
      <div className="flex flex-row justify-between items-center">
        <span>{t("profile.isActiveDescription")}</span>
        <Button disabled={loading} onClick={() => handleActive(!isActive)}>
          {loading
            ? t("profile.loading")
            : isActive
            ? t("profile.isActiveStop")
            : t("profile.isActiveStart")}
        </Button>
      </div>
    </div>
  );
}
