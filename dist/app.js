import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { AppDataSource } from "./data.js";
import { User } from "./entity/user.js";
import { File } from "./entity/file.js";
import router from "./Routes/userRoutes.js";
const app = express();
app.use(express.json());
const port = 4000;
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
app.get("/allData", async function (req, resp) {
    const userRepo = AppDataSource.getRepository(User);
    const fileRepo = AppDataSource.getRepository(File);
    //find all the records
    const filedata = await fileRepo.find();
    const userdata = await userRepo.find(); //using await-> will wait untill all the records assign to 'allData' 
    const allData = [...userdata, ...filedata];
    resp.json(allData);
});
app.get("/deleteData", async function (req, resp) {
    const userRepo = AppDataSource.getRepository(User);
    //delete records by id records
    // const allData=await userRepo.delete(2);  
    // resp.json(allData);
});
app.get("/updateData", async function (req, resp) {
    const userRepo = AppDataSource.getRepository(User);
    //delete records by id records
    // const allData=await userRepo.update(2,{id:3,name:"",email:"",password:""});  
    // resp.json(allData);
});
app.get("/fileData", async function (req, resp) {
    const userRepo = AppDataSource.getRepository(User);
    const fileRepo = AppDataSource.getRepository(File);
    let file1 = new File();
    // file1.file_id=
    file1.file_name = "my Resume1";
    file1.file_metadata = "shall get date1";
    file1.is_public = true;
    let us = new User();
    us.id = 3;
    us.name = "a";
    us.email = "a.com";
    us.password = "a12";
    us.files = [file1];
    await fileRepo.save(file1);
    await userRepo.save(us);
    // resp.json(allData);
});
app.listen(port, () => {
    console.log("on 4000");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFFNUIsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRWhCLE9BQU8sT0FBMkIsTUFBTSxTQUFTLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQTtBQUN6QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDdkMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXhDLE9BQU8sTUFBTSxNQUFNLHdCQUF3QixDQUFDO0FBRTVDLE1BQU0sR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO0FBQ3RCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7QUFDeEIsTUFBTSxJQUFJLEdBQVcsSUFBSSxDQUFDO0FBSTFCLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBSXpCLGFBQWEsQ0FBQyxVQUFVLEVBQUU7S0FDekIsSUFBSSxDQUFDLEtBQUssSUFBSSxFQUFFO0lBRWIsMkRBQTJEO0lBQzNELDBCQUEwQjtJQUMxQixZQUFZO0lBQ1osdUJBQXVCO0lBQ3ZCLHFCQUFxQjtJQUNyQix3QkFBd0I7SUFDeEIseUNBQXlDO0lBQ3pDLHNEQUFzRDtJQUV0RCxvREFBb0Q7SUFDcEQsdURBQXVEO0lBQ3ZELHVDQUF1QztBQUUzQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFFdEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUMsS0FBSyxXQUFVLEdBQVcsRUFBQyxJQUFhO0lBQ3pELE1BQU0sUUFBUSxHQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsTUFBTSxRQUFRLEdBQUUsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVsRCxzQkFBc0I7SUFDdEIsTUFBTSxRQUFRLEdBQUUsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDdEMsTUFBTSxRQUFRLEdBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBRSxxRUFBcUU7SUFFNUcsTUFBTSxPQUFPLEdBQUMsQ0FBQyxHQUFHLFFBQVEsRUFBQyxHQUFHLFFBQVEsQ0FBQyxDQUFBO0lBRXZDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDckIsQ0FBQyxDQUFDLENBQUE7QUFDRixHQUFHLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBQyxLQUFLLFdBQVUsR0FBVyxFQUFDLElBQWE7SUFDNUQsTUFBTSxRQUFRLEdBQUUsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVsRCw4QkFBOEI7SUFDOUIsNENBQTRDO0lBRTVDLHNCQUFzQjtBQUV4QixDQUFDLENBQUMsQ0FBQTtBQUNGLEdBQUcsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFDLEtBQUssV0FBVSxHQUFXLEVBQUMsSUFBYTtJQUM1RCxNQUFNLFFBQVEsR0FBRSxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWxELDhCQUE4QjtJQUM5QixnRkFBZ0Y7SUFFaEYsc0JBQXNCO0FBRXhCLENBQUMsQ0FBQyxDQUFBO0FBQ0YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUMsS0FBSyxXQUFVLEdBQVcsRUFBQyxJQUFhO0lBRTFELE1BQU0sUUFBUSxHQUFFLGFBQWEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEQsTUFBTSxRQUFRLEdBQUUsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVsRCxJQUFJLEtBQUssR0FBRSxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ3JCLGlCQUFpQjtJQUNqQixLQUFLLENBQUMsU0FBUyxHQUFDLFlBQVksQ0FBQTtJQUM1QixLQUFLLENBQUMsYUFBYSxHQUFDLGlCQUFpQixDQUFBO0lBQ3JDLEtBQUssQ0FBQyxTQUFTLEdBQUMsSUFBSSxDQUFBO0lBRXBCLElBQUksRUFBRSxHQUFDLElBQUksSUFBSSxFQUFFLENBQUE7SUFDakIsRUFBRSxDQUFDLEVBQUUsR0FBQyxDQUFDLENBQUE7SUFDUCxFQUFFLENBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQTtJQUNYLEVBQUUsQ0FBQyxLQUFLLEdBQUMsT0FBTyxDQUFBO0lBQ2hCLEVBQUUsQ0FBQyxRQUFRLEdBQUMsS0FBSyxDQUFBO0lBQ2pCLEVBQUUsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVmLE1BQU0sUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMxQixNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekIsc0JBQXNCO0FBRXhCLENBQUMsQ0FBQyxDQUFBO0FBR0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsR0FBRSxFQUFFO0lBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDLENBQUEifQ==