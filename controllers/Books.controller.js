import { Book } from "../models/Book.model.js"
import uploadonCloudinary from "../utilities/Cloudinary.js";


export const getBook = async(req,res)=>{
    try {
        const books = await Book.find().sort({createdAt:-1});
        if(!books) return res.status(404)

        res.status(200).json(books)
    } catch (error) {
        console.log("Error in fetching books:",error?.message)
    }
}

export const addBook = async(req, res)=>{

    // Log the uploaded file information
//   console.log('Uploaded file:', req.file);
    // const originalName = req.file?.originalname;
  // Log the other form data
//   console.log('Form data:', req.body);

  // Send a response with the file and form data (for debugging purposes)
    
    // try {
    //     res.status(200).json({
    //         message:"Successful mission",
    //         file:req.file,
    //         body: req.body
    //     })
    // } catch (error) {
    //     res.send("some error occured:")
    // }

    try {
    //    res.status(200).json({
    //     message:"successfull",
    //     body: req.body,
    //     file: req.file
    //    })
        const {title,url, description, price, category} = req.body;
        let imgurl;//Global variable for this block
        if(req.file){

            const imgpath = req.file.path;
            const data = await uploadonCloudinary(imgpath);
            if(!data) return res.status(401).json({message:"Path is not Specified"})
            imgurl = data.url;
        }
        else{
            imgurl = req.body.file;
            //if you will initialize imgurl in if or else like const imgurl then it's
            //scope is limited in this block only.
        }
    
        const newBook = new Book({
            title,
            url,
            image:imgurl,
            description,
            price, 
            category
        })
    
        await newBook.save();
        res.status(200).json({message:"New Book added successfully"})
    } catch (error) {
       
        res.status(401).json({message:"Something went wrong in adding Book"})
    }
}