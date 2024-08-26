import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./public/uploads")
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now() + file.originalname);
    }
    
})

export const upload = multer({
    storage //same as storage:storage accourding to new update in js ES6
})