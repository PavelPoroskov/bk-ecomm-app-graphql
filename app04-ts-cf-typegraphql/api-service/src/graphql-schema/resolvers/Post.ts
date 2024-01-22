import {
  Arg,
  Field, 
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver, 
  Root,
} from "type-graphql";
import * as mongoose from 'mongoose';

import { ObjectIdScalar } from '../types.js';
import { User, UserModel } from './User.type.js';
import { Post, PostModel as Model, PostStatus } from './Post.type.js';


@InputType()
export class NewPostInput implements Partial<Post> {
  @Field()
  title!: string;

  @Field({ nullable: true })
  content?: string;

  @Field()
  authorId!: string;
}

@InputType()
export class UpdatePostInput implements Partial<Post> {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  content?: string;
}

@Resolver(Post)
export class PostResolver {

  @Query(returns => Post)
  async post(@Arg("id", () => ObjectIdScalar) id: mongoose.Types.ObjectId) {
    const post = await Model.findById(id);

    if (post === undefined) {
      throw new Error(`Post id=${id} does not exist.`);
    }

    return post;
  }

  // TODO check after stable version of 'type-graphql'
  //does not work 
  // @FieldResolver()
  // async author(@Root() post: Post): Promise<User> {
  //   return UserModel.findById(post.author);
  // }
  // post = {
  //   author: undefined,
  //   _doc: {
  //     author: ObjectId('11..333'),
  //   }
  // }
  // typeof post === object  
  // post.constructor == [class Post]
  @FieldResolver()
  author(@Root() post: { _doc: Post }): Promise<User> {
    return UserModel.findById(post._doc.author);
  }

  // TODO pagination
  //projects(@Args() { skip, take }: RecipesArgs) {
  @Query(returns => [Post])
  posts() {
    // TODO filter !status.Censored
    return Model.find();
  }

  @Mutation(returns => Post)
  async addPost(
    @Arg("input") input: NewPostInput
  ): Promise<Post> {
    const post = new Model({
      title: input.title,
      content: input.content,
      author: input.authorId,
      status: PostStatus.NotPublished,
      // creationDate: new Date(),
      // updateDate: new Date(),
    });

    return post.save();
  }

  @Mutation(returns => Boolean)
  async deletePost(@Arg("id", () => ObjectIdScalar) id: mongoose.Types.ObjectId): Promise<boolean> {
    await Model.findByIdAndDelete(id);

    return true;
  }

  @Mutation(returns => Post)
  updatePost(
    @Arg("id", () => ObjectIdScalar) id: mongoose.Types.ObjectId,
    @Arg("input") input: UpdatePostInput
  ): Promise<Post> {
    const changedFields = Object.fromEntries(
      Object.entries({
        title: input.title,
        content: input.content,
      })
      .filter(([,value]) => typeof value === 'string')
    );
    
    if (Object.keys(changedFields).length === 0) {
      throw new Error(`No changes in update for post id=${id}`);
    }

    return Model.findByIdAndUpdate(
      id,
      { $set: changedFields },
      { new: true }
    );
  }

  //publishPost 
  //  draftPost.[content, title, updatedDate] --> publishedPost.content
  //unpublishPost
  //  delete publishedPost

  //censorPost
    // draftPost.status = blocked
    // delete publishedPost
  //uncensorPost
    // draftPost.status = unpublished
}