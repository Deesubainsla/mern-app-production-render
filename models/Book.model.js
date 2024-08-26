import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    //id will generate automatically in DB
    title:{
        type:String,
        required: true
    },
    url:{
        type: String,
        required:true
    },
    //can also write like (tittle:String) but not suggested due to less flexibility
    image:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type:String,
        required: true
    },
},{timestamps:true})

export const Book = mongoose.model("Book", bookSchema)