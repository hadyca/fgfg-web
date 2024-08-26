"use server";

import { client } from "@/lib/apolloClient";
import { signUpGuideSchema } from "./schema";
import { CREATE_GUIDE } from "./queries";
import { redirect } from "next/navigation";
import getUser from "@/lib/getUser";

export async function userCheck() {
  const result = await getUser();

  return result;
}

export async function signupGuide(formData: FormData) {
  const data = {
    fullname: formData.get("fullname"),
    birthdate: formData.get("birthdate"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    photo: formData.get("photo"),
    selfIntro: formData.get("selfIntro"),
  };

  const result = signUpGuideSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    await client.mutate({
      mutation: CREATE_GUIDE,
      variables: {
        fullname: result.data.fullname,
        birthdate: result.data.birthdate,
        address: result.data.address,
        phone: result.data.phone,
        photo: result.data.photo,
        selfIntro: result.data.selfIntro,
      },
    });
    redirect("/");
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
