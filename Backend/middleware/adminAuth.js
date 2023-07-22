const UserRoles = require("../models/userRoleModel")

const adminAuth = async(req,res,next)=>{
    try{
        const user = await UserRoles.findOne({user_id:req.user._id}).select('role')
        if(user.role!=="ADMIN") return res.status(401).json({error:"Unauthorized acess. User should have admin access."})
        next()
    }catch(err){
        res.status(401).json({error:err.message})
    }
}

module.exports = adminAuth