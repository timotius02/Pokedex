import { ApolloClient, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        pokemons: {
          keyArgs: [],

          merge(existing, incoming, { args: { offset = 0 } }) {
            if (!existing) return incoming;

            const merged = existing.results.slice(0);

            for (let i = 0; i < incoming.results.length; ++i) {
              merged[offset + i] = incoming.results[i];
            }

            return { ...existing, results: merged };
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "https://graphql-pokeapi.graphcdn.app",
  cache: cache,
});

export default client;
