import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:"",
    },
    searchHistory:{
        type:Array,
        default:[],
    }
})

const User = mongoose.model("User", userSchema)//create a User model depending on this user Schema.

export default User;