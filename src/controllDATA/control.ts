import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import multer from "multer";
import transporter from "../emailConfig/email.js";  
import { User } from "../entity/user.js"; 
import { AppDataSource } from "../data.js";
import { File } from "../entity/file.js";
import { UserFile } from "../entity/user-file.js";
import accessControlMiddleware from "../middleware/get-file-auth.js";
import checkFileAccess from "../middleware/get-file-auth.js";
import userAuth from "../middleware/auth.js";
import * as path from 'path';
import fs from "fs";
import mime from "mime";
import { Any } from "typeorm";
// import { createDatabaseConnection } from "typeorm";

dotenv.config();
const app = express();
app.use(express.json());

const secretKey:any = process.env.Secretkey; // Ensure the type is explicitly set as string
const userRepository: User | any = AppDataSource.getRepository(User);
const fileRepository: File | any = AppDataSource.getRepository(File);
const userfile= AppDataSource.getRepository(UserFile);

// save file unique path in db eg.userFile-1693029124664+ slice -slice.txt
// use midd.. here which will run on every req for file
// look for the file-unique path, query the file path in db
// check file - public? if pub-send | pri-auth =>owner-id should match with token 

app.use("/files", express.static('uploadFile'));
// Apply middleware before serving static files
// app.use("/files", checkFileAccess, express.static('uploadFile'));



class AuthenticationOfData {
  
  static userRegistration = async (req: express.Request, res: express.Response) => {
    const { name, email, password, confirm_password } = req.body;
    console.log(req.body);

    if ( name && email && password && confirm_password) {
      if (password === confirm_password) {
        
        try {
          const existingUser = await userRepository.findOne({ where: { email: email } });
          if (existingUser) {
            return res.send({ status: "failed", message: "That Email is already in use" });
          }

          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          
          const newUser = userRepository.create({
            name: name,
            email: email,
            password: hashPassword,
          });

          const savedUser = await userRepository.save(newUser);
          console.log(savedUser);
          

          // Generate JWT Token
          const token = jwt.sign(
            { userID: savedUser.id }, secretKey, { expiresIn: "1d" }
          );
          
          res.send({
            status: "Success",
            message: "Success Registration",
            token: token,
          });
        } catch (error) {
          res.send({ status: "failed", message: "Unable to Register" });
        }
      } else {
        res.send({
          status: "failed",
          message: "confirm_password does not match with password",
        });
      }
    } else {
      res.send({ status: "failed", message: "All data fields are required" });
    }
  };

  static userLogin = async (req: any, res: any) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user:any = await userRepository.findOne({where:{ email: email} });

        if (user != null) {
          //saved password & user given password for login
          const isMatch = await bcrypt.compare(password, user.password);

          if (user.email === email && isMatch) {
            //Generate JWT Token || this token only used for change password further
            const token = jwt.sign( { userID: user.id }, secretKey,{ expiresIn: "1d" });

            res.send({
              status: "Success",
              message: "Successfully Logged in",
              token: token,
            });
          } else {
            res.send({
              status: "failed",
              message: "Invalid Email or Password",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not registered user",
          });
        }
      } else {
        res.send({ status: "failed", message: "All data fields required" });
      }
    } catch (err) {
      console.log(err);
      res.send({ status: "failed", message: "unable to Log in" });
    }
  };
  static changePassword = async (req: any, res: any): Promise<void> => {
    try {
      const { password, confirm_password } = req.body;
      const user:User | any = await userRepository.findOne({where:{id:req.params.id}}); // Assuming req.user.id holds the user ID

      if (password && confirm_password) {
        if (password === confirm_password) {
          const salt = await bcrypt.genSalt(10);
          const newHashPassword = await bcrypt.hash(password, salt);

          user.password = newHashPassword;
          await userRepository.save(user);

          res.send({ status: "Success", message: "Changed Password" });
        } else {
          res.send({
            status: "failed",
            message: "New Password and Confirm New Password do not match",
          });
        }
      } else {
        res.send({ status: "failed", message: "All data fields required" });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: "failed", message: "Unable to change password" });
    }
  };

  static getUserData = async (req: any, res: any): Promise<void> => {
    res.send({ user: req.user });
  };

  static sendUserPasswordResetMail = async (req: any, res: any): Promise<void> => {
    const { email }: { email: string | any} = req.body;
    if (email) {
      const user: any = await userRepository.findOne({where:{ email: email}});
      if (user) {
        const secret: any = user.id + process.env.Secretkey;
        console.log(secret);
        const token: any = jwt.sign({ id: user.id }, secret, {
          expiresIn: "10m",
        });

        const link: string = `http://127.0.0.1:4000/user/reset/${user.id}/${token}`;
        // const link: string = `http://127.0.0.1:4000/user/reset/${token}`;

        console.log(link);

        try {
          //  transporter
          const mail: any = await transporter.sendMail({
            from: '"Aryan Raval" <aryanaiassistant@gmail.com>',
            to: process.env.Email_from,
            // to: "@gmail.com",
            subject: "password reset link",
            html:`<a href=${link} className="">Click here to reset your password</a>`
          });
          res.send({
            status: "Success",
            message: "Password reset email is sent... Please Check your Email.",
            info: mail,
          });
        } catch (error) {
          console.log("err");
        }
      } else {
        res.send({ status: "failed", message: "Email does not exist" });
      }
    } else {
      res.send({ status: "failed", message: "Email is required" });
    }
  };

  static userPasswordReset = async (req: any, res: any): Promise<void> => {
    const { password, password_confirmation }: { password: string, password_confirmation: string } = req.body;
    const { id, token }: { id: string | any, token: string } = req.params;
    // const { token }: {  token: string } = req.params;

    try {
      // const { password, password_confirmation }: { password: string, password_confirmation: string } = req.body;
      // const { id, token }: { id: string | any, token: string } = req.params;
      const user: User | any = await userRepository.findOne({where:{id:id}});
      // const user:any = await userRepository.findOne(req.user.id);

      const newSecret: string | number |any = user.id + process.env.Secretkey;
      console.log(newSecret);
      

      // const newSecret:any =  process.env.Secretkey;


      jwt.verify(token,newSecret);
      
       
      if (password && password_confirmation) {
        if (password === password_confirmation) {
          const salt: string = await bcrypt.genSalt(10);
          const newHashPassword: string = await bcrypt.hash(password, salt);

          await userRepository.update(user.id, {
            password: newHashPassword,
          });
          res.send({
            status: "Success",
            message: "Password reset successfully",
          });
        } else {
          res.send({
            status: "failed",
            message: "New password and New Confirm-password doesn't match",
          });
        }
      } else {
        res.send({ status: "failed", message: "Password fields required" });
      }
    } catch (error) {
      res.send({ status: "failed", message: "Invalid Token" });
    }
  };
  static uploadFile = async (req: any, res: any): Promise<void> => {
    const allowedExtensions = [".pdf", ".doc", ".docx", ".jpeg", ".png", ".txt"];

    const upload = multer({
      storage: multer.diskStorage({
        destination: function (_req, _file, callback) {
          callback(null, "uploadFile");
        },
        filename: function (_req, file, callback) {
          callback(
            null,
            file.fieldname + "-" + `${Date.now()}+ ${file.originalname}`
          );
        },
      }),
      fileFilter: function (req, file, callback) {
        // Allowed file extensions
        const fileExtension = file.originalname.toLowerCase().slice(-4); // Get the last 4 characters of the filename

        if (allowedExtensions.includes(fileExtension)) {
          callback(null, true); // Allow the file
        } else {
          callback(new Error("Invalid file extension")); // Reject the file
        }
      },
    }).single("userFile");

    // try {
    //   upload(req, res, (err: any) => {
    //     if (err instanceof multer.MulterError) {
    //       res.status(400).send("Multer Error: " + err.message);
    //     } else if (err) {
    //       res.status(500).send(err);
    //     } else {
    //       // If everything is fine, respond with success message
    //       res.send("File uploaded successfully");
    //     }
    //   });
    // } catch (error) {
    //   console.error(error);
    //   res.status(500).send("An error occurred during file upload");
    // }
   
    try {
      upload(req, res, async (err: any) => {
        if (err instanceof multer.MulterError) {
          res.status(400).send("Multer Error: " + err.message);
        } else if (err) {
          res.status(500).send(err);
        } else {
          // If everything is fine, respond with success message
          const userId = req.user.id;
    
          const  originalname = req.file.originalname;
          const mimetype=req.file.mimetype;
          const filePath =req.file.path;
          const is_public =false;
          // const is_public = req.body.is_public === 'true'; 
          // const {is_public}=req.body;
          // console.log(req.body);
          

          const user:User = await userRepository.findOne({where:{id:req.userId}}); // Assuming you have the user ID from authentication
          // console.log(user);
          if (user === null) {
            res.status(404).send("User not found");
            return;
          }
          
          const file = fileRepository.create({
          file_name:originalname,           //req.file.originalname
          file_metadata:mimetype || '',
          file_path:filePath,
          is_public: is_public,         //req.body.is_public
          id:userId
        });
        console.log(file);
        

          try {
            const data=await fileRepository.save(file); // Save the user-file relationship to the database
            
            console.log(data.file_id);
            console.log(user.id);
            
            const userFile = userfile.create({
                file_id :data.file_id,
                id : user.id,
              });
              await userfile.save(userFile);
            

            res.send("File uploaded and data saved successfully");
          } catch (error) {
            console.error('Error saving file data:', error);
            res.status(500).json({ error: 'Error saving file data' });
          }
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred during file upload");
    }
  }


  static setIs_public= async (req: any, res: any): Promise<void> =>{
    try {
      const { file_id } = req.params;
      const { is_public } = req.body;
  
      const fileRepository = AppDataSource.getRepository(File);
      await fileRepository.update(file_id, { is_public });
  
      res
        .status(200)
        .json({ message: 'File public status updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

static getFile = async (req: any, res: any): Promise<void> =>{
    const { filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploadFile', filename);
  
    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
  
    try {
      const fileRepository = AppDataSource.getRepository(File);
      const fileData = await fileRepository.findOne({
        where: { file_path: 'uploadFile\\' + filename as any },
      });
  
      if (!fileData) {
        return res.status(404).json({ error: 'File data not found' });
      }
  
      const isOwner = fileData.id === req.user.id;
      const userHasAccess = req.user.id;
  
      if (fileData.is_public || isOwner || userHasAccess) {
        res.sendFile(filePath);
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
   
//   const { filename } = req.params;
//   const filePath = path.join(process.cwd(), 'uploadFile', filename);

//   try {
//     const fileData = await AppDataSource.getRepository(File).findOne({
//       where: { file_path: `uploadFile\\${filename} ` as any },
//       relations: ['users'],
//     });

//     if (!fileData) {
//       return res.status(404).json({ error: 'File data not found' });
//     }

//     const isPublic = fileData.is_public;
//     const username = req.headers.username;
//     const userHasAccess = fileData.users.some((user) => user.name === username);

//     if (isPublic || userHasAccess) {
//       const contentType = mime.lookup(filename);

//       try {
//         const data = await fs.readFile(filePath);
//         res.set('Content-Type', contentType || 'application/octet-stream');
//         res.send(data);
//       } catch (readError) {
//         console.error(readError);
//         res.status(500).json({ error: 'Error reading file' });
//       }
//     } else {
//       console.log('Access Denied');
//       res.status(401).json({ error: 'Unauthorized' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

}

export default AuthenticationOfData;
