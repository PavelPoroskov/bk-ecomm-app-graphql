import * as mongoose from 'mongoose';
import { GraphQLScalarType, Kind } from "graphql";
// export type Ref<T> = T | Types.ObjectId;
export const ObjectIdScalar = new GraphQLScalarType({
    name: "ObjectId",
    description: "Mongo object id scalar type",
    serialize(value) {
        if (!(value instanceof mongoose.Types.ObjectId)) {
            throw new Error("ObjectIdScalar can only serialize ObjectId values");
        }
        return value.toHexString();
    },
    parseValue(value) {
        if (typeof value !== "string") {
            throw new Error("ObjectIdScalar can only parse string values");
        }
        return new mongoose.Types.ObjectId(value);
    },
    parseLiteral(ast) {
        if (ast.kind !== Kind.STRING) {
            throw new Error("ObjectIdScalar can only parse string values");
        }
        return new mongoose.Types.ObjectId(ast.value);
    },
});
