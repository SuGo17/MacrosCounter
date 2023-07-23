const UserRoles = require("../models/userRoleModel")
const Users = require("../models/userModel")
const mongoose = require("mongoose")

const changeRole = async (req,res) =>{
    const {id,admin} = req.body
    if(!id ) res.status(401).json({error:"All fields must be filled."})
    if(!mongoose.Types.ObjectId.isValid(id)) res.status(401).json({error:"Please provide a valid user ID."})
    try {
        const user = await Users.findOne({_id:id})
        if(!user) return res.status(401).json({error: "User does not exist"})
        if(admin === true) {
            await UserRoles.findOneAndUpdate({user_id:user._id},{role:"ADMIN"})
            res.status(200).json({message:"Admin access added to the user."})
        }else{
            await UserRoles.findOneAndUpdate({user_id:user._id},{role:"User"})
            res.status(200).json({message:"Admin access removed from the user."})
        }
    }catch(err){
        res.status(401).json({error:err.message})
    }
}

const getAllUsers = async (req,res)=>{
    try{
        const allUsers = await UserRoles.find().populate('user_id','-password').exec()
        res.json({allUsers})
    }
    catch(err){
        res.status(401).json({error:err.message})
    }
}

module.exports = {changeRole,getAllUsers}