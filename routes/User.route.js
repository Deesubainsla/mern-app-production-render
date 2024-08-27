import express from 'express'
import { getusers, login, signin } from '../controllers/User.controller.js'
import { upload } from '../middlewares/multer.middleware.js';
import { addfeedback } from '../controllers/Feedback.controller.js';

const router = express.Router();

router.post('/login',login);
router.post('/signin',upload.single('file'),signin);
router.get('/getusers', getusers);
router.post('/feedback',addfeedback);
//multer(upload function) store it in diskstorage and 
//provide it to req.file

export default router