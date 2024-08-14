import { HttpLink, ApolloLink } from "@apollo/client";
import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import getSession from "./session";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
});

// authLink를 추가하여 세션에서 토큰을 가져오고 헤더에 추가합니다
const authLink = setContext(async (_, { headers }) => {
  const session = await getSession();
  return {
    headers: {
      ...headers,
      token: session.token,
    },
  };
});

const { getClient, query, PreloadQuery } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink), // authLink와 httpLink를 연결
  });
});

export const client = getClient();
