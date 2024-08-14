"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
import { CHECK_EMAIL } from "../create-account/queries";
import { LOG_IN } from "./queries";
import { client } from "@/lib/apolloClient";

const checkEmailExists = async (email: string) => {
  const {
    data: {
      checkEmail: { ok },
    },
  } = await client.query({
    query: CHECK_EMAIL,
    variables: {
      email,
    },
  });
  return Boolean(!ok);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "존재 하지 않는 이메일 입니다."),
  password: z.string({
    required_error: "Password is required",
  }),
  // .min(PASSWORD_MIN_LENGTH),
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function logIn(prevState: any, formData: FormData) {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
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
      await session.save();
      redirect("/");
    } else {
      return {
        fieldErrors: {
          password: ["비밀번호가 틀렸습니다."],
          email: [],
        },
      };
    }
  }
}
