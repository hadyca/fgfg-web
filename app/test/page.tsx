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

// async function getData() {
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   return "data1";
// }
export default async function Test(props) {
  console.log(props);
  return (
    <div className="flex justify-center items-center h-screen">loading...</div>
  );
}
