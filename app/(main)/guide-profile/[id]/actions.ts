import { client } from "@/lib/apolloClient";
import { SEE_GUIDE } from "./queries";
import { redirect } from "next/navigation";
import { searchGuideSchema } from "../../schema";

export async function getGuide(guideId: number) {
  const { data } = await client.query({
    query: SEE_GUIDE,
    variables: {
      guideId,
    },
  });
  return data;
}

export async function reserveGuide(formData: FormData, guideId: number) {
  const data = {
    date: formData.get("date"),
    startTime: formData.get("startTime"),
    endTime: formData.get("endTime"),
  };

  const result = searchGuideSchema.safeParse(data);

  if (!result.success) {
    // return result.error.flatten(); --> 해당 데이터를 화면에 보여줄 필요가 없으니 아래와 같이 처리
    return { ok: false, error: "유효하지 않은 데이터" };
  } else {
    const startTime = `${result.data.date}T${result.data.startTime}:00.000Z`;
    const endTime = `${result.data.date}T${result.data.endTime}:00.000Z`;

    // redirect(
    //   `/search-guide?startTime=${encodeURIComponent(
    //     startTime
    //   )}&endTime=${encodeURIComponent(endTime)}`
    // );
  }
}
