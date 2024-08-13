import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined", // 서버인지 클라이언트인지 확인
    link: new HttpLink({
      uri: "http://localhost:4000/", // GraphQL 서버 URL
      credentials: "same-origin", // 쿠키 등을 함께 전송할지 여부
    }),
    cache: new InMemoryCache(), // 캐시 설정
  });
}

export const client = createApolloClient(); // Apollo Client 인스턴스 생성
