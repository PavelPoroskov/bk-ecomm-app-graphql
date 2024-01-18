import 'reflect-metadata/lite';
import {
  Arg,
  Args,
  Field, 
  ID, 
  ObjectType,
  Resolver, 
  Query,
  Mutation,
} from "type-graphql";
import { prop, getModelForClass } from '@typegoose/typegoose';

@ObjectType()
export class Client {
  @Field(type => ID)
  id: string;

  @Field()
  @prop({ required: true })
  name: string;

  @Field()
  @prop({ required: true })
  email: string;

  @Field({ nullable: true })
  @prop()
  phone?: string;
}

export const ClientModel = getModelForClass(Client);

@Resolver(Client)
export class ClientResolver {

  @Query(returns => Client)
  async client(@Arg("id") id: string) {
    const client = await ClientModel.findById(id);
    // TODO
    // if (project === undefined) {
    //   throw new RecipeNotFoundError(id);
    // }
    return client;
  }

  // TODO pagination
  //projects(@Args() { skip, take }: RecipesArgs) {
  @Query(returns => [Client])
  clients() {
    return ClientModel.find();
  }
}