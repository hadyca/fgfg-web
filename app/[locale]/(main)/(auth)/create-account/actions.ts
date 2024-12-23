"use server";

import { redirect } from "next/navigation";
import { CHECK_EMAIL, CHECK_USERNAME, CREATE_ACCOUNT } from "./queries";
import getSession from "@/lib/session";
import { client } from "@/lib/apolloClient";
import { createAccountSchema } from "./schema";
import { getTranslations } from "next-intl/server";

export async function createAccount(
  formData: FormData,
  redirectUrl: string = "/"
) {
  const t = await getTranslations();
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const {
    data: { checkUsername },
  } = await client.query({
    query: CHECK_USERNAME,
    variables: {
      username: data.username,
    },
  });

  if (!checkUsername.ok) {
    return {
      type: "checkUsername",
      error: t("validation.createAccount.duplicateUsername"),
    };
  }

  const {
    data: { checkEmail },
  } = await client.query({
    query: CHECK_EMAIL,
    variables: {
      email: data.email,
    },
  });

  if (!checkEmail.ok) {
    return {
      type: "checkEmail",
      error: t("validation.createAccount.duplicateEmail"),
    };
  }

  const result = createAccountSchema(t).safeParse(data);

  if (!result.success) {
    return { type: "zodSchema", error: t("validation.invalidData") };
  } else {
    const { data } = await client.mutate({
      mutation: CREATE_ACCOUNT,
      variables: {
        username: result.data.username,
        email: result.data.email,
        password: result.data.password,
      },
    });
    const session = await getSession();
    session.token = data.createAccount.token;
    await session.save();
    redirect(redirectUrl);
  }
}
