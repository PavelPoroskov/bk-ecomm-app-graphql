import 'reflect-metadata/lite';
import { buildSchema } from "type-graphql";

import { ClientResolver } from "./resolvers/Client.js";
import { ProjectResolver } from "./resolvers/Project.js";

export const graphQLSchema = await buildSchema({
  resolvers: [
    ClientResolver,
    ProjectResolver,
  ]
});