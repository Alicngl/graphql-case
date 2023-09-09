import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql", // Ülkeler API'sinin URL'si buraya gelmelidir
  cache: new InMemoryCache(),
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
