"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  UNAVAILABLE_USERNAME,
} from "@/lib/constants";
import { z } from "zod";
import { redirect } from "next/navigation";
import { useQuery } from "@apollo/client";
import { CHECK_EMAIL, CHECK_USERNAME, CREATE_ACCOUNT } from "./queries";
import { client } from "@/lib/apolloClient";
import getSession from "@/lib/session";

const unvailableUsername = (username: string) =>
  !UNAVAILABLE_USERNAME.includes(username);

const checkPasswords = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "문자를 넣어주세요.",
        required_error: "필수 항목 입니다.",
      })
      .toLowerCase()
      .trim()
      // .transform((username) => `🔥 ${username} 🔥`)
      .refine(unvailableUsername, "사용할 수 없는 유저명입니다."), //refine은 false면 검증 실패 -> 에러메시지실행임
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const {
      data: {
        checkUsername: { ok },
      },
    } = await client.query({
      query: CHECK_USERNAME,
      variables: { username },
    });
    if (!ok) {
      ctx.addIssue({
        code: "custom",
        message: "중복된 유저명이 있습니다.",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER; // 검증 실패를 명시적으로 나타내기 위해 z.NEVER 사용
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const {
      data: {
        checkEmail: { ok },
      },
    } = await client.query({
      query: CHECK_EMAIL,
      variables: { email },
    });
    if (!ok) {
      ctx.addIssue({
        code: "custom",
        message: "중복된 이메일이 있습니다.",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
  })
  .refine(checkPasswords, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
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
    session.id = data.createAccount.id;
    session.token = data.createAccount.token;
    await session.save();
    redirect("/profile");
  }
}
