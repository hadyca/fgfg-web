import { client } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { Suspense } from "react";
import Loading from "./loading";
import ClientComponent from "@/components/test";

// const SEE_PROFILE = gql`
//   query SeeProfile($userId: Int!) {
//     seeProfile(userId: $userId) {
//       id
//     }
//   }
// `;

async function getData() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return "data1";
}
export default async function Home() {
  // const { data } = await client().query({
  //   query: SEE_PROFILE,
  //   variables: { userId: 1 },
  // });
  const data = await getData();
  console.log(data);
  return (
    <main>
      <h1>이거 기본</h1>
      {data}
    </main>
  );
}
