import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { CONFIG } from './config.js';

const typeDefs = `#graphql
  type Query {
    welcome: String
  }
`;

const resolvers = {
  Query: {
    welcome: () => {
      return "Hello World from GraphQL"
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: CONFIG.PORT },
});

console.log(`Server is running at ${url}`);
