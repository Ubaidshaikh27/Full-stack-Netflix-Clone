import  User  from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const {email, password, username} = req.body;


//if email, password, username is not given return status 400 and show message "All fields are required"
        if (!email || !password || !username) {
            return res.status(400).json({success:false, message:"All fields are required"})
        }

//  a syntax check whether an email address is spelled correctly, has no spaces, commas, and all the @s, dots and domain extensions are in the right place
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//if emailRegex's test in not passed by email return status 400 and messgae invalid email
        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message:"Invalid Email"})
        }
//if password lenghth is not greter than 6 return status 400
        if (password.length < 6){
            return res.status(400).json({success:false, message:"Password must be of 6 characters long"})

        }
// We are saying here is that the provided email by the user, we will check if the email is existing in our database
//so existingUserByEmail is equal to user.findone.. this will find value that matches the email provided by user
//And if it exist..existingUserByEmail==true..then we return status 400
        const existingUserByEmail = await User.findOne({email:email})
        if (existingUserByEmail){
            return res.status(400).json({success:false, message:"Email Already exist"})

        }
//same for username as well
        const existingUserByUsername = await User.findOne({username:username})
        if (existingUserByUsername){
            return res.status(400).json({success:false, message:"Username Already exist"})

        }

//Here we are hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password,salt); //Hash password with the salt we have just created


		const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]  //This will give the random indexes in PROFILE_PICS Array

//Once all these checks are done we will create a new user, with the information provided by the user which is email, password, username and the image is provided by PROFILE_PICS Array 

        const newUser = new User({
            email:email,
            password:hashPassword,
            username:username,
            image:image,
        })

        
//if new user is created which is true then generate Token And Send Cookie 
        generateTokenAndSetCookie(newUser._id, res)
        
        await newUser.save();
        res.status(200).json({success:true, user:{   //here we will return all the fields o fthe user
            ...newUser._doc,                        //by spread method (...newuser) and password
            password:""                             //when we check through postman
        }})

    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({success:false, message:"Internal server error"})
    }
}
//user gonna pass email, password, username throgh post function in auth.route
//so we have written const {email, password, username} = req.body
// and we gonna parse the information in server.js using app.use(express.json())
//----------------------------------------------------------------


export async function login(req, res) {
    try {
        const{email, password} = req.body


//if email, password is not given return status 400 and show message "All fields are required"

        if (!email || !password) {
            return res.status(400).json({success:false, message:"All fields are required"})
        }

  
        
// We are saying here is that the provided email by the user, we will check if the email is existing in our database.
//so user is equal to user.findone.. this will find email that matches the email provided by user
//And if findone doesnt find existing email ..!email -- no email..then we return status 400 and messgae Invalid credentials
        const user = await User.findOne({email:email})

        if(!email){
            return res.status(400).json({success:false, message:"Invalid Email"})
        }

//We have called the bcryptjs.compare() method,
//We have already turned our password to hash, this method will turn the user's.password to hash and then compare it with each other
//if the password put by the user is correct and matches the password, user signup with for the email id he put.
//Then it login or else it will return status 400 and messgae Invalid credentials

        const isPasswordCorrect = await bcryptjs.compare(password, user.password)
        
        if(!isPasswordCorrect) {
            return res.status(400).json({success:false, message:"Invalid Password"})
        }

// If the user passed all these if checks the we will generate a Token And Set a Cookie

        generateTokenAndSetCookie(user._id, res)

        //this is a cookie structure we send to postman, where theres is no password
        
        res.status(200).json({success:true, user:{   //here we will return all the fields o fthe user
            ...user._doc,                        //by spread method (...newuser) and password
            password:""                             //when we check through postman
        }})

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({success:false, message:"Internal server error"})   
    }
}



//----------------------------------------------------------------
// this says try if the logout is successfull then clear the cookie "jwt-netflix"
//And send the status 200 and messgae "Logged out successfully"
//If not logout -  send the status 500 and messgae "Internal server error"
export async function logout(req, res) {
   try {
     res.clearCookie("jwt-netflix");
     res.status(200).json({success:true, message:"Logged out successfully"})

   } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({success:false, message:"Internal server error"})

    
   }
}

//just a normal function that says, if successfully called that return status 200 else 500
export async function authCheck(req, res) {
    try {
        res.status(200).json({success:true, user:req.user})
    } catch (error) {
        console.log("Error in authCheck controller", error.message);
        res.status(500).json({success:false, message:"Internal server error"})
        
    }
}
