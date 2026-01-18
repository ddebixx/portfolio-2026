import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://eu-central-1-shared-euc1-02.cdn.hygraph.com/content/clg6idcnc0tde01t3cvzvgg5l/master',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          projects: {
            merge: false,
          },
          myLibraries: {
            merge: false,
          },
          techstacks: {
            merge: false,
          },
          places: {
            merge: false,
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'ignore',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});