import {Entity,PrimaryGeneratedColumn,Column, ManyToMany, JoinTable ,ManyToOne} from "typeorm";
import { File } from "./file.js";
import { UserFile } from "./user-file.js";
@Entity({name:"user"})
export class User{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:String;

    @Column()
    email:String;

    @Column()
    password:String;


    //First create tables simoultaneously & save in the database then establish ManyToMany Relationship
      // I made an err, i declared ManytoMany before creating the second table 
    
    @ManyToOne(() => File,{ cascade: true })
    @JoinTable({
      name: "UserFile",
      joinColumn: { name: "id", referencedColumnName: "id" },
      inverseJoinColumn: { name: "file_id", referencedColumnName: "file_id" },
    })
    files: File[]; 
    
}

