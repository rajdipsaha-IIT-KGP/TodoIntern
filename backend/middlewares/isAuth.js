const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const isAuth = async(req,res,next)=>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(400).json({
                message:"Unauthorized",
            })
        }
        const decodedData = jwt.verify(token,process.env.JWT_SECRET)
  if(!decodedData)
    return res.status(400).json({
message:"Re-Login please"
})
req.user = await User.findById(decodedData.id)
next();
    }
    catch(err){
        return req.status(500).json({
            message:"Please Login First"
        })
    }
}
module.exports = isAuth