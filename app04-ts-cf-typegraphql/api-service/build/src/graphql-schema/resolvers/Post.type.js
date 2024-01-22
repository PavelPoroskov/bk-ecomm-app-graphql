var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import 'reflect-metadata/lite';
import { Field, ID, ObjectType, registerEnumType, } from "type-graphql";
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { User } from './User.type.js';
export var PostStatus;
(function (PostStatus) {
    PostStatus["NotPublished"] = "Not Published";
    PostStatus["Published"] = "Published";
    PostStatus["Censored"] = "Censored";
})(PostStatus || (PostStatus = {}));
registerEnumType(PostStatus, {
    name: "PostStatus",
});
let Post = class Post {
    id;
    title;
    content;
    author;
    // @prop({ ref: () => User, required: true })
    // author: Ref<User>;
    status;
};
__decorate([
    Field(type => ID),
    __metadata("design:type", mongoose.Types.ObjectId)
], Post.prototype, "id", void 0);
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    Field(),
    prop(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    Field(_type => User),
    prop({ ref: () => User, required: true }),
    __metadata("design:type", Object)
], Post.prototype, "author", void 0);
__decorate([
    Field(),
    prop({ default: PostStatus.NotPublished, required: true, }),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
Post = __decorate([
    ObjectType(),
    modelOptions({ schemaOptions: { timestamps: true } })
], Post);
export { Post };
export const PostModel = getModelForClass(Post);
