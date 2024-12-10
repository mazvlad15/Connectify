import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(400)
        .json({ error: "Unauthorized - no token provider" });
    }

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

    if (!decoded) {
      return res.status(400).json({ error: "Unauthorized - invalid token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if(!user){
        return res.status(404).json({error: "User not found"});
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error in protected route" });
  }
};


export default protectedRoute;