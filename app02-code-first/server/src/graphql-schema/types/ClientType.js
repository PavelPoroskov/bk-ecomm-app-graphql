import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  ClientModel,
} from '../../db/index.js';

export const ClientType = new GraphQLObjectType({
  name: 'Client',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const queries = {
  clients: {
    type: new GraphQLList(ClientType),
    resolve(parent, args) {
      return ClientModel.find().sort('name');
    },
  },
  client: {
    type: ClientType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return ClientModel.findById(args.id);
    },
  },
};

const mutations = {
  addClient: {
    type: ClientType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      email: { type: new GraphQLNonNull(GraphQLString) },
      phone: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(parent, args) {
      const client = new ClientModel({
        name: args.name,
        email: args.email,
        phone: args.phone,
      });
      
      return client.save();
    },
  },
  deleteClient: {
    type: ClientType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return ClientModel.findByIdAndDelete(args.id);
    },
  },
  //??updateClient
};

export default {
  queries,
  mutations,
}