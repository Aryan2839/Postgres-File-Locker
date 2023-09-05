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
import { User } from "./user.js";
export let File = class File {
    file_id;
    file_name;
    file_metadata;
    file_path;
    is_public;
    id;
    users;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], File.prototype, "file_id", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], File.prototype, "file_name", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], File.prototype, "file_metadata", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], File.prototype, "file_path", void 0);
__decorate([
    Column(),
    __metadata("design:type", Boolean)
], File.prototype, "is_public", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], File.prototype, "id", void 0);
__decorate([
    ManyToMany(() => User, { cascade: true }),
    JoinTable({
        name: "UserFile",
        joinColumn: { name: "file_id", referencedColumnName: "file_id" },
        inverseJoinColumn: { name: "id", referencedColumnName: "id" }, // Adjust according to your actual column names
    }),
    __metadata("design:type", Array)
], File.prototype, "users", void 0);
File = __decorate([
    Entity({ name: "Uploadfile" })
], File);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRpdHkvZmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsTUFBTSxFQUFDLHNCQUFzQixFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsU0FBUyxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxXQUFXLENBQUM7QUFLMUIsV0FBTSxJQUFJLEdBQVYsTUFBTSxJQUFJO0lBRWYsT0FBTyxDQUFTO0lBR2hCLFNBQVMsQ0FBUTtJQUdqQixhQUFhLENBQVE7SUFHckIsU0FBUyxDQUFRO0lBR2pCLFNBQVMsQ0FBUztJQUdsQixFQUFFLENBQVE7SUFTWixLQUFLLENBQVM7Q0FLYixDQUFBO0FBN0JDO0lBREMsc0JBQXNCLEVBQUU7OEJBQ2pCLE1BQU07cUNBQUU7QUFHaEI7SUFEQyxNQUFNLENBQUMsRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFDLENBQUM7OEJBQ2QsTUFBTTt1Q0FBQztBQUdqQjtJQURDLE1BQU0sRUFBRTs4QkFDSyxNQUFNOzJDQUFDO0FBR3JCO0lBREMsTUFBTSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBQyxDQUFDOzhCQUNmLE1BQU07dUNBQUM7QUFHakI7SUFEQyxNQUFNLEVBQUU7OEJBQ0MsT0FBTzt1Q0FBQztBQUdsQjtJQURDLE1BQU0sRUFBRTs4QkFDTixNQUFNO2dDQUFDO0FBU1o7SUFORyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0lBQ3pDLFNBQVMsQ0FBQztRQUNYLElBQUksRUFBRSxVQUFVO1FBQ2hCLFVBQVUsRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFO1FBQ2hFLGlCQUFpQixFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsRUFBRSwrQ0FBK0M7S0FDL0csQ0FBQzs7bUNBQ1k7QUExQkQsSUFBSTtJQURoQixNQUFNLENBQUMsRUFBQyxJQUFJLEVBQUMsWUFBWSxFQUFDLENBQUM7R0FDZixJQUFJLENBK0JoQiJ9