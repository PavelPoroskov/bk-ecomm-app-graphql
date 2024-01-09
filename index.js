import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { Query } from './resolvers/Query.js';
import { Course } from './resolvers/Course.js';
import { Genre } from './resolvers/Genre.js';
import { courses, genres, reviews } from './fake-db.js';
import { CONFIG } from './config.js';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
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
      courses,
      genres,
      reviews,
    }),
  },
);

console.log(`Server is running at ${url}`);
