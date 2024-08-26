import express from 'express'
import { getBook, addBook } from '../controllers/Books.controller.js';
import multer from 'multer';
import { upload } from '../middlewares/multer.middleware.js';
// const upload = multer({ dest: './uploads/' }) //simplest way of implementation:but can't read it so that'a why use discstorage as we have used


const router = express.Router();


router.get('/', getBook)
router.post('/addbook',upload.single('file'), addBook)


//they are diffrent endpoint working after /books
// router.get('/hello', (req,res)=>{
//     res.send("hello trying something new")
// })
// router.get('/hey', (req,res)=>{
//     res.send("hey again new")
// })

export default router
