training:
  MongoDb,
  Authentication,
  GraphQL (schema first),

TODO GraphQL (code first),
TODO ?tests for graphql API
TODO splitting schema/resolvers by course/genre. ?graphql-tools
TODO ?rename course to book

app01-fake-db
  schema first
  @apollo/server
  fake db

app02
  fastify && mercurius <-- express.js

  raw schema from graphql.js
    is it "code first"?
  ?replace with schema as string

  mongodb from cloud
  ?replace with mongodb from local container