import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import getSession from "./session";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  return {
    headers: {
      ...headers,
      token: session.token,
    },
  };
});

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined", // 서버사이드에서 사용할 경우 ssrMode 활성화
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
