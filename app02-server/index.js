import Fastify from 'fastify';
import fastifyCheckEnvs from '@fastify/env'
import mercurius from 'mercurius';

import { graphQLSchema } from './schema.js';

const fastify = new Fastify();

const requiredConfigurationEnvJsonSchema = {
  type: 'object',
  required: [ 'HOST', 'PORT' ],
  properties: {
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

fastify.register(mercurius, {
  schema: graphQLSchema,
  graphiql: process.env.NODE_ENV === 'development',
});

const address = await fastify.listen({
  host: fastify.config.HOST,
  port: fastify.config.PORT,
});

console.log(`server listening on ${address}`)