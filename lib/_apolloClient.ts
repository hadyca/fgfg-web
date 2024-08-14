import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import getSession from "./session";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  console.log(session);
  return {
    headers: {
      ...headers,
      Authorization: session?.token ? `Bearer ${session.token}` : "",
    },
  };
});

export function createApolloClient() {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink), // authLink와 httpLink를 연결
  });
}

export const client = createApolloClient(); // Apollo Client 인스턴스 생성
