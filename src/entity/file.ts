import {Entity,PrimaryGeneratedColumn,Column ,ManyToMany,JoinTable,JoinColumn,ManyToOne} from "typeorm";
import { User } from "./user.js";
import { UserFile } from "./user-file.js";


@Entity({name:"Uploadfile"})
export class File{
  @PrimaryGeneratedColumn()
  file_id:Number ;

  @Column({nullable:true})
  file_name:String;

  @Column()
  file_metadata:String;

  @Column({nullable: true})
  file_path:String;

  @Column({nullable: true})
  is_public:Boolean;

  @Column()
  id:Number;


  // @ManyToOne(() => User, user => user.files)
  // @JoinColumn({ name: 'id' })
  // user: User;

  @ManyToMany(() => User, { cascade: true })
  @JoinTable({
  name: "UserFile",
  joinColumn: { name: "file_id", referencedColumnName: "file_id" }, 
  inverseJoinColumn: { name: "id", referencedColumnName: "id" }, 
})
users: User[];

// @ManyToMany(() => UserFile)
// @JoinTable()
// userFiles: UserFile[];
}