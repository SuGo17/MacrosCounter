const { default: mongoose } = require("mongoose")
const Meals = require("../models/mealModule")

const creatorAuth = async (req,res,next)=>{
    const id = req.params.id
    const meal = await Meals.findOne({_id:id})
    if(!meal) return res.status(404).json({message:"Error!. meal not found"})
    !meal.created_by.equals(req.user._id) ? res.status(401).json({error:"Unauthorized request!"}) : next()
}

module.exports = creatorAuth