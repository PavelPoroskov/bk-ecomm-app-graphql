var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Arg, Field, FieldResolver, InputType, Mutation, Query, Resolver, Root, } from "type-graphql";
import * as mongoose from 'mongoose';
import { ObjectIdScalar } from '../types.js';
import { UserModel } from './User.type.js';
import { Post, PostModel as Model, PostStatus } from './Post.type.js';
let NewPostInput = class NewPostInput {
    title;
    content;
    authorId;
};
__decorate([
    Field(),
    __metadata("design:type", String)
], NewPostInput.prototype, "title", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], NewPostInput.prototype, "content", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], NewPostInput.prototype, "authorId", void 0);
NewPostInput = __decorate([
    InputType()
], NewPostInput);
export { NewPostInput };
let UpdatePostInput = class UpdatePostInput {
    title;
    content;
};
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], UpdatePostInput.prototype, "title", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], UpdatePostInput.prototype, "content", void 0);
UpdatePostInput = __decorate([
    InputType()
], UpdatePostInput);
export { UpdatePostInput };
let PostResolver = class PostResolver {
    async post(id) {
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
    author(post) {
        return UserModel.findById(post._doc.author);
    }
    // TODO pagination
    //projects(@Args() { skip, take }: RecipesArgs) {
    posts() {
        // TODO filter !status.Censored
        return Model.find();
    }
    async addPost(input) {
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
    async deletePost(id) {
        await Model.findByIdAndDelete(id);
        return true;
    }
    updatePost(id, input) {
        const changedFields = Object.fromEntries(Object.entries({
            title: input.title,
            content: input.content,
        })
            .filter(([, value]) => typeof value === 'string'));
        if (Object.keys(changedFields).length === 0) {
            throw new Error(`No changes in update for post id=${id}`);
        }
        return Model.findByIdAndUpdate(id, { $set: changedFields }, { new: true });
    }
};
__decorate([
    Query(returns => Post),
    __param(0, Arg("id", () => ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "post", null);
__decorate([
    FieldResolver(),
    __param(0, Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "author", null);
__decorate([
    Query(returns => [Post]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "posts", null);
__decorate([
    Mutation(returns => Post),
    __param(0, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewPostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "addPost", null);
__decorate([
    Mutation(returns => Boolean),
    __param(0, Arg("id", () => ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
__decorate([
    Mutation(returns => Post),
    __param(0, Arg("id", () => ObjectIdScalar)),
    __param(1, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose.Types.ObjectId, UpdatePostInput]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
PostResolver = __decorate([
    Resolver(Post)
], PostResolver);
export { PostResolver };
