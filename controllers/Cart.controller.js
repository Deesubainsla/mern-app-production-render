import { Cart } from "../models/Cart.model.js";
import {Book} from '../models/Book.model.js'

export const addingtoCart = async(req, res)=>{
   try {
     const {userid, bookid} = req.body;
     const cart = await Cart.findOne({user:userid});
     if(!cart){
        return res.status(404).json({message:'Cart is not found'})
     }
     if(cart.items.includes(bookid)){//to check if book is already present:
         return res.status(400).json({message:"Book already present"});
     }
 
     cart.items.push(bookid);//simply push the book like array:
     await cart.save();
     res.status(200).json({message:"Book added successfully"});
   } catch (error) {
     res.status(500).json({message:"Something went wrong in addingCart"})
   }
} 

export const getcartitems = async(req, res)=>{
    try {
      
      const {usermail} = req.body;
      
      const cart = await Cart.findOne({useremail:usermail});
      if(!cart) return res.status(401).json({message:"Cart not found:"});

      const books = (await Book.find()).filter((book)=>cart.items.includes(book._id));
      // const cartbooks = books.filter((book)=>cart.items.includes(book._id));

      res.status(200).json(books);

    } catch (error) {
      res.status(400).json({message:error.message})
    }
}

export const removeitem = async(req, res)=>{
    try {
      const {usermail, bookid} = req.body;
      const updatedcart = await Cart.findOneAndUpdate(
        {useremail:usermail},
        {$pull: {items: bookid}},
        {new: true}
      );
      if(!updatedcart) return res.status(404).json({message:"Cart not found"});

      res.status(200).json({message:"Cart updated successfully"})
    } catch (error) {
      res.status(401).json({message: "Something went wrong in removing item"})
    }
}