import jwt from "jsonwebtoken";
import { User } from "../entity/user.js";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data.js";
import { Any } from "typeorm";
import { File } from "../entity/file.js";
import path from "path";
import userAuth from "./auth.js";

const secretkey: string | any = process.env.Secretkey; // Ensure the type is explicitly set as string

const fileRepository = AppDataSource.getRepository(File);



// const accessControlMiddleware = async (req:any, res:Response, next:NextFunction) => {
//     const fileId = req.params.fileId; // Extract fileId from the request parameter
  
//     try {
//       const file = await fileRepository.findOne(fileId);
  
//       if (!file) {
//         return res.status(404).json({ message: "File not found" });
//       }
  
//       if (file.is_public || (req.user && req.user.id === file.id)) {
//         next(); // Allow access
//       } else {
//         res.status(403).json({ message: "Access forbidden" });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   };
  
//   export default accessControlMiddleware;


// Middleware to check file access control
const checkFileAccess = async (req:any, res:Response, next:NextFunction) => {
  const { filename } = req.params;

  try {

    const fileData = await fileRepository.findOne({where: { file_name: filename}});

    if (!fileData) {
      return res.status(404).json({ error: 'File not found' });
    }

    if (fileData.is_public) {
      // File is public, no need to verify token
      return next();
    }

    // File is not public, proceed with token verification
    userAuth(req, res, next);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

 export default checkFileAccess;
