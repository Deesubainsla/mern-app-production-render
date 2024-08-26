import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    usermail:{
        type:String,
        required: true,
        unique: true
    },
    user:{
        type: String,
        required:true
    },
    messages:[{
        type: String
    }]
},{timestamps: true})

export const Feedback = mongoose.model('Feedback',feedbackSchema);