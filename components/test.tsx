"use client";

import { gql, useQuery } from "@apollo/client";
import { client } from "@/lib/apolloClient";
import Loading from "@/app/test/loading";

const SEE_PROFILE = gql`
  query SeeProfile($userId: Int!) {
    seeProfile(userId: $userId) {
      id
    }
  }
`;

export default function ClientComponent() {
  const { data, loading } = useQuery(SEE_PROFILE, {
    variables: { userId: 1 },
  });

  return loading ? <h1>로딩2페이지</h1> : <h1>{data?.seeProfile?.id}</h1>;
}
