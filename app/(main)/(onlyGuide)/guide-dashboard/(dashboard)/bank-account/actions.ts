"use server";

import { client } from "@/lib/apolloClient";
import { EDIT_GUIDE_PROFILE } from "../profile/queries";
import { bankSchema } from "./schema";

export async function updateBank(formData: FormData) {
  const data = {
    bankname: formData.get("bankname"),
    bankAccount: formData.get("bankAccount"),
  };

  const result = bankSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
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
