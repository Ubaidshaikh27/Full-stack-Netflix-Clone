import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { ENV_VARS } from "../config/envVars.js";

// protectRoute IS FOR: IF THE USER TRIED TO FETCH DEATILS, WE CHECK IF THE USER IS LOGIN OR NOT

//the next paramter is just "once the protectRoute is completer move to next function"
export const protectRoute = async (req, res, next) => {
    try {

//from the request go under the cookied and find the token "jwt-netflix"
//req.cookies will not gonna work if we dont import the cookieparser in server.js

        const token = req.cookies["jwt-netflix"] //req.cookies is parse by cookieparser which we imported in server.js

//If token is equal to false, if there is no token then return status 401, success:false, message:"Unauthorized - No Token Provided"
        if(!token) {
            return res.status(401).json({success:false, message:"Unauthorized - No Token Provided"})
        }
//Here decoded is equal to = jwt, verify this Token (this will take 2 parameter 1)token 2)Secretkey which we use to encrypt

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET)

//if decoded is equal to false or Not decoded then return status 401 and give json {success:false, message:"Unauthorized - Ivalid Token"}
        if (!decoded) {
         return res.status(401).json({success:false, message:"Unauthorized - Ivalid Token"})
        }
//but if we pass this we will able to get the user from the datatbase

//we have pass teh userID in genrateToken.js as a payload  to the token    
//find user by id and decode userid token and secret and deselect its password
        const user = await User.findById(decoded.userId).select("-password")
//This will return the entire user document, we have jsut deselect the password by .select("-password")



//If no user found return status 404 and json {success:false, message:"User not found"}
        if (!user){
            return res.status(404).json({success:false, message:"User not found"})
        }
        



        req.user = user; //This is used by findByIdAndUpdate method in search.route.js



        
//if all the " if " checks is done then execute the next function
        next()

    } catch (error) {
        console.log("Error in protectRoute middelware: ", error.message);
        res.status(500).json({success:false, message:"Internal Server Error"})
        
    }
}


