var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryColumn, ManyToMany, JoinColumn, Column } from "typeorm";
import { User } from "./user.js"; // Import your User entity
import { File } from "./file.js"; // Import your File entity
export let UserFile = class UserFile {
    // @PrimaryColumn()
    // dataid: number;
    file_id;
    id;
    user;
    file;
};
__decorate([
    PrimaryColumn(),
    __metadata("design:type", Number)
], UserFile.prototype, "file_id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], UserFile.prototype, "id", void 0);
__decorate([
    ManyToMany(() => User, { onDelete: "CASCADE" }),
    JoinColumn({ name: "id" }),
    __metadata("design:type", User)
], UserFile.prototype, "user", void 0);
__decorate([
    ManyToMany(() => File, { onDelete: "CASCADE" }),
    JoinColumn({ name: "file_id" }),
    __metadata("design:type", File)
], UserFile.prototype, "file", void 0);
UserFile = __decorate([
    Entity({ name: "UserFile" })
], UserFile);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1maWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2VudGl0eS91c2VyLWZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxNQUFNLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFDL0UsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLFdBQVcsQ0FBQyxDQUFDLDBCQUEwQjtBQUM1RCxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sV0FBVyxDQUFDLENBQUMsMEJBQTBCO0FBR3JELFdBQU0sUUFBUSxHQUFkLE1BQU0sUUFBUTtJQUNuQixtQkFBbUI7SUFDbkIsa0JBQWtCO0lBR2xCLE9BQU8sQ0FBUztJQUloQixFQUFFLENBQVE7SUFLVixJQUFJLENBQU87SUFJWCxJQUFJLENBQU87Q0FDWixDQUFBO0FBZEM7SUFEQyxhQUFhLEVBQUU7OEJBQ1AsTUFBTTt5Q0FBQztBQUloQjtJQURDLE1BQU0sRUFBRTs4QkFDTixNQUFNO29DQUFDO0FBS1Y7SUFGQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDO0lBQy9DLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDckIsSUFBSTtzQ0FBQztBQUlYO0lBRkMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsQ0FBQztJQUMvQyxVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7OEJBQzFCLElBQUk7c0NBQUM7QUFsQkEsUUFBUTtJQURwQixNQUFNLENBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7R0FDaEIsUUFBUSxDQW1CcEIifQ==