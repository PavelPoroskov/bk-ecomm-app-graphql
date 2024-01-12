import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
// TODO import as schema.graphql
import { typeDefs } from './schema.js';
import { Query } from './resolvers/Query.js';
import { Mutation } from './resolvers/Mutation.js';
import { Course } from './resolvers/Course.js';
import { Genre } from './resolvers/Genre.js';
import { db } from './fake-db.js';
import { CONFIG } from './config.js';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Course,
    Genre,
  },
});

const { url } = await startStandaloneServer(
  server,
  {
    listen: {
      port: CONFIG.PORT,
    },
    context: async () => ({
      db,
    }),
  },
);

console.log(`Server is running at ${url}`);
