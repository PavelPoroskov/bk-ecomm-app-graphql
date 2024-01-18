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
import { Arg, Field, ID, ObjectType, registerEnumType, Resolver, Query, } from "type-graphql";
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Client } from './Client.js';
export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["NotStarted"] = "Not Started";
    ProjectStatus["InProgress"] = "In Progress";
    ProjectStatus["Completed"] = "Completed";
})(ProjectStatus || (ProjectStatus = {}));
registerEnumType(ProjectStatus, {
    name: "ProjectStatus",
});
let Project = class Project {
    id;
    name;
    description;
    status;
    client;
};
__decorate([
    Field(type => ID),
    __metadata("design:type", String)
], Project.prototype, "id", void 0);
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Project.prototype, "name", void 0);
__decorate([
    Field({ nullable: true }),
    prop(),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    Field(),
    prop({ required: true }),
    __metadata("design:type", String)
], Project.prototype, "status", void 0);
__decorate([
    Field(type => Client),
    prop({ ref: () => Client, required: true }),
    __metadata("design:type", Object)
], Project.prototype, "client", void 0);
Project = __decorate([
    ObjectType()
], Project);
export { Project };
export const ProjectModel = getModelForClass(Project);
let ProjectResolver = class ProjectResolver {
    async project(id) {
        const project = await ProjectModel.findById(id);
        // TODO
        // if (project === undefined) {
        //   throw new RecipeNotFoundError(id);
        // }
        return project;
    }
    // TODO pagination
    //projects(@Args() { skip, take }: RecipesArgs) {
    projects() {
        return ProjectModel.find();
    }
};
__decorate([
    Query(returns => Project),
    __param(0, Arg("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectResolver.prototype, "project", null);
__decorate([
    Query(returns => [Project]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProjectResolver.prototype, "projects", null);
ProjectResolver = __decorate([
    Resolver(Project)
], ProjectResolver);
export { ProjectResolver };
