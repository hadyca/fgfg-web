"use server";

import { client } from "@/lib/apolloClient";
import { EDIT_GUIDE_PROFILE } from "../profile/queries";
import { bankSchema } from "./schema";
import { getTranslations } from "next-intl/server";

export async function updateBank(formData: FormData) {
  const t = await getTranslations();
  const data = {
    bankname: formData.get("bankname"),
    bankAccount: formData.get("bankAccount"),
  };

  const result = bankSchema(t).safeParse(data);

  if (!result.success) {
    return { ok: false, error: "invalidData" };
  } else {
    const {
      data: {
        editGuideProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        bankname: result.data.bankname,
        bankAccount: result.data.bankAccount,
      },
    });
    return { ok, error };
  }
}
