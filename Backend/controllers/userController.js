const User = require("../models/userModel")
const UserDetails = require("../models/userDetailsModel")
const jwt = require("jsonwebtoken")
const userDetailsModel = require("../models/userDetailsModel")

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'1d'})
}


const login = async (req, res) => {

  const {email,password} = req.body;
  
  try{

    const user = await User.login(email,password)

    const token = createToken(user._id)

    res.status(200).json({email,token})

  }catch(err){
    res.status(400).json({error:err.message})
  }
};

const signup = async(req, res) => {

  const {email,password,name} = req.body

  try{
    const user = await User.signup(email,password,name)

    const token = createToken(user._id)

    await UserDetails.create({user_id:user._id})

    res.status(200).json({email,token});
  }catch(err){
    res.status(400).json({error:err.message});
  }

};

const deleteUser = async(req, res) => {
  try{
    const user = await User.findByIdAndDelete(req.user._id)
    await UserDetails.findOneAndDelete({user_id:user._id})
    res.status(200).json({message:"Your account has been successfully deleted",user})
  }catch(err){
    res.status(401).json({error:err.message})
  }
};

const getDetails = async (req, res) => {

  try{
    const userData = await UserDetails.findOne({user_id:req.user._id})
    res.status(200).json({userData})
  }catch(err){
    res.status(401).json({error:err.message})
  }

};

const updateDetails = async (req, res) => {

  const {height,weight,age} = req.body

  if(!height || !weight || !age) res.status(401).json({error:"All fields must be filled."});

  if(isNaN(height) || isNaN(weight) || isNaN(age)) res.status(401).json({error:"All values must be in number format."});

  const data = {user_id:req.user._id,height,weight,age} 

  try{
    const userData = await UserDetails.findOneAndUpdate({user_id:data.user_id},data).select('_id')
    res.status(200).json({_id:userData._id,...data})
  }catch(err){
    res.status(401).json({error:err.mesage})
  }

};



module.exports = {
  login,
  signup,
  deleteUser,
  getDetails,
  updateDetails,
};