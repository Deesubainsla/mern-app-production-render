import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET 
})

const uploadonCloudinary = async(localpath)=>{
    try {
        if(!localpath) return null;
        const response = await cloudinary.uploader.upload( localpath ,{
            resource_type: 'auto',//auto decide video or photo:
        })
        fs.unlinkSync(localpath);
        return response;

    } catch (error) {
        fs.unlinkSync(localpath);
        console.log("Problem in cloudinary upload:")
    }
}

export default uploadonCloudinary;