import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
    },

    email:{
        type:String,
        required:true,
        unique:true,
        time:true
    },

    password:{
        type:String,
        trim:true,
        required:true
    },

    phone:{
        type:Number,
    },

    address:{
        type:String
    },
    
    image:{
        type:String
    },
    role:{
        type:String,
        enum:['user', 'admin'],
        default:'user'
    }


})

export const User = mongoose.model("user", userSchema)