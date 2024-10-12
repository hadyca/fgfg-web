"use server";

import { client } from "@/lib/apolloClient";
import { EDIT_GUIDE_PROFILE } from "./queries";
import { redirect } from "next/navigation";
import { birthdateSchema, fullnameSchema, heightSchema } from "./schema";

export async function updateFullanme(formData: FormData) {
  const data = {
    fullname: formData.get("fullname"),
  };

  const result = fullnameSchema.safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        fullname: result.data.fullname,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
  }
}

export async function updateBirthdate(formData: FormData) {
  const data = {
    birthdate: formData.get("birthdate"),
  };

  const result = birthdateSchema.safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        birthdate: result.data.birthdate,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
  }
}

export async function updateHeight(formData: FormData) {
  const data = {
    height: formData.get("height"),
  };

  const result = heightSchema.safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editGuideProfile: { ok },
      },
    } = await client.mutate({
      mutation: EDIT_GUIDE_PROFILE,
      variables: {
        height: result.data.height,
      },
    });
    if (!ok) {
      redirect("/404");
    }
    return ok;
  }
}
