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
import 'reflect-metadata/lite';
import { Arg, Field, ID, ObjectType, Resolver, Query, } from "type-graphql";
import { prop, getModelForClass } from '@typegoose/typegoose';
let Client = class Client {
    id;
    name;
    email;
    phone;
};
__decorate([
    Field(type => ID),
    __metadata("design:type", String)
], Client.prototype, "id", void 0);
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Client.prototype, "name", void 0);
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Client.prototype, "email", void 0);
__decorate([
    Field({ nullable: true }),
    prop(),
    __metadata("design:type", String)
], Client.prototype, "phone", void 0);
Client = __decorate([
    ObjectType()
], Client);
export { Client };
export const ClientModel = getModelForClass(Client);
let ClientResolver = class ClientResolver {
    async client(id) {
        const client = await ClientModel.findById(id);
        // TODO
        // if (project === undefined) {
        //   throw new RecipeNotFoundError(id);
        // }
        return client;
    }
    // TODO pagination
    //projects(@Args() { skip, take }: RecipesArgs) {
    clients() {
        return ClientModel.find();
    }
};
__decorate([
    Query(returns => Client),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientResolver.prototype, "client", null);
__decorate([
    Query(returns => [Client]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ClientResolver.prototype, "clients", null);
ClientResolver = __decorate([
    Resolver(Client)
], ClientResolver);
export { ClientResolver };
