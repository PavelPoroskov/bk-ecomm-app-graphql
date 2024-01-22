import 'reflect-metadata/lite';
import { buildSchema } from "type-graphql";
// import { Types } from 'mongoose';
// import { ObjectIdScalar } from "./types.js";
import { UserResolver } from "./resolvers/User.js";
import { PostResolver } from "./resolvers/Post.js";
export const graphQLSchema = await buildSchema({
    resolvers: [
        UserResolver,
        PostResolver,
    ],
    // globalMiddlewares: [TypegooseMiddleware],
    // scalarsMap: [{ type: Types.ObjectId, scalar: ObjectIdScalar }],
    // validate: false,
});
