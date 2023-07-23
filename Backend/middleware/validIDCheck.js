const mongoose = require("mongoose")

const validIDCheck = (req,res,next)=>{
    const id = req.params.id
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(401).json({error:"Please provide a valid id."})
    next()
}

module.exports = validIDCheck