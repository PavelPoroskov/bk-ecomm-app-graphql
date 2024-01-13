training:
  MongoDb,
  Authentication,
  GraphQL (schema first), GraphQL (code first),

TODO ?tests for graphql API
  TODO use the same api (projects and clients) in all app0x
    can use the same test set for all apps

app01-js-schema-first
  schema-first
  @apollo/server
  fake db
    TODO use sqlite
    TODO splitting schema/resolvers by course/genre. ?graphql-tools
    TODO ?rename course to book

app02-js-code-first
  code-first (graphql.js)
  fastify && mercurius <-- express.js
  mongodb from local container <-- mongodb from cloud
    we do not use context to pass db to resolvers

  TODO mercurius/use loaders
  TODO seed db
  TODO init script for app02-code-first
    generate secrets for mongodb
    store them, use in db, use in

TODO GraphQL (code first),
app10-ts-typegraphql
  TypeScript
  fastify && mercurius && TypeGraphQL ?&& TypeORM
  TODO generate client code for api

app11-ts-typegraphql
  TypeScript
  mercurius && NextJS

TODO GraphQL (code first),
app12-ts-nestjs
  TypeScript
  Nest.JS ()

TODO app00-hello
  no db
  only scalar types
  TODO scalar type Date