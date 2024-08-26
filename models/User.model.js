import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profile:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
},{timestamps: true})


export const User = mongoose.model("User", userSchema)