import Fastify from 'fastify';
import fastifyCheckEnvs from '@fastify/env'
import mercurius from 'mercurius';

import { connectDB } from './db/index.js';
import { graphQLSchema } from './graphql-schema/index.js';

const fastify = new Fastify();

const requiredConfigurationEnvJsonSchema = {
  type: 'object',
  required: [ 'MONGODB_URI', 'HOST', 'PORT' ],
  properties: {
    MONGODB_URI: {
      type: 'string',
    },
    HOST: {
      type: 'string',
    },
    PORT: {
      type: 'string',
    },
  }
}

await fastify.register(fastifyCheckEnvs, {
  dotenv: true,
  schema: requiredConfigurationEnvJsonSchema,
});

await connectDB(fastify.config.MONGODB_URI)

fastify.register(mercurius, {
  schema: graphQLSchema,
  graphiql: process.env.NODE_ENV === 'development',
});

const address = await fastify.listen({
  host: fastify.config.HOST,
  port: fastify.config.PORT,
});
console.log(`server listening on ${address}`)