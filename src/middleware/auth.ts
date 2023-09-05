import jwt from "jsonwebtoken";
import { User } from "../entity/user.js";
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data.js";
import { Any } from "typeorm";

const secretkey: string | any = process.env.Secretkey; // Ensure the type is explicitly set as string

const userRepository = AppDataSource.getRepository(User);

const userAuth = async (req: any, res: Response, next: NextFunction): Promise<void> => {
  let token: string; 
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Secret")) {
    try {
      // Get token from header
      token = authorization.split(" ")[1];

      // Verify token
      const decodedToken: any = jwt.verify(token, secretkey);

      // Get user from token (assuming you want to fetch the user based on the decoded token's userID)
      const userId: number | any = decodedToken.userID;
      const user = await userRepository.findOne({where:{id:userId}});

      if (user) {
        req.user = user; // Attach the user object to the request
        next(); // Proceed to the next middleware or route handler
      } else {
        res.send({ status: "failed", message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.send({ status: "failed", message: "Unauthorized user" });
    }
  } else {
    res.send({ status: "failed", message: "No token" });
  }
};

export default userAuth;
