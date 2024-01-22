import fastify from 'fastify';
import cors from '@fastify/cors';
import mercurius from 'mercurius';
import dotenv from 'dotenv';
import { getConfig } from './config.js';
import { connectDB } from './db.js';
import { graphQLSchema } from './graphql-schema/graphql-schema.js';
dotenv.config({ path: './.env' });
const CONFIG = getConfig();
const app = fastify({
    logger: process.env.NODE_ENV === 'development',
});
await connectDB(CONFIG.MONGODB_URI);
app.register(cors);
app.register(mercurius, {
    schema: graphQLSchema,
    graphiql: process.env.NODE_ENV === 'development',
});
const address = await app.listen({
    host: CONFIG.HOST,
    port: Number(CONFIG.PORT),
});
console.log(`server listening on ${address}`);
