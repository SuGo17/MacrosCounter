const Macros = require("../models/macrosModel")

const getParam = (req) => {
  return req.params;
};

const getMacros = async (req, res) => {
  const {id} = getParam(req)
  try{
    const macro = await Macros.findOne({_id:id})
    macro ? res.status(200).json(macro):res.status(404).json({message:"Error, Macro not found!"})
  }catch(err){
    res.status(401).json({error:err.message})
  }

};

const getAllMacros = async (req,res)=>{
  try{
    const allMacros = await Macros.find();
    allMacros ? res.status(200).json({all_ingredients:allMacros}):res.status(404).json({message:"Error, Macro not found!"})
  }catch(err){
    res.status(401).json({error:err.message})
  }
}


const addMacros = async (req, res) => {
  const {name,qty,protein,carbohydrates,fat,fiber} = req.body
  if(!name || !qty) return res.status(401).json({error:"All fields should not be empty"})
  try{
    const macro = await Macros.create({name,qty,protein,carbohydrates,fat,fiber})
    res.status(200).json(macro)
  }catch(err){
    res.status(401).json({error:err.message})
  }
};

const updateMacros = async(req, res) => {
  const {id} = getParam(req)
  const {name,qty,protein,carbohydrates,fat,fiber} = req.body

  try{
    const macro = await Macros.findOneAndUpdate({_id:id},{name,qty,protein,carbohydrates,fat,fiber})
    macro ? res.status(200).json(macro): res.status(404).json({message:"Error, Macro not found!"})
  }catch(err){
    res.status(401).json({error:err.message})
  }

};

const deleteMacros = async (req, res) => {
  const {id} = getParam(req)
  try{
    const macro = await Macros.findOneAndDelete({_id:id})

    macro ? res.status(200).json(macro) : res.status(404).json({message:"Error, Macro not found!"})
  }catch(err){
    res.status(401).json({error:err.message})
  }
};
module.exports = { getMacros,getAllMacros, addMacros, updateMacros, deleteMacros };
