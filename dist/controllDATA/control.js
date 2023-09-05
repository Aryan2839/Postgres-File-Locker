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
// import { createDatabaseConnection } from "typeorm";
dotenv.config();
const app = express();
app.use(express.json());
// save file unique path in db eg.userFile-1693029124664+ slice -slice.txt
// use midd.. here which will run on every req for file
// look for the file-unique path, query the file path in db
// check file - public? if pub-send | pri-auth =>owner-id should match with token 
app.use("/files", express.static('uploadFile'));
const secretKey = process.env.Secretkey; // Ensure the type is explicitly set as string
const userRepository = AppDataSource.getRepository(User);
const fileRepository = AppDataSource.getRepository(File);
const userfile = AppDataSource.getRepository(UserFile);
class AuthenticationOfData {
    static userRegistration = async (req, res) => {
        const { name, email, password, confirm_password } = req.body;
        console.log(req.body);
        if (name && email && password && confirm_password) {
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
                    const token = jwt.sign({ userID: savedUser.id }, secretKey, { expiresIn: "1d" });
                    res.send({
                        status: "Success",
                        message: "Success Registration",
                        token: token,
                    });
                }
                catch (error) {
                    res.send({ status: "failed", message: "Unable to Register" });
                }
            }
            else {
                res.send({
                    status: "failed",
                    message: "confirm_password does not match with password",
                });
            }
        }
        else {
            res.send({ status: "failed", message: "All data fields are required" });
        }
    };
    static userLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            if (email && password) {
                const user = await userRepository.findOne({ where: { email: email } });
                if (user != null) {
                    //saved password & user given password for login
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (user.email === email && isMatch) {
                        //Generate JWT Token || this token only used for change password further
                        const token = jwt.sign({ userID: user.id }, secretKey, { expiresIn: "1d" });
                        res.send({
                            status: "Success",
                            message: "Successfully Logged in",
                            token: token,
                        });
                    }
                    else {
                        res.send({
                            status: "failed",
                            message: "Invalid Email or Password",
                        });
                    }
                }
                else {
                    res.send({
                        status: "failed",
                        message: "You are not registered user",
                    });
                }
            }
            else {
                res.send({ status: "failed", message: "All data fields required" });
            }
        }
        catch (err) {
            console.log(err);
            res.send({ status: "failed", message: "unable to Log in" });
        }
    };
    static changePassword = async (req, res) => {
        try {
            const { password, confirm_password } = req.body;
            const user = await userRepository.findOne({ where: { id: req.params.id } }); // Assuming req.user.id holds the user ID
            if (password && confirm_password) {
                if (password === confirm_password) {
                    const salt = await bcrypt.genSalt(10);
                    const newHashPassword = await bcrypt.hash(password, salt);
                    user.password = newHashPassword;
                    await userRepository.save(user);
                    res.send({ status: "Success", message: "Changed Password" });
                }
                else {
                    res.send({
                        status: "failed",
                        message: "New Password and Confirm New Password do not match",
                    });
                }
            }
            else {
                res.send({ status: "failed", message: "All data fields required" });
            }
        }
        catch (error) {
            console.error(error);
            res.send({ status: "failed", message: "Unable to change password" });
        }
    };
    static getUserData = async (req, res) => {
        res.send({ user: req.user });
    };
    static sendUserPasswordResetMail = async (req, res) => {
        const { email } = req.body;
        if (email) {
            const user = await userRepository.findOne({ where: { email: email } });
            if (user) {
                const secret = user.id + process.env.Secretkey;
                console.log(secret);
                const token = jwt.sign({ id: user.id }, secret, {
                    expiresIn: "10m",
                });
                const link = `http://127.0.0.1:4000/user/reset/${user.id}/${token}`;
                // const link: string = `http://127.0.0.1:4000/user/reset/${token}`;
                console.log(link);
                try {
                    //  transporter
                    const mail = await transporter.sendMail({
                        from: '"Aryan Raval" <aryanaiassistant@gmail.com>',
                        to: process.env.Email_from,
                        // to: "@gmail.com",
                        subject: "password reset link",
                        html: `<a href=${link} className="">Click here to reset your password</a>`
                    });
                    res.send({
                        status: "Success",
                        message: "Password reset email is sent... Please Check your Email.",
                        info: mail,
                    });
                }
                catch (error) {
                    console.log("err");
                }
            }
            else {
                res.send({ status: "failed", message: "Email does not exist" });
            }
        }
        else {
            res.send({ status: "failed", message: "Email is required" });
        }
    };
    static userPasswordReset = async (req, res) => {
        const { password, password_confirmation } = req.body;
        const { id, token } = req.params;
        // const { token }: {  token: string } = req.params;
        try {
            // const { password, password_confirmation }: { password: string, password_confirmation: string } = req.body;
            // const { id, token }: { id: string | any, token: string } = req.params;
            const user = await userRepository.findOne({ where: { id: id } });
            // const user:any = await userRepository.findOne(req.user.id);
            const newSecret = user.id + process.env.Secretkey;
            console.log(newSecret);
            // const newSecret:any =  process.env.Secretkey;
            jwt.verify(token, newSecret);
            if (password && password_confirmation) {
                if (password === password_confirmation) {
                    const salt = await bcrypt.genSalt(10);
                    const newHashPassword = await bcrypt.hash(password, salt);
                    await userRepository.update(user.id, {
                        password: newHashPassword,
                    });
                    res.send({
                        status: "Success",
                        message: "Password reset successfully",
                    });
                }
                else {
                    res.send({
                        status: "failed",
                        message: "New password and New Confirm-password doesn't match",
                    });
                }
            }
            else {
                res.send({ status: "failed", message: "Password fields required" });
            }
        }
        catch (error) {
            res.send({ status: "failed", message: "Invalid Token" });
        }
    };
    static uploadFile = async (req, res) => {
        const allowedExtensions = [".pdf", ".doc", ".docx", ".jpeg", ".png", ".txt"];
        const upload = multer({
            storage: multer.diskStorage({
                destination: function (_req, _file, callback) {
                    callback(null, "uploadFile");
                },
                filename: function (_req, file, callback) {
                    callback(null, file.fieldname + "-" + `${Date.now()}+ ${file.originalname}`);
                },
            }),
            fileFilter: function (req, file, callback) {
                // Allowed file extensions
                const fileExtension = file.originalname.toLowerCase().slice(-4); // Get the last 4 characters of the filename
                if (allowedExtensions.includes(fileExtension)) {
                    callback(null, true); // Allow the file
                }
                else {
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
            upload(req, res, async (err) => {
                if (err instanceof multer.MulterError) {
                    res.status(400).send("Multer Error: " + err.message);
                }
                else if (err) {
                    res.status(500).send(err);
                }
                else {
                    // If everything is fine, respond with success message
                    const userId = req.user.id;
                    const originalname = req.file.originalname;
                    const mimetype = req.file.mimetype;
                    const filePath = req.file.path;
                    const public_column = req.body;
                    console.log(req.file);
                    const user = await userRepository.findOne({ where: { id: req.userId } }); // Assuming you have the user ID from authentication
                    // console.log(user);
                    if (user === null) {
                        res.status(404).send("User not found");
                        return;
                    }
                    const file = fileRepository.create({
                        file_name: originalname,
                        file_metadata: mimetype || '',
                        file_path: filePath,
                        is_public: public_column,
                        id: userId
                    });
                    console.log(file);
                    try {
                        const data = await fileRepository.save(file); // Save the user-file relationship to the database
                        console.log(data.file_id);
                        console.log(user.id);
                        const userFile = userfile.create({
                            file_id: data.file_id,
                            id: user.id,
                        });
                        await userfile.save(userFile);
                        res.send("File uploaded and data saved successfully");
                    }
                    catch (error) {
                        console.error('Error saving file data:', error);
                        res.status(500).json({ error: 'Error saving file data' });
                    }
                }
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("An error occurred during file upload");
        }
    };
}
export default AuthenticationOfData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250cm9sbERBVEEvY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBQy9CLE9BQU8sT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUM5QixPQUFPLE1BQU0sTUFBTSxRQUFRLENBQUM7QUFDNUIsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE9BQU8sV0FBVyxNQUFNLHlCQUF5QixDQUFDO0FBQ2xELE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDbEQsc0RBQXNEO0FBRXRELE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixNQUFNLEdBQUcsR0FBRyxPQUFPLEVBQUUsQ0FBQztBQUN0QixHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXhCLDBFQUEwRTtBQUMxRSx1REFBdUQ7QUFDdkQsMkRBQTJEO0FBQzNELGtGQUFrRjtBQUVsRixHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDaEQsTUFBTSxTQUFTLEdBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyw4Q0FBOEM7QUFDM0YsTUFBTSxjQUFjLEdBQWUsYUFBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyRSxNQUFNLGNBQWMsR0FBZSxhQUFhLENBQUMsYUFBYSxDQUFD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