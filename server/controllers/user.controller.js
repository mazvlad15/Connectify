import User from "../models/user.model.js";


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        if(!users){
            return res.status(400).json({error: "No users found"});
        }else {
            return res.status(201).json(users);
        }
        
    } catch (error) {
        res.status(500).json({error: "Internal Server Error get all users"});
    }
}