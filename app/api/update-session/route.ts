import { NextResponse } from "next/server";
import getSession from "@/lib/session";

export async function POST(request: Request) {
  const session = await getSession();

  const { guideId } = await request.json();

  session.guideId = Number(guideId);
  await session.save();

  return NextResponse.json({ success: true });
}
