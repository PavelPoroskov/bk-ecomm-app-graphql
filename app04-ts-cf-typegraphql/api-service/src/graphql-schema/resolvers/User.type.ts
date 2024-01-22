// import 'reflect-metadata/lite';

import {
  Field, 
  ID, 
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

export enum UserStatus {
  Active = 'Active',
  Blocked = 'Blocked',
  Delete = 'Delete',
}

registerEnumType(UserStatus, {
  name: "UserStatus",
});

@ObjectType()
@modelOptions({ schemaOptions: { timestamps: true } })
export class User {
  //@prop({ unique: true }) // causes error Cannot return null for non-nullable field User.id.
  @Field(type => ID)
  readonly id: mongoose.Types.ObjectId;

  @Field(type => String)
  @prop({ required: true })
  name: string;

  @Field(type => String)
  @prop({ required: true })
  email: string;

  @Field(type => String)
  @prop({ default: UserStatus.Active, required: true })
  status: UserStatus;
}

export const UserModel = getModelForClass(User);
