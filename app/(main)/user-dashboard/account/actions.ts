"use server";

import { client } from "@/lib/apolloClient";
import { CHECK_PASSWORD, DELETE_ACCOUNT, EDIT_USER_PROFILE } from "./queries";
import { redirect } from "next/navigation";
import {
  CHECK_EMAIL,
  CHECK_USERNAME,
} from "@/app/(main)/(auth)/create-account/queries";
import { emailSchema, passwordSchema, usernameSchema } from "./schema";
import getSession from "@/lib/session";

export async function updateAvatar(formData: FormData) {
  const data = {
    avatar: formData.get("avatar"),
  };

  const {
    data: {
      editUserProfile: { ok, error },
    },
  } = await client.mutate({
    mutation: EDIT_USER_PROFILE,
    variables: {
      avatar: data.avatar,
    },
  });
  return { ok, error };
}

export async function updateUsername(formData: FormData) {
  const data = {
    username: formData.get("username"),
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
      error: "중복된 유저명이 있습니다.",
    };
  }

  const result = usernameSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editUserProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_USER_PROFILE,
      variables: {
        username: result.data.username,
      },
    });
    return { ok, error };
  }
}

export async function updateEmail(formData: FormData) {
  const data = {
    email: formData.get("email"),
  };
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
      error: "중복된 이메일이 있습니다.",
    };
  }

  const result = emailSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editUserProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_USER_PROFILE,
      variables: {
        email: result.data.email,
      },
    });
    return { ok, error };
  }
}

export async function updatePassword(formData: FormData) {
  const data = {
    password: formData.get("password"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };
  const {
    data: { checkPassword },
  } = await client.query({
    query: CHECK_PASSWORD,
    variables: {
      password: data.password,
    },
  });

  if (!checkPassword.ok) {
    return {
      type: "checkPassword",
      error: "비밀번호가 틀렸습니다.",
    };
  }

  const result = passwordSchema.safeParse(data);

  if (!result.success) {
    return { ok: false, error: "유효하지 않은 데이터 입니다." };
  } else {
    const {
      data: {
        editUserProfile: { ok, error },
      },
    } = await client.mutate({
      mutation: EDIT_USER_PROFILE,
      variables: {
        password: result.data.newPassword,
      },
    });
    return { ok, error };
  }
}

export async function deleteAccount() {
  const {
    data: {
      deleteAccount: { ok, error },
    },
  } = await client.mutate({
    mutation: DELETE_ACCOUNT,
  });
  if (!ok) {
    return { ok, error };
  }
  const session = await getSession();
  session.destroy();
  return { ok, error };
}
