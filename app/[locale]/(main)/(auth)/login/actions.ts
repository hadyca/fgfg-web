"use server";

import getSession from "@/lib/session";
import { redirect } from "@/i18n/routing";
import { LOG_IN } from "./queries";
import { client } from "@/lib/apolloClient";
import { loginSchema } from "./schema";
import { CHECK_EMAIL } from "../create-account/queries";
import { getLocale, getTranslations } from "next-intl/server";

export async function login(formData: FormData, redirectUrl: string = "/") {
  const locale = await getLocale();
  const t = await getTranslations();
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const {
    data: { checkEmail },
  } = await client.query({
    query: CHECK_EMAIL,
    variables: {
      email: data.email,
    },
  });

  if (checkEmail.ok) {
    return {
      type: "checkEmail",
      error: t("validation.invalidEmail"),
    };
  }

  const result = loginSchema(t).safeParse(data);
  if (!result.success) {
    return { type: "zodSchema", error: t("validation.invalidData") };
  } else {
    const { data } = await client.mutate({
      mutation: LOG_IN,
      variables: {
        email: result.data.email,
        password: result.data.password,
      },
    });
    if (data.login.ok) {
      const session = await getSession();
      session.token = data.login.token;
      session.guideId = data.login.guideId;
      await session.save();
      redirect({ href: redirectUrl, locale });
    } else {
      return { type: "password", error: t("validation.invalidPassword") };
    }
  }
}
