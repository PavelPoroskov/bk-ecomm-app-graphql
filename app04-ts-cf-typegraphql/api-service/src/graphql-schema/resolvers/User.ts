import {
  Arg,
  Field, 
  Resolver, 
  Query,
  Mutation,
  InputType,
} from "type-graphql";
import * as mongoose from 'mongoose';
import { ObjectIdScalar } from '../types.js';
import { User, UserModel as Model, UserStatus } from './User.type.js';

@InputType()
export class NewUserInput implements Partial<User> {
  @Field(type => String)
  name!: string;

  @Field(type => String)
  email!: string;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field(type => String)
  name?: string;

  // // dedicated endpoint
  // @Field()
  // email?: string;
}

@Resolver(User)
export class UserResolver {

  @Query(returns => User)
  // async user(@Arg("id") id: ObjectId) { causes error Unable to infer GraphQL type from TypeScript reflection system. 
  //  You need to provide explicit type for argument named 'id' of 'user' of 'UserResolver' class
  //
  // async user(@Arg("id") id: string) {
  async user(@Arg("id", () => ObjectIdScalar) id: mongoose.Types.ObjectId) {
    const user = await Model.findById(id);

    if (user === undefined) {
      throw new Error(`User id=${id} does not exist.`);
    }

    return user;
  }

  // only admin can see user.email
  // TODO pagination
  //users(@Args() { skip, take }: RecipesArgs) {
  @Query(returns => [User])
  users() {
    return Model.find();;
  }

  @Mutation(returns => User)
  addUser(
    @Arg("input") input: NewUserInput
  ): Promise<User> {
    const user = new Model({
      name: input.name,
      email: input.email,
      // creationDate: new Date(),
    });

    return user.save();
  }

  @Mutation(returns => Boolean)
  async deleteUser(@Arg("id", () => ObjectIdScalar) id: mongoose.Types.ObjectId): Promise<boolean> {
    await Model.findByIdAndDelete(id);

    return true;
  }

  @Mutation(returns => User)
  updateUser(
    @Arg("id", () => ObjectIdScalar) id: mongoose.Types.ObjectId,
    @Arg("input") input: UpdateUserInput
  ): Promise<User> {
    const changedFields = Object.fromEntries(
      Object.entries({
        name: input.name,
      })
      .filter(([,value]) => typeof value === 'string')
    );
    
    if (Object.keys(changedFields).length === 0) {
      throw new Error(`No changes in update for user id=${id}`);
    }

    return Model.findByIdAndUpdate(
      id,
      {
        $set: changedFields,
      },
      { new: true }
    );
  }
}