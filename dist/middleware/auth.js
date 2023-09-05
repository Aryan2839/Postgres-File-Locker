import jwt from "jsonwebtoken";
import { User } from "../entity/user.js";
import { AppDataSource } from "../data.js";
const secretkey = process.env.Secretkey; // Ensure the type is explicitly set as string
const userRepository = AppDataSource.getRepository(User);
const userAuth = async (req, res, next) => {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Secret")) {
        try {
            // Get token from header
            token = authorization.split(" ")[1];
            // Verify token
            const decodedToken = jwt.verify(token, secretkey);
            // Get user from token (assuming you want to fetch the user based on the decoded token's userID)
            const userId = decodedToken.userID;
            const user = await userRepository.findOne({ where: { id: userId } });
            if (user) {
                req.user = user; // Attach the user object to the request
                next(); // Proceed to the next middleware or route handler
            }
            else {
                res.send({ status: "failed", message: "User not found" });
            }
        }
        catch (error) {
            console.error(error);
            res.send({ status: "failed", message: "Unauthorized user" });
        }
    }
    else {
        res.send({ status: "failed", message: "No token" });
    }
};
export default userAuth;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9taWRkbGV3YXJlL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDO0FBQy9CLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUV6QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzNDLE1BQU0sU0FBUyxHQUFpQixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLDhDQUE4QztBQUVyRyxNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRXpELE1BQU0sUUFBUSxHQUFHLEtBQUssRUFBRSxHQUFRLEVBQUUsR0FBUSxFQUFFLElBQWtCLEVBQWlCLEVBQUU7SUFDL0UsSUFBSSxLQUFhLENBQUM7SUFDbEIsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFFdEMsSUFBSSxhQUFhLElBQUksYUFBYSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN2RCxJQUFJO1lBQ0Ysd0JBQXdCO1lBQ3hCLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBDLGVBQWU7WUFDZixNQUFNLFlBQVksR0FBUSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsQ0FBQztZQUV2RCxnR0FBZ0c7WUFDaEcsTUFBTSxNQUFNLEdBQWlCLFlBQVksQ0FBQyxNQUFNLENBQUM7WUFDakQsTUFBTSxJQUFJLEdBQUcsTUFBTSxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFDLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBQyxFQUFDLENBQUMsQ0FBQztZQUUvRCxJQUFJLElBQUksRUFBRTtnQkFDUixHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLHdDQUF3QztnQkFDekQsSUFBSSxFQUFFLENBQUMsQ0FBQyxrREFBa0Q7YUFDM0Q7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQzthQUMzRDtTQUNGO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxDQUFDLENBQUM7U0FDOUQ7S0FDRjtTQUFNO1FBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7S0FDckQ7QUFDSCxDQUFDLENBQUM7QUFFRixlQUFlLFFBQVEsQ0FBQyJ9