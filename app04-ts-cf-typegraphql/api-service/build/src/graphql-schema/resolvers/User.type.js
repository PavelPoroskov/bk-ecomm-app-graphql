// import 'reflect-metadata/lite';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Field, ID, ObjectType, registerEnumType, } from "type-graphql";
import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
export var UserStatus;
(function (UserStatus) {
    UserStatus["Active"] = "Active";
    UserStatus["Blocked"] = "Blocked";
    UserStatus["Delete"] = "Delete";
})(UserStatus || (UserStatus = {}));
registerEnumType(UserStatus, {
    name: "UserStatus",
});
let User = class User {
    //@prop({ unique: true }) // causes error Cannot return null for non-nullable field User.id.
    id;
    name;
    email;
    status;
};
__decorate([
    Field(type => ID),
    __metadata("design:type", mongoose.Types.ObjectId)
], User.prototype, "id", void 0);
__decorate([
    Field(type => String),
    prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Field(type => String),
    prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Field(type => String),
    prop({ default: UserStatus.Active, required: true }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
User = __decorate([
    ObjectType(),
    modelOptions({ schemaOptions: { timestamps: true } })
], User);
export { User };
export const UserModel = getModelForClass(User);
