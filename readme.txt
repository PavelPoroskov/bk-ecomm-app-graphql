training:
  MongoDb (use, from container, ?seeding),
  Authentication,
  GraphQL (code first), GraphQL (schema first),
  TypeScript
  codegen

TODO ?tests for graphql API
  TODO use the same api (projects and clients) in all app0x
    can use the same test set for all apps
      ??HOW reuse the same test set for two apps
    can use the same front for all apps

    api author-post is more suitable for auth training

app01-js-schema-first
  schema-first
  @apollo/server
  fake db
    TODO use sqlite
    TODO splitting schema/resolvers by course/genre. ?graphql-tools
    TODO ?rename course to book
  TODO use the same api (projects and clients)

app02-js-code-first
  code-first (graphql.js)
  fastify && mercurius <-- express.js
  mongodb from local container <-- mongodb from cloud
    we do not use context to pass db to resolvers

  TODO mercurius/use loaders
  TODO seed db
  TODO init script for app02-code-first
    generate secrets for mongodb
    store them, use in db, use in server
  TOOO API_URI for front calculate im compose.yml
  TODO two-phase (build (devDependecies), use) dockerfile for front

app03
  postgresql (posts, users)
  prisma (schema-first, orm(change db structure), generate db-client for schema)
    why not schema.prisma --> graphql schema

TODO GraphQL (code first),
app10-ts-typegraphql
  TypeScript
  fastify && mercurius && TypeGraphQL ?&& TypeORM
  TODO generate client code for api

app11-ts-typegraphql
  TypeScript
  fastify && NestJS

TODO GraphQL (code first),
app12-ts-nestjs
  TypeScript
  Nest.JS ()

app20-tags

TODO app00-hello
  no db
  only scalar types
  TODO scalar type Date

?TODO shared validation json-schema for client and server: AddClient, addProject

TODO ui is too simplified
  need pagination
    situation: new item is not visible in list 
      notify message in bottom of screen
  delete item. ask question before

? can resolvers be async function

TODO deploy with docker compose
TODO deploy with kubernetes

TODO use input object in mutations
  addUser(name, email, phone) --> addUser(input: AddUserInput!)