import {
  GraphQLEnumType,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

import {
  ClientModel,
  ProjectModel,
} from '../../db/index.js';

import { ClientType } from './ClientType.js'

export const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return ClientModel.findById(parent.clientId);
      },
    },
  }),
});

// TODO we can use {} in js or enum in ts
const ProjectStatusType = new GraphQLEnumType({
  name: 'ProjectStatus',
  values: {
    new: { value: 'Not Started' },
    progress: { value: 'In Progress' },
    completed: { value: 'Completed' },
  },
});

const queries = {
  projects: {
    type: new GraphQLList(ProjectType),
    resolve(parent, args) {
      return ProjectModel.find();
    },
  },
  project: {
    type: ProjectType,
    args: { id: { type: GraphQLID } },
    resolve(parent, args) {
      return ProjectModel.findById(args.id);
    },
  },
};

const mutations = {
  addProject: {
    type: ProjectType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      status: {
        type: ProjectStatusType,
        // TODO we can use {}.new in js or enum.new in ts
        defaultValue: 'Not Started',
      },
      clientId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      const project = new ProjectModel({
        name: args.name,
        description: args.description,
        status: args.status,
        clientId: args.clientId
      });
      
      return project.save();
    },
  },
  deleteProject: {
    type: ProjectType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve(parent, args) {
      return ProjectModel.findByIdAndDelete(args.id);
    },
  },
  updateProject: {
    type: ProjectType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      name: { type: GraphQLString },
      description: { type: GraphQLString },
      status: { type: ProjectStatusType },
    },
    resolve(parent, args) {
      return ProjectModel.findByIdAndUpdate(
        args.id,
        {
          $set: {
            name: args.name,
            description: args.description,
            status: args.status,
          },
        },
        { new: true }
      );
    },
  },
}

export default {
  queries,
  mutations,
}