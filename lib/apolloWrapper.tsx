"use client";

import {
  ApolloProvider,
  HttpLink,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client";

const makeClient = () => {
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
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
