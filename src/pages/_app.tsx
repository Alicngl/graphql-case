import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/graphql", // Ülkeler API'sinin URL'si buraya gelmelidir
  cache: new InMemoryCache(),
});

const getCountries = gql`
  {
    countries {
      name
      code
    }
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
