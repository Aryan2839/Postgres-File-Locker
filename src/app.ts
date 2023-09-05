import dotenv from "dotenv";

dotenv.config();

import express ,{Request,Response} from "express";
import cors from "cors"
import { AppDataSource } from "./data.js"
import { User } from "./entity/user.js"
import { File } from "./entity/file.js";
import { DataSource } from "typeorm";
import router from "./Routes/userRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());
const port: Number = 4000;



app.use("/user", router);



AppDataSource.initialize()
.then(async () => {

    // console.log("Inserting a new user into the database...")
    // const user = new User()
    // user.id=1
    // user.name = "Timber"
    // user.email = "Saw"
    // user.password = "123"
    // await AppDataSource.manager.save(user)
    // console.log("Saved a new user with id: " + user.id)

    // console.log("Loading users from the database...")
    // const users = await AppDataSource.manager.find(User)
    // console.log("Loaded users: ", users)

}).catch(error => console.log(error));

app.get("/allData",async function(req:Request,resp:Response){
  const userRepo= AppDataSource.getRepository(User);
  const fileRepo= AppDataSource.getRepository(File);

  //find all the records
  const filedata= await fileRepo.find();
  const userdata=await userRepo.find();  //using await-> will wait untill all the records assign to 'allData' 
  
  const allData=[...userdata,...filedata]

  resp.json(allData);
})
app.get("/deleteData",async function(req:Request,resp:Response){
  const userRepo= AppDataSource.getRepository(User);

  //delete records by id records
  // const allData=await userRepo.delete(2);  
  
  // resp.json(allData);

})
app.get("/updateData",async function(req:Request,resp:Response){
  const userRepo= AppDataSource.getRepository(User);

  //delete records by id records
  // const allData=await userRepo.update(2,{id:3,name:"",email:"",password:""});  
  
  // resp.json(allData);

})
app.get("/fileData",async function(req:Request,resp:Response){
  
  const userRepo= AppDataSource.getRepository(User);
  const fileRepo= AppDataSource.getRepository(File);

  let file1= new File()
  // file1.file_id=
  file1.file_name="my Resume1"
  file1.file_metadata="shall get date1"
  file1.is_public=true

  let us=new User()
  us.id=3
  us.name="a"
  us.email="a.com"
  us.password="a12"
  us.files=[file1]

   await fileRepo.save(file1)
   await userRepo.save(us);
  // resp.json(allData);

})


app.listen(port,()=>{
  console.log("on 4000"); 
})

  
  