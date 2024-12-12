import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/envVars.js";


//This is gonna generate a Token And Send a Cookie

// This is how we gonna be create a token = 1st argument will be the payload that is userId
//We put the userId becasue when we decode this token we can get the userId from it and find the user in our databas
// 2nd argument is secret from the .env file and this token will expire in 15 days


export const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, ENV_VARS.JWT_SECRET, {expiresIn:"15d"}) 


//putting this token in Cookie
// 1st arguument is token name
// 2nd argument is token 
// 3rd are optinons { maxage of token, httponly- this makes our site only accessible by browsers, samsite:this prevent CSRF attack}
    

res.cookie("jwt-netflix", token, {
        maxAge:15*24*60*100,  //This is 15 days in milliseconds
        httpOnly:true,   //prevent XSS attact cross-site scripting attacks, this make it not accessible by javascript
        sameSite:"strict", //CSRF attacks cross-site request forgery attack
        //secure:
        //This is only gonna be true when we deploy applications
        //only in the https its gonna be true but in the local host it gonna be fall
        secure: ENV_VARS.NODE_ENV !=="development"
        //can check it by  ENV_VARS.NODE_ENV !=="development",, so if we are not in any development it gonna be true

        
    });
    return token;
}