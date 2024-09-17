"use server";

import { client } from "@/lib/apolloClient";
import { signUpGuideSchema } from "./schema";
import { CREATE_GUIDE } from "./queries";
import getUser from "@/lib/getUser";
import { notFound } from "next/navigation";

export async function userCheck() {
  const user = await getUser();

  return user;
}

export async function signupGuide(formData: FormData) {
  const data = {
    fullname: formData.get("fullname"),
    birthdate: formData.get("birthdate"),
    height: formData.get("height"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    resumePhoto: formData.get("resumePhoto"),
    selfIntro: formData.get("selfIntro"),
    language: formData.get("language")
      ? JSON.parse(formData.get("language") as string)
      : null,
  };

  const result = signUpGuideSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const {
      data: {
        createGuide: { ok },
      },
    } = await client.mutate({
      mutation: CREATE_GUIDE,
      variables: {
        fullname: result.data.fullname,
        birthdate: result.data.birthdate,
        height: result.data.height,
        address: result.data.address,
        phone: result.data.phone,
        resumePhoto: result.data.resumePhoto,
        selfIntro: result.data.selfIntro,
        language: result.data.language,
      },
    });
    if (!ok) {
      return notFound();
    }
    return;
  }
}

export async function getUploadUrl() {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  return data;
}
