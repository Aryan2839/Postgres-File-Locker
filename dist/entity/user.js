var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { File } from "./file.js";
export let User = class User {
    id;
    name;
    email;
    password;
    //First create tables simoultaneously & save in the database then establish ManyToMany Relationship
    // I made an err, i declared ManytoMany before creating the second table 
    files;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    ManyToMany(() => File, { cascade: true }),
    JoinTable({
        name: "UserFile",
        joinColumn: { name: "id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "file_id", referencedColumnName: "file_id" },
    }),
    __metadata("design:type", Array)
], User.prototype, "files", void 0);
User = __decorate([
    Entity({ name: "user" })
], User);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRpdHkvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBQ3JGLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFHMUIsV0FBTSxJQUFJLEdBQVYsTUFBTSxJQUFJO0lBRWIsRUFBRSxDQUFRO0lBR1YsSUFBSSxDQUFRO0lBR1osS0FBSyxDQUFRO0lBR2IsUUFBUSxDQUFRO0lBR2hCLG1HQUFtRztJQUNqRyx5RUFBeUU7SUFRM0UsS0FBSyxDQUFTO0NBRWpCLENBQUE7QUF2Qkc7SUFEQyxzQkFBc0IsRUFBRTs7Z0NBQ2Y7QUFHVjtJQURDLE1BQU0sRUFBRTs4QkFDSixNQUFNO2tDQUFDO0FBR1o7SUFEQyxNQUFNLEVBQUU7OEJBQ0gsTUFBTTttQ0FBQztBQUdiO0lBREMsTUFBTSxFQUFFOzhCQUNBLE1BQU07c0NBQUM7QUFZaEI7SUFOQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3hDLFNBQVMsQ0FBQztRQUNULElBQUksRUFBRSxVQUFVO1FBQ2hCLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFO1FBQ3RELGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxTQUFTLEVBQUU7S0FDeEUsQ0FBQzs7bUNBQ1k7QUF2QkwsSUFBSTtJQURoQixNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLENBQUM7R0FDVCxJQUFJLENBeUJoQiJ9