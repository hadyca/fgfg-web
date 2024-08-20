"use server";
import { redirect } from "next/navigation";
import { searchGuideSchema } from "./schema";

export async function searchGuide(formData: FormData) {
  const data = {
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };

  const result = searchGuideSchema.safeParse(data);

  if (!result.success) {
    return result.error.flatten();
  } else {
    const startTime = `${result.data.date}T${result.data.startTime}:00.000Z`;
    const endTime = `${result.data.date}T${result.data.endTime}:00.000Z`;

    redirect(
      `/search-guide?startTime=${encodeURIComponent(
        startTime
      )}&endTime=${encodeURIComponent(endTime)}`
    );
  }
}
