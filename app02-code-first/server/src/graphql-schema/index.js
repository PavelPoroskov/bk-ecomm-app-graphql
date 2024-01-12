import {
  GraphQLObjectType,
  GraphQLSchema,
} from 'graphql';

import ClientTypeExport from './types/ClientType.js'
import ProjectTypeExport from './types/ProjectType.js'

const typeExportList = [
  ClientTypeExport,
  ProjectTypeExport,
];

const accumulateExport = (exportType='queries') => Object.fromEntries(
  typeExportList
    .map(item => item[exportType])
    .filter(Boolean)
    .flatMap(item => Object.entries(item))
);

export const graphQLSchema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: accumulateExport('queries'),
  }),
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: accumulateExport('mutations'),
  }),
});