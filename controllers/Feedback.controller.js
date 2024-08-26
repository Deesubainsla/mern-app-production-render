import { Feedback } from "../models/Feedback.js";

export const addfeedback = async(req, res)=>{
    try {
        const {usermail, user, message} = req.body;
    
        let feedback = await Feedback.findOne({usermail});
        if(!feedback){
            feedback = new Feedback({
                usermail,
                user,
                messages:[message]
            })
            await feedback.save();
            return res.status(200).json({message:"Feedback sent to Deesu Bainsla"})
        }

        feedback.messages.push(message);
        await feedback.save();
        res.status(200).json({message:"Feedback sent to Deesu Bainsla"})
        
    } catch (error) {
        res.status(400).json({message:'Something went wrong in sending feedback'})
    }
}