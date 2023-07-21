const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

const requireAuth = async (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization) return res.status(401).json({error:"Authorization toke requires"})

    const token = authorization.split(" ")[1]

    try {
        const {_id} = jwt.verify(token,process.env.SECRET)
        const user = await User.findOne({_id}).select('_id')
        user ? req.user = user : res.status(401).json({message:"User Doesnot exist."})
        next()
    }catch(err){
        res.status(401).json({error:err.message})
    }
}

module.exports = requireAuth