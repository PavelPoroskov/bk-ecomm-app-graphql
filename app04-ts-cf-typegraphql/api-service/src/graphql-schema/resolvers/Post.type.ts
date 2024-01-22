//import 'reflect-metadata/lite';
import {
  Field, 
  ID, 
  ObjectType,
  registerEnumType, 
} from "type-graphql";
import { prop, Ref, getModelForClass, modelOptions } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { User } from './User.type.js';

export enum PostStatus {
  NotPublished = 'Not Published',
  Published = 'Published',
  Censored = 'Censored',
}

registerEnumType(PostStatus, {
  name: "PostStatus",
});

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class Post {
  @Field(type => ID)
  readonly id: mongoose.Types.ObjectId;

  @Field()
  @prop({ required: true })
  title: string;

  @Field()
  @prop()
  content?: string;

  @Field(_type => User)
  @prop({ ref: () => User, required: true })
  author!: Ref<User>;
    // @prop({ ref: () => User, required: true })
    // author: Ref<User>;

  @Field()
  @prop({ default: PostStatus.NotPublished, required: true, })
  status: PostStatus;

  // @Field()
  // @prop({ required: true })
  // publishDate!: Date;
}

export const PostModel = getModelForClass(Post);

