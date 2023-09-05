import dotenv from "dotenv";

dotenv.config({path:".././env"});
import cors from "cors"
import express, { Router } from "express";
const router: Router = express.Router();
import authenticationOfData from "../controllDATA/control.js";
import userAuth from "../middleware/auth.js";
import checkFileAccess from "../middleware/get-file-auth.js";

router.use(express.json());
router.use(cors());


// router.use("/files", express.static('uploadFile'));
router.use("/files", checkFileAccess, express.static('uploadFile'));



// router level middleware - to protect route
router.use("/ChangePassword",userAuth);
router.use("/userData",userAuth);
router.use("/uploadFile",userAuth);
router.use("/ResetPasswordEmail", userAuth);


// checkFileAccess middleware
router.use("/setPublic",checkFileAccess);
router.use("/getFile",checkFileAccess);





//public route

router.post("/Register", authenticationOfData.userRegistration);
router.post("/Login", authenticationOfData.userLogin);
router.post("/SendResetPasswordEmail", authenticationOfData.sendUserPasswordResetMail);
router.post("/ResetPasswordEmail/:id/:token", authenticationOfData.userPasswordReset);



 

//protected route
router.post("/ChangePassword", authenticationOfData.changePassword);  //for this we've to create a middleware
router.get("/userData", authenticationOfData.getUserData);  
router.post("/uploadFile",authenticationOfData.uploadFile);
router.put("/setPublic/:file_id",authenticationOfData.setIs_public);
router.get("/getFile/:filename",authenticationOfData.getFile);


export default router;