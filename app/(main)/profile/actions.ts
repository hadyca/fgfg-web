"use server";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}

//가이드 탈퇴할 때 - 세션 가이드 삭제 해야함
//계정 삭제 할 때 - 세션 destroy해야함
