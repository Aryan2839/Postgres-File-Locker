import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: 'aryanaiassistant@gmail.com',
        pass: 'enfpimllwdzyclqr'
    }
});

export default transporter;