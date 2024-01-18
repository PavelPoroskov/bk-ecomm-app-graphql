import 'reflect-metadata/lite';
import {
  Arg,
  Args,
  Field, 
  ID, 
  ObjectType,
  registerEnumType, 
  Resolver, 
  Query,
  Mutation,
} from "type-graphql";
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Ref } from './types.js';
import { Client } from './Client.js';

export enum ProjectStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

registerEnumType(ProjectStatus, {
  name: "ProjectStatus",
});

@ObjectType()
export class Project {
  @Field(type => ID)
  id: string;

  @Field()
  @prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @prop()
  description?: string;

  @Field()
  @prop({ required: true })
  status: ProjectStatus;

  @Field(type => Client)
  @prop({ ref: () => Client, required: true })
  public client: Ref<Client>;
}

export const ProjectModel = getModelForClass(Project);

@Resolver(Project)
export class ProjectResolver {

  @Query(returns => Project)
  async project(@Arg("id") id: string) {
    const project = await ProjectModel.findById(id);
    // TODO
    // if (project === undefined) {
    //   throw new RecipeNotFoundError(id);
    // }
    return project;
  }

  // TODO pagination
  //projects(@Args() { skip, take }: RecipesArgs) {
  @Query(returns => [Project])
  projects() {
    return ProjectModel.find();
  }

  // @Mutation(returns => Recipe)
  // addRecipe(
  //   @Arg("newRecipeData") newRecipeData: NewRecipeInput,
  //   @Ctx("user") user: User,
  // ): Promise<Recipe> {
  //   return this.recipeService.addNew({ data: newRecipeData, user });
  // }
}