import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
} from 'graphql';

import {
  projects,
  clients,
} from './dummyData.js'

const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return clients.find(client => client.id === args.id);
      },
    },
  },
});

export const graphQLSchema = new GraphQLSchema({ query: RootQuery });