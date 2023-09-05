import dotenv from "dotenv";
dotenv.config();
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aryanaiassistant@gmail.com',
        pass: 'enfpimllwdzyclqr'
    }
});
export default transporter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1haWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZW1haWxDb25maWcvZW1haWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxNQUFNLE1BQU0sUUFBUSxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNoQixPQUFPLFVBQVUsTUFBTSxZQUFZLENBQUM7QUFFcEMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLGVBQWUsQ0FBQztJQUMzQyxPQUFPLEVBQUMsT0FBTztJQUNmLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSw0QkFBNEI7UUFDbEMsSUFBSSxFQUFFLGtCQUFrQjtLQUMzQjtDQUNKLENBQUMsQ0FBQztBQUVILGVBQWUsV0FBVyxDQUFDIn0=