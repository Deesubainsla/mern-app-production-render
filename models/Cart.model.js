import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    useremail:{
        type:String,
        required:true,
        unique:true
    },
    items:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }]
}, {timestamps: true});

export const Cart = mongoose.model('Cart',CartSchema);