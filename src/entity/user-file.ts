import { Entity, PrimaryColumn, ManyToMany, JoinColumn,Column } from "typeorm";
import { User } from "./user.js"; // Import your User entity
import { File } from "./file.js"; // Import your File entity

@Entity({ name: "UserFile" })
export class UserFile {
  // @PrimaryColumn()
  // dataid: number;
  
  @PrimaryColumn()
  file_id: Number;

  
  @Column()
  id:Number;
  

  @ManyToMany(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id" })
  user: User;

  @ManyToMany(() => File, { onDelete: "CASCADE" })
  @JoinColumn({ name: "file_id" })
  file: File;
}
