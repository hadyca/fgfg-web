"use client";

import {
  ApolloProvider,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.BACKEND_URL,
  });
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
};

const client = makeClient();

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
