import { Cart } from "../models/Cart.model.js";
import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt'

import uploadonCloudinary from "../utilities/Cloudinary.js";

export const login = async(req,res)=>{
   try {
       
        const {email, password} = req.body;
        //findOne like method expect a object parameter so u can also give like {email: email} and can also pass a function after comma like , (err, user)=>if(err) and else console.log(user);
        
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"user not found:"})
        }
    
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({message:"Password is incorrect:"})
        }
    
        const displayUser = await User.findOne({email}).select("_id profile name email");
        res.status(200).json({message: "user loggedin successfully:", user: displayUser});
   } catch (error) {
        // console.log(req.body);
        res.status(400).json({message:"Error: Something went wrong in login:"})
   }
}

export const signin = async(req, res)=>{
   try {

        const {name, email, password} = req.body;
        let profileimg;

        if(req.file){
            const profilepath = req.file.path;
            const data = await uploadonCloudinary(profilepath);
            if(!data){ 
                return res.status(400).json({message:"profile path is not present"});
            }
            profileimg = data.url;
        }
        else{
            profileimg = req.body.file;
        }

        const existuser = await User.findOne({email});
        if(existuser){
            return res.status(400).json({message:"user already exist:"});
        }
        
        const securepass = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            profile:profileimg,
            email,
            password: securepass
        })
        await newUser.save();

        const user = await User.findOne({email}).select("profile _id name email");
        const cart = new Cart({
            user:user._id,
            useremail:user.email,
            items:[]
        })

        await cart.save();
        
        res.status(201).json({message: "user created successfully:", user});
 
   } catch (error) {
        res.status(400).json({message:error.message})
   }
}