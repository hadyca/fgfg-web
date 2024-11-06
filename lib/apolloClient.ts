import { HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import getSession from "./session";

const httpLink = new HttpLink({
  uri: process.env.BACKEND_URL,
});

const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  console.log(session.token);
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
