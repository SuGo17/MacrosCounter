const UserRoles = require("../models/userRoleModel")
const Users = require("../models/userModel")
const mongoose = require("mongoose")

const changeRole = async (req,res) =>{
    const {id,admin} = req.body
    if(!(admin === true || admin === false)) return res.status(401).json({error:"admin parameter must be a boolean."}) 
    if(!id || !mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({error:"Please provide a valid user ID."})
    try {
        const user = await UserRoles.findOne({user_id:id})
        if(!user) return res.status(401).json({error: "User does not exist"})
        if(admin === true) {
            if(user.role === "ADMIN") return res.status(401).json({error:"User is already a Admin."})
            const updatedUser = await UserRoles.findOneAndUpdate({user_id:user.user_id},{role:"ADMIN"})
            res.status(200).json({message:"Admin access added to the user."})
        }
        else {
            if(user.role === "USER") return res.status(401).json({error:"User does not have admin access to remove."})
            await UserRoles.findOneAndUpdate({user_id:user.user_id},{role:"USER"})
            res.status(200).json({message:"Admin access removed from the user."})
        }
    }catch(err){
        res.status(401).json({error:err.message})
    }
}

const getAllUsers = async (req,res)=>{
    try{
        const users = await UserRoles.find({role:"USER"}).populate('user_id',"+name +email +_id").exec()
        const admins = await UserRoles.find({role:"ADMIN"}).populate('user_id',"+name +email +_id").exec()
        res.json({users,admins})
    }
    catch(err){
        res.status(401).json({error:err.message})
    }
}


const searchUserByName = async (req,res)=>{
    const {searchTerm} = req.query
    const decodedSearchTerm = decodeURIComponent(searchTerm)
    const searchRegex = new RegExp(decodedSearchTerm,'i')

    try{
        const allUsers = await Users.find({name:searchRegex},{password:0})
        res.json({allUsers})
    }
    catch(err){
        res.status(401).json({error:err.message})
    }
}

module.exports = {changeRole,getAllUsers,searchUserByName}