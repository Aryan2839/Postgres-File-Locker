import dotenv from "dotenv";

dotenv.config();


import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/user.js"
import { File } from "./entity/file.js"
import { UserFile } from "./entity/user-file.js";

// console.log(process.env);


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: String(process.env.DB_PASSWORD),
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [User,File,UserFile],
    migrations: [],
    subscribers: [],
})
