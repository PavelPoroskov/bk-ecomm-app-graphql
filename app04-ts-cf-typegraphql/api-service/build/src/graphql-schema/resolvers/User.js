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
import { Arg, Field, Resolver, Query, Mutation, InputType, } from "type-graphql";
import * as mongoose from 'mongoose';
import { ObjectIdScalar } from '../types.js';
import { User, UserModel as Model } from './User.type.js';
let NewUserInput = class NewUserInput {
    name;
    email;
};
__decorate([
    Field(type => String),
    __metadata("design:type", String)
], NewUserInput.prototype, "name", void 0);
__decorate([
    Field(type => String),
    __metadata("design:type", String)
], NewUserInput.prototype, "email", void 0);
NewUserInput = __decorate([
    InputType()
], NewUserInput);
export { NewUserInput };
let UpdateUserInput = class UpdateUserInput {
    name;
};
__decorate([
    Field(type => String),
    __metadata("design:type", String)
], UpdateUserInput.prototype, "name", void 0);
UpdateUserInput = __decorate([
    InputType()
], UpdateUserInput);
export { UpdateUserInput };
let UserResolver = class UserResolver {
    // async user(@Arg("id") id: ObjectId) { causes error Unable to infer GraphQL type from TypeScript reflection system. 
    //  You need to provide explicit type for argument named 'id' of 'user' of 'UserResolver' class
    //
    // async user(@Arg("id") id: string) {
    async user(id) {
        const user = await Model.findById(id);
        if (user === undefined) {
            throw new Error(`User id=${id} does not exist.`);
        }
        return user;
    }
    // only admin can see user.email
    // TODO pagination
    //users(@Args() { skip, take }: RecipesArgs) {
    users() {
        return Model.find();
        ;
    }
    addUser(input) {
        const user = new Model({
            name: input.name,
            email: input.email,
            // creationDate: new Date(),
        });
        return user.save();
    }
    async deleteUser(id) {
        await Model.findByIdAndDelete(id);
        return true;
    }
    updateUser(id, input) {
        const changedFields = Object.fromEntries(Object.entries({
            name: input.name,
        })
            .filter(([, value]) => typeof value === 'string'));
        if (Object.keys(changedFields).length === 0) {
            throw new Error(`No changes in update for user id=${id}`);
        }
        return Model.findByIdAndUpdate(id, {
            $set: changedFields,
        }, { new: true });
    }
};
__decorate([
    Query(returns => User)
    // async user(@Arg("id") id: ObjectId) { causes error Unable to infer GraphQL type from TypeScript reflection system. 
    //  You need to provide explicit type for argument named 'id' of 'user' of 'UserResolver' class
    //
    // async user(@Arg("id") id: string) {
    ,
    __param(0, Arg("id", () => ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    Query(returns => [User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "users", null);
__decorate([
    Mutation(returns => User),
    __param(0, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [NewUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "addUser", null);
__decorate([
    Mutation(returns => Boolean),
    __param(0, Arg("id", () => ObjectIdScalar)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose.Types.ObjectId]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    Mutation(returns => User),
    __param(0, Arg("id", () => ObjectIdScalar)),
    __param(1, Arg("input")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose.Types.ObjectId, UpdateUserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
UserResolver = __decorate([
    Resolver(User)
], UserResolver);
export { UserResolver };
