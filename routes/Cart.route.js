import express from 'express'
import { addingtoCart, getcartitems, removeitem } from '../controllers/Cart.controller.js';

const router = express.Router();

router.post('/', addingtoCart);
router.post('/getcartitems',getcartitems);
router.post('/removeitem',removeitem);

export default router 